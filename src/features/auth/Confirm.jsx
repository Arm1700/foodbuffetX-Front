import React, { useState } from "react";
import { verifyEmail } from "../../shared/api/auth";

export default function Confirm({ confirmOpen, setConfirmOpen, handleSubmit }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    setError("");
    setLoading(true);
    try {
      const form = JSON.parse(localStorage.getItem("authForm") || "{}");
      if (!form.email) throw new Error("Email not found");

      await verifyEmail(form.email, code);

      alert("Էլ․ հասցեն հաջողությամբ հաստատվեց։ Այժմ մուտք գործեք։");
      setConfirmOpen(false);
      handleSubmit();
    } catch (err) {
      setError(err.message || "Հաստատման սխալ");
    } finally {
      setLoading(false);
    }
  };

  if (!confirmOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4">
        <h3 className="text-2xl font-bold text-center text-[#f93c22]">Էլ․ հասցեի հաստատում</h3>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-center">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Մուտքագրեք հաստատման կոդը"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full py-[5%] border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#f93c22] shadow-sm transition"
        />

        <button
          type="button"
          onClick={handleConfirm}
          disabled={loading}
          className={`w-full py-3 text-white font-semibold rounded-2xl transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-[#f93c22] to-[#ff724f] hover:from-[#e2331d] hover:to-[#ff5c3a]"
          }`}
        >
          {loading ? "Հաստատվում է..." : "Հաստատել"}
        </button>

        <button
          type="button"
          onClick={() => setConfirmOpen(false)}
          className="w-full py-3 text-gray-700 font-semibold rounded-2xl border border-gray-300 hover:bg-gray-100 transition"
        >
          Չեղարկել
        </button>
      </div>
    </div>
  );
}
  