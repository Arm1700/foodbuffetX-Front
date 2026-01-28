import React, { useEffect, useMemo, useState } from "react";
import { confirmPasswordReset, login, requestPasswordReset } from "../../shared/api/auth";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Login() {
  const { saveAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [resetPasswordConfirm, setResetPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const resetUid = useMemo(() => searchParams.get("uid") || "", [searchParams]);
  const resetToken = useMemo(() => searchParams.get("token") || "", [searchParams]);
  const isResetMode = !!(searchParams.get("reset") && resetUid && resetToken);
  const [isForgotMode, setIsForgotMode] = useState(false);

  useEffect(() => {
    // If user opened link from email, show reset form automatically
    if (isResetMode) {
      setIsForgotMode(false);
      setError("");
      setMessage("");
    }
  }, [isResetMode]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
  
    try {
      const data = await login(email, password);
      
      saveAuth(data);                              
      localStorage.setItem("auth", JSON.stringify(data));
    
      navigate("/Account");
    } catch (err) {
      console.log(err);
      setError(err.error || err.detail || "Login error");
    }
  }

  async function handleRequestReset(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await requestPasswordReset(email);
      setMessage(res?.message || "If the email exists, a reset link has been sent.");
    } catch (err) {
      setError(err.error || err.detail || "Reset request error");
    }
  }

  async function handleConfirmReset(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await confirmPasswordReset(
        resetUid,
        resetToken,
        resetPassword,
        resetPasswordConfirm
      );
      setMessage(res?.message || "Password has been reset successfully. You can sign in now.");
      // clean URL params after success
      setSearchParams({});
      setResetPassword("");
      setResetPasswordConfirm("");
      setIsForgotMode(false);
    } catch (err) {
      setError(err.error || err.detail || "Reset confirm error");
    }
  }

  return (
    <div className="px-[3%] py-6 h-full flex justify-center items-start mt-[23%]">
      {isResetMode ? (
        <form className="rounded-2xl p-8 w-full max-w-md space-y-5" onSubmit={handleConfirmReset}>
          <h2 className="text-[#f93c22] text-3xl font-bold text-center mb-4">Reset password</h2>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-center">
              {error}
            </div>
          )}
          {message && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-center">
              {message}
            </div>
          )}

          <input
            type="password"
            placeholder="New password"
            value={resetPassword}
            onChange={(e) => setResetPassword(e.target.value)}
            required
            className="w-full py-[5%] border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#f93c22] shadow-sm transition"
          />

          <input
            type="password"
            placeholder="Confirm new password"
            value={resetPasswordConfirm}
            onChange={(e) => setResetPasswordConfirm(e.target.value)}
            required
            className="w-full py-[5%] border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#f93c22] shadow-sm transition"
          />

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#f93c22] to-[#ff724f] text-white font-semibold rounded-2xl hover:from-[#e2331d] hover:to-[#ff5c3a] transition"
          >
            Set new password
          </button>

          <button
            type="button"
            onClick={() => {
              setSearchParams({});
              setResetPassword("");
              setResetPasswordConfirm("");
            }}
            className="w-full py-3 border border-gray-300 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 transition"
          >
            Back to login
          </button>
        </form>
      ) : isForgotMode ? (
        <form className="rounded-2xl p-8 w-full max-w-md space-y-5" onSubmit={handleRequestReset}>
          <h2 className="text-[#f93c22] text-3xl font-bold text-center mb-4">Forgot password</h2>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-center">
              {error}
            </div>
          )}
          {message && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-center">
              {message}
            </div>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full py-[5%] border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#f93c22] shadow-sm transition"
          />

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#f93c22] to-[#ff724f] text-white font-semibold rounded-2xl hover:from-[#e2331d] hover:to-[#ff5c3a] transition"
          >
            Send reset link
          </button>

          <button
            type="button"
            onClick={() => {
              setIsForgotMode(false);
              setError("");
              setMessage("");
            }}
            className="w-full py-3 border border-gray-300 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 transition"
          >
            Back to login
          </button>
        </form>
      ) : (
        <form className="rounded-2xl p-8 w-full max-w-md space-y-5" onSubmit={handleSubmit}>
          <h2 className="text-[#f93c22] text-3xl font-bold text-center mb-4">Login</h2>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-center">
              {error}
            </div>
          )}
          {message && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-center">
              {message}
            </div>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full py-[5%] border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#f93c22] shadow-sm transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full py-[5%] border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#f93c22] shadow-sm transition"
          />

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#f93c22] to-[#ff724f] text-white font-semibold rounded-2xl hover:from-[#e2331d] hover:to-[#ff5c3a] transition"
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => {
              setIsForgotMode(true);
              setError("");
              setMessage("");
            }}
            className="w-full text-sm font-semibold text-gray-600 hover:text-[#f93c22] transition"
          >
            Forgot password?
          </button>
        </form>
      )}
    </div>
  );
}
