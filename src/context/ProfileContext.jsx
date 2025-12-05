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
    if (!accessToken) {
      setProfile({ first_name: "", last_name: "", phone_number: "", birth_date: null });
      setMessage({ text: "", type: "" });
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("accounts/profile/");
        setProfile({
          ...res.data,
          birth_date: res.data.birth_date ? new Date(res.data.birth_date) : null,
          phone_number: res.data.phone_number || "",
        });
        setMessage({ text: "", type: "" });
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

  const updateField = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const saveProfile = async () => {
  if (!accessToken) return;

  if (!profile.first_name.trim() || !profile.last_name.trim()) {
    setMessage({ text: "Խնդրում ենք լրացնել անունը և ազգանունը", type: "error" });
    return;
  }

  if (!profile.phone_number || profile.phone_number.trim() === "") {
    setMessage({ text: "Խնդրում ենք լրացնել հեռախոսահամարը", type: "error" });
    return;
  }

  let formattedPhone = profile.phone_number.trim();
  if (!formattedPhone.startsWith("+")) {
    formattedPhone = `+${formattedPhone}`;
  }

  if (!/^\+\d+$/.test(formattedPhone)) {
    setMessage({
      text: "Հեռախոսահամարը պետք է պարունակի միայն թվեր",
      type: "error",
    });
    return;
  }

  if (formattedPhone.length < 11) {
    setMessage({
      text: "Հեռախոսահամարը չափազանց կարճ է, խնդրում ենք ստուգել",
      type: "error",
    });
    return;
  }

  if (formattedPhone.length > 15) {
    setMessage({
      text: "Հեռախոսահամարը չափազանց երկար է, խնդրում ենք ստուգել",
      type: "error",
    });
    return;
  }

  setError(null);

  try {
    const payload = {
      first_name: profile.first_name.trim(),
      last_name: profile.last_name.trim(),
      phone_number: formattedPhone,
    };

    if (profile.birth_date instanceof Date && !isNaN(profile.birth_date)) {
      payload.birth_date = profile.birth_date.toISOString().split("T")[0];
    }

    const res = await api.put("accounts/profile/", payload);

    setProfile({
      ...res.data,
      birth_date: res.data.birth_date ? new Date(res.data.birth_date) : null,
      phone_number: res.data.phone_number || "",
    });

    setMessage({ text: "Պրոֆիլը հաջողությամբ պահպանվեց!", type: "success" });
  } catch (err) {
    console.error("❌ Ошибка сохранения профиля:", err);

    const status = err.response?.status;
    let userMessage = "Սխալ պատահեց, փորձեք կրկին";

    if (status === 400) {
      userMessage = "Տվյալները սխալ են․ խնդրում ենք ստուգել մուտքագրումը";
    } else if (status === 401) {
      userMessage = "Նստաշրջանը ավարտվել է․ խնդրում ենք կրկին մուտք գործել";
    } else if (status === 500) {
      userMessage = "Սերվերի սխալ․ փորձեք կրկին մի փոքր ուշ";
    } else if (!status) {
      userMessage = "Չկա կապ սերվերի հետ․ ստուգեք ինտերնետը";
    }

    setMessage({ text: userMessage, type: "error" });
    setError(null);
  }

  useEffect(() => {
  if (message.text) {
    const timer = setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 3000);
    return () => clearTimeout(timer);
  }
}, [message]);

};




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
