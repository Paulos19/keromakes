import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`min-h-screen w-full flex items-center justify-center bg-[#F2F2F7] antialiased ${inter.className}`}>
            {/* Decorative Auth Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#D98FB5] opacity-20 blur-[140px] rounded-full mix-blend-multiply"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#A8E6CF] opacity-20 blur-[140px] rounded-full mix-blend-multiply"></div>
            </div>

            {/* Auth Content Container */}
            <div className="relative z-10 w-full max-w-lg px-6">
                {children}
            </div>
        </div>
    );
}
