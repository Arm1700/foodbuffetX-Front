import React, { useState } from "react";
import { register } from "../../shared/api/auth";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Confirm from "./Confirm";

export default function Register() {
  const { saveAuth } = useAuth();
  const [form, setForm] = useState({ phone: "", password: "", password_confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false); // состояние модалки
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    setError("");
    setLoading(true);
    try {
      const data = await register(form.phone, form.password, form.password_confirm);
      console.log("Login response:", data);
      saveAuth(data);
      localStorage.setItem("auth", JSON.stringify(data));
      navigate("/Account");
    } catch (err) {
      if (err.response?.data?.phone) setError("Այս համարն արդեն գրանցված է");
      else setError(err.response?.data?.error || "Գրանցման սխալ");
    } finally {
      setLoading(false);
      setConfirmOpen(false);
    }
  }

  return (
    <div className="px-[3%] py-6 h-full flex justify-center items-start mt-[23%]">
      <form className="rounded-2xl p-8 w-full max-w-md space-y-5" onSubmit={(e) => e.preventDefault()}>
        <h2 className="text-[#f93c22] text-3xl font-bold text-center mb-4">Գրանցում</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-center">
            {error}
          </div>
        )}

        <input name="phone" type="tel" placeholder="Հեռախոսահամար" value={form.phone} onChange={handleChange} required className="w-full py-[5%] border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#f93c22] shadow-sm transition" />

        <input name="password" type="password" placeholder="Գաղտնաբառ" value={form.password} onChange={handleChange} required className="w-full py-[5%] border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#f93c22] shadow-sm transition" />

        <input name="password_confirm" type="password" placeholder="Կրկնեք գաղտնաբառը" value={form.password_confirm} onChange={handleChange} required className="w-full py-[5%] border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#f93c22] shadow-sm transition" />

        <button
          type="button"
          disabled={loading}
          onClick={() => setConfirmOpen(true)}
          className={`w-full py-3 text-white font-semibold rounded-2xl transition
            ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-[#f93c22] to-[#ff724f] hover:from-[#e2331d] hover:to-[#ff5c3a]"}`}
        >
          {loading ? "Գրանցվում..." : "Գրանցվել"}
        </button>

        <Confirm confirmOpen={confirmOpen} setConfirmOpen={setConfirmOpen} handleSubmit={handleSubmit} />

        <div className="text-center text-gray-600">
          Արդեն ունե՞ք պրոֆիլ։{" "}
          <a href="/login" className="text-[#f93c22] hover:underline">
            Մուտք գործել
          </a>
        </div>
      </form>
    </div>
  );
}
