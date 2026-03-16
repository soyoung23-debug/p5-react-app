import { useState } from "react";
import { useNavigate } from "react-router";
import { Footer } from "../components/Footer";

export const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch("http://localhost:4559/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Registration failed");
            }

            alert("Account created successfully!");
            navigate("/login");
        } catch (err) {
            setError(err.message);
        }
    };

    // The return must be INSIDE the Register component function
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <main className="grow flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
                    <h2 className="text-3xl font-black text-slate-800 mb-2 text-center">Create Account</h2>
                    <p className="text-slate-500 text-center mb-8 text-sm">Join Breathe to start tracking air quality.</p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 tracking-wide uppercase">Full Name</label>
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange} 
                                placeholder="e.g. John Doe"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 tracking-wide uppercase">Username</label>
                            <input 
                                type="text" 
                                name="username"
                                value={formData.username}
                                onChange={handleChange} // Added this
                                placeholder="Choose a unique username"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 tracking-wide uppercase">Password</label>
                            <input 
                                type="password"   
                                name="password"
                                value={formData.password}
                                onChange={handleChange} // Added this
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                required
                            />
                        </div>

                        <button 
                            type="submit" // Changed to submit for the onSubmit handler
                            className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg active:scale-[0.98] mt-4"
                        >
                            Register
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-50 text-center">
                        <p className="text-slate-400 text-sm">
                            Already have an account?{" "}
                            <button onClick={() => navigate("/login")} className="text-slate-900 font-bold hover:underline">
                                Login here
                            </button>
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};