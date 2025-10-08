/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../shared/api/api";
import { useAuth } from "./AuthContext";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { accessToken } = useAuth();
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    birth_date: null,
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!accessToken) return;

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("accounts/profile/"); // <-- путь с бэка
        setProfile({
          ...res.data,
          birth_date: res.data.birth_date ? new Date(res.data.birth_date) : null,
        });
      } catch (err) {
        console.error("Ошибка загрузки профиля:", err);
        setError(err);
        setMessage({ text: "Սխալ պատահեց, փորձեք կրկին", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [accessToken]);

  const updateField = (field, value) => setProfile(prev => ({ ...prev, [field]: value }));

  const saveProfile = async () => {
    if (!accessToken) return;
    
    if (!profile.first_name || !profile.last_name) {
      setMessage({ text: "Խնդրում ենք լրացնել անունը և ազգանունը", type: "error" });
      return;
    }
  
    setError(null);
    try {
      const payload = {
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone_number: profile.phone_number?.startsWith("+")
          ? profile.phone_number
          : `+${profile.phone_number}`,
      };
    
      // если есть дата рождения и она объект Date
      if (profile.birth_date instanceof Date && !isNaN(profile.birth_date)) {
        payload.birth_date = profile.birth_date.toISOString().split("T")[0];
      }
    
      const res = await api.put("accounts/profile/", payload);
      setProfile({
        ...res.data,
        birth_date: res.data.birth_date ? new Date(res.data.birth_date) : null,
      });
      setMessage({ text: "Պրոֆիլը հաջողությամբ պահպանվեց!", type: "success" });
    } catch (err) {
      console.error("Ошибка сохранения профиля:", err);
      setMessage({ text: "Սխալ պատահեց, փորձեք կրկին", type: "error" });
      setError(err);
    }
  };

  return (
    <ProfileContext.Provider
      value={{ profile, updateField, saveProfile, loading, message, setMessage, error }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
