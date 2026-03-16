import { useNavigate } from "react-router";
import React, { useState } from "react";
import { Footer } from "../components/Footer";

export const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: '', password: ''});
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch ("http://localhost:4559/api/users/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(credentials),
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed')
            }

            localStorage.setItem("user", JSON.stringify(data.user));
            console.log("Success:", data);
            navigate("/search")

        } catch (err) {
            setError(err.message);
        }
    }

    const handleRegister = () => {
        navigate ("/register")
    }

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <main className="grow flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
            
            <h2 className="text-3xl font-black text-slate-800 mb-2 text-center">Welcome Back</h2>
            <p className="text-slate-500 text-center mb-8 text-sm">Log in to your Breathe profile to see your saved stations.</p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-lg">
                {error}
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 tracking-wide uppercase">
                  Username
                </label>
                <input 
                  type="text" 
                  name="username"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder-slate-300"
                  placeholder="Enter your username"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 tracking-wide uppercase">
                  Password
                </label>
                <input 
                  type="password"   
                  name="password"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder-slate-300"
                  placeholder="••••••••"
                  onChange={handleChange}
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-[0.98]"
              >
                Login here!
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-50 flex flex-col items-center gap-4">
              <button 
                onClick={handleRegister}
                className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors text-sm"
              >
                No account yet? Register here.
              </button>

              <button 
                onClick={() => navigate("/checklocation")}
                className="text-slate-400 font-bold hover:text-slate-600 transition-colors text-[11px] uppercase tracking-widest"
              >
                Continue without an account
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
}