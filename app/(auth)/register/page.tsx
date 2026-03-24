"use client";

import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, CheckCircle2 } from "lucide-react";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [passwordStrength, setPasswordStrength] = useState(0);

    const evaluatePassword = (password: string) => {
        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const handlePasswordChange = (value: string) => {
        setForm({ ...form, password: value });
        setPasswordStrength(evaluatePassword(value));
    };

    const strengthLabel = ["", "Fraca", "Regular", "Boa", "Forte", "Excelente"];
    const strengthColor = ["", "#EF4444", "#F59E0B", "#EAB308", "#22C55E", "#16A34A"];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (form.password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Erro ao cadastrar");
                setLoading(false);
                return;
            }

            // Auto-login after register
            const signInRes = await signIn("credentials", {
                email: form.email,
                password: form.password,
                redirect: false,
            });

            if (signInRes?.error) {
                // Registered successfully but auto-login failed — redirect to login
                router.push("/login");
            } else {
                router.push("/dashboard");
            }
        } catch {
            setError("Erro interno. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`${inter.className} w-full`}>
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-white/50 w-full">

                {/* Back to Login */}
                <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#86868B] hover:text-[#1E1941] transition-colors mb-6 group"
                >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                    Voltar ao login
                </Link>

                {/* Brand Logo */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-3">
                        <Image
                            src="/logos/foreground-1774363745959.png"
                            alt="KeroMake Logo"
                            width={180}
                            height={50}
                            className="object-contain h-11 w-auto"
                            priority
                        />
                    </div>
                    <p className="text-sm text-[#86868B] mt-2">
                        Crie sua conta e descubra o melhor da beleza
                    </p>
                </div>

                {/* Google Register */}
                <button
                    onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                    className="w-full flex items-center justify-center gap-3 bg-[#F8F9FA] border border-[#1E1941]/5 rounded-2xl py-3.5 text-sm font-semibold text-[#1E1941] hover:bg-[#F2F2F7] transition-colors cursor-pointer mb-6"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Cadastrar com Google
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-[#1E1941]/5"></div>
                    <span className="text-[11px] text-[#86868B] font-medium uppercase tracking-wider">ou</span>
                    <div className="flex-1 h-px bg-[#1E1941]/5"></div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Name */}
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868B]" />
                        <input
                            type="text"
                            placeholder="Seu nome completo"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            className="w-full bg-[#F8F9FA] border border-[#1E1941]/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-[#1E1941] placeholder-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#D98FB5]/40 transition-shadow"
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868B]" />
                        <input
                            type="email"
                            placeholder="Seu melhor email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                            className="w-full bg-[#F8F9FA] border border-[#1E1941]/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-[#1E1941] placeholder-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#D98FB5]/40 transition-shadow"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868B]" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Crie uma senha segura"
                            value={form.password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                            required
                            className="w-full bg-[#F8F9FA] border border-[#1E1941]/5 rounded-2xl py-3.5 pl-12 pr-12 text-sm text-[#1E1941] placeholder-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#D98FB5]/40 transition-shadow"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#86868B] hover:text-[#1E1941] transition-colors cursor-pointer"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {form.password.length > 0 && (
                        <div className="flex flex-col gap-2 px-1">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((level) => (
                                    <div
                                        key={level}
                                        className="h-1.5 flex-1 rounded-full transition-all duration-300"
                                        style={{
                                            backgroundColor: passwordStrength >= level
                                                ? strengthColor[passwordStrength]
                                                : "#E5E5EA",
                                        }}
                                    />
                                ))}
                            </div>
                            <span
                                className="text-[11px] font-semibold transition-colors"
                                style={{ color: strengthColor[passwordStrength] || "#86868B" }}
                            >
                                {strengthLabel[passwordStrength]}
                            </span>
                        </div>
                    )}

                    {/* Password Requirements */}
                    <div className="flex flex-col gap-1.5 px-1">
                        {[
                            { label: "Mínimo 6 caracteres", met: form.password.length >= 6 },
                            { label: "Uma letra maiúscula", met: /[A-Z]/.test(form.password) },
                            { label: "Um número", met: /[0-9]/.test(form.password) },
                        ].map((req, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <CheckCircle2
                                    className={`w-3.5 h-3.5 transition-colors ${req.met ? "text-[#22C55E]" : "text-[#E5E5EA]"
                                        }`}
                                />
                                <span
                                    className={`text-[11px] font-medium transition-colors ${req.met ? "text-[#22C55E]" : "text-[#86868B]"
                                        }`}
                                >
                                    {req.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {error && (
                        <p className="text-red-500 text-xs font-medium bg-red-50 rounded-xl px-4 py-2">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#1E1941] text-white rounded-2xl py-3.5 text-sm font-bold hover:bg-[#2a2360] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                        {loading ? "Criando sua conta..." : "Criar Conta"}
                    </button>
                </form>

                {/* Terms */}
                <p className="text-center text-[10px] text-[#86868B] mt-5 leading-relaxed">
                    Ao criar sua conta, você concorda com nossos{" "}
                    <span className="text-[#D98FB5] font-semibold cursor-pointer hover:underline">Termos de Uso</span>
                    {" "}e{" "}
                    <span className="text-[#D98FB5] font-semibold cursor-pointer hover:underline">Política de Privacidade</span>.
                </p>

                {/* Toggle */}
                <p className="text-center text-sm text-[#86868B] mt-5">
                    Já tem conta?{" "}
                    <Link href="/login" className="text-[#D98FB5] font-semibold hover:underline">
                        Fazer login
                    </Link>
                </p>

            </div>
        </div>
    );
}
