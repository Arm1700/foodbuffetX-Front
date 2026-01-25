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

  // === LOAD PROFILE ===
  useEffect(() => {
    if (!accessToken) {
      setProfile({
        first_name: "",
        last_name: "",
        phone_number: "",
        birth_date: null,
      });
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await api.get("accounts/profile/");
        setProfile({
          ...res.data,
          birth_date: res.data.birth_date
            ? new Date(res.data.birth_date)
            : null,
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [accessToken]);

  const updateField = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const saveProfile = async () => {
    if (!accessToken) return;

    try {
      const payload = {
        first_name: profile.first_name.trim(),
        last_name: profile.last_name.trim(),
        phone_number: profile.phone_number,
      };

      if (profile.birth_date instanceof Date) {
        payload.birth_date = profile.birth_date.toISOString().split("T")[0];
      }

      const res = await api.put("accounts/profile/", payload);
      setProfile({
        ...res.data,
        birth_date: res.data.birth_date
          ? new Date(res.data.birth_date)
          : null,
      });

      setMessage({ text: "Պրոֆիլը հաջողությամբ պահպանվեց!", type: "success" });
    } catch (err) {
      setMessage({ text: "Սխալ պատահեց, փորձեք կրկին", type: "error" });
    }
  };

  useEffect(() => {
    if (!message.text) return;
    const timer = setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateField,
        saveProfile,
        loading,
        message,
        setMessage,
        error,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
