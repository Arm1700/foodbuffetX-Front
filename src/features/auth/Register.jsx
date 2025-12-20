import React, { useState } from "react";
import { register } from "../../shared/api/auth";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Confirm from "./Confirm";

export default function Register() {
  const { saveAuth } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirm: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    setError("");
    setLoading(true);
    try {
      // Сохраняем форму временно для Confirm
      localStorage.setItem("authForm", JSON.stringify(form));

      // Отправляем код на почту
      await register(
        form.email,
        form.first_name,
        form.last_name,
        form.password,
        form.password_confirm
      );

      setConfirmOpen(true); // открываем окно подтверждения
    } catch (err) {
      setError(err?.error || "Գրանցման սխալ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-[3%] py-6 h-full flex justify-center items-start mt-[3%]">
      <form
        className="rounded-2xl p-8 w-full max-w-md space-y-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className="text-[#f93c22] text-2xl sm:text-3xl font-bold text-center mb-4">Գրանցում</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-center">
            {error}
          </div>
        )}

        <input
          name="email"
          type="email"
          placeholder="Էլ․ հասցե"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full py-[5%] border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#f93c22] shadow-sm transition"
        />
        <input
          name="first_name"
          type="text"
          placeholder="Անուն"
          value={form.first_name}
          onChange={handleChange}
          required
          className="w-full py-[5%] border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#f93c22] shadow-sm transition"
        />
        <input
          name="last_name"
          type="text"
          placeholder="Ազգանուն"
          value={form.last_name}
          onChange={handleChange}
          required
          className="w-full py-[5%] border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#f93c22] shadow-sm transition"
        />
        <input
          name="password"
          type="password"
          placeholder="Գաղտնաբառ"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full py-[5%] border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#f93c22] shadow-sm transition"
        />
        <input
          name="password_confirm"
          type="password"
          placeholder="Կրկնեք գաղտնաբառը"
          value={form.password_confirm}
          onChange={handleChange}
          required
          className="w-full py-[5%] border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#f93c22] shadow-sm transition"
        />

        <button
          type="button"
          disabled={loading}
          onClick={handleSubmit}
          className={`w-full py-3 text-white font-semibold rounded-2xl transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-[#f93c22] to-[#ff724f] hover:from-[#e2331d] hover:to-[#ff5c3a]"
          }`}
        >
          {loading ? "Գրանցվում..." : "Գրանցվել"}
        </button>

        <Confirm
          confirmOpen={confirmOpen}
          setConfirmOpen={setConfirmOpen}
          handleSubmit={() => navigate("/Account")}
          saveAuth={saveAuth} // передаем функцию для сохранения токена
        />
      </form>
    </div>
  );
}
