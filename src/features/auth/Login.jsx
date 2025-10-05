import React, { useState } from "react";
import { login } from "../../shared/api/auth";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { saveAuth } = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
  
    try {
      const data = await login(phone, password);
      
      saveAuth(data);                              
      localStorage.setItem("auth", JSON.stringify(data));
    
      navigate("/Account");
    } catch (err) {
      console.log(err);
      setError(err.error || err.detail || "Մուտքի սխալ");
    }
  }

  return (
    <div className="px-[3%] py-6 h-full flex justify-center items-start mt-[23%]">
      <form className="rounded-2xl p-8 w-full max-w-md space-y-5" onSubmit={handleSubmit}>
        <h2 className="text-[#f93c22] text-3xl font-bold text-center mb-4">Մուտք</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-center">
            {error}
          </div>
        )}

        <input type="tel" placeholder="Հեռախոսահամար" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full py-[5%] border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#f93c22] shadow-sm transition" />

        <input type="password" placeholder="Գաղտնաբառ" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full py-[5%] border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#f93c22] shadow-sm transition" />

        <button type="submit" className="w-full py-3 bg-gradient-to-r from-[#f93c22] to-[#ff724f] text-white font-semibold rounded-2xl hover:from-[#e2331d] hover:to-[#ff5c3a] transition" >
          Մուտք գործել
        </button>

        <div className="text-center text-gray-600">
          Չունե՞ք պրոֆիլ։{" "}
          <a href="/register" className="text-[#f93c22] hover:underline">
            Գրանցվել
          </a>
        </div>
      </form>
    </div>
  );
}
