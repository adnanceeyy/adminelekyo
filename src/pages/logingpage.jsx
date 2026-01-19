import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import {
  IconMail,
  IconLock,
  IconArrowRight,
  IconShieldLock,
  IconEye,
  IconEyeOff
} from "@tabler/icons-react";

export default function LoginPage({ isDark = true }) {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin@123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await AuthService.login(email, password);

      // STRICT ADMIN CHECK: Only allow users with role 'admin'
      if (response && response.token) {
        if (response.role === "admin") {
          navigate("/main");
        } else {
          setError("ACCESS DENIED: ADMIN PRIVILEGES REQUIRED");
          AuthService.logout(); // Clear token for security
        }
      } else {
        setError("AUTHENTICATION FAILURE: INVALID RESPONSE");
      }
    } catch (err) {
      setError(err.message || "AUTHENTICATION FAILURE: INVALID CREDENTIALS");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 font-montserrat transition-colors duration-500 ${isDark ? "bg-gray-950" : "bg-gray-50"}`}>
      <div className="relative z-10 w-full max-w-[420px]">
        {/* Simple Brand Header */}
        <div className="text-center mb-10">
          <h1 className={`text-2xl font-bold tracking-tight mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
            Eleckyo Admin
          </h1>
          <p className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Please enter your details to sign in
          </p>
        </div>

        {/* Clean Login Card */}
        <div className={`rounded-[32px] p-8 md:p-10 shadow-2xl transition-all border ${isDark ? "bg-gray-900/50 border-gray-800 backdrop-blur-xl" : "bg-white border-gray-100"}`}>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className={`text-xs font-bold ml-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Email Address</label>
                <div className="relative group">
                  <IconMail size={20} className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isDark ? "text-gray-500 group-focus-within:text-blue-500" : "text-gray-400 group-focus-within:text-blue-600"}`} />
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full rounded-2xl pl-12 pr-4 py-3.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${isDark ? "bg-gray-800 border-gray-700 text-white placeholder-gray-600" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"}`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className={`text-xs font-bold ${isDark ? "text-gray-400" : "text-gray-600"}`}>Password</label>
                  <button type="button" className="text-xs font-bold text-blue-500 hover:text-blue-600 transition-colors">Forgot Password?</button>
                </div>
                <div className="relative group">
                  <IconLock size={20} className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isDark ? "text-gray-500 group-focus-within:text-blue-500" : "text-gray-400 group-focus-within:text-blue-600"}`} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full rounded-2xl pl-12 pr-12 py-3.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${isDark ? "bg-gray-800 border-gray-700 text-white placeholder-gray-600" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors hover:text-blue-500 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                  >
                    {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className={`p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-1 ${isDark ? "bg-red-500/10 border border-red-500/20 text-red-500" : "bg-red-50 border border-red-100 text-red-600"}`}>
                <IconShieldLock size={18} className="shrink-0" />
                <span className="text-xs font-bold leading-tight">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-2xl transition-all duration-300 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-wait"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <>
                  <span>Sign In</span>
                  <IconArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className={`text-center mt-10 text-xs font-medium ${isDark ? "text-gray-600" : "text-gray-400"}`}>
          &copy; 2026 Eleckyo Admin Portal
        </p>
      </div>
    </div>
  );
}
