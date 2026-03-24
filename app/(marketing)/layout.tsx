import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`relative min-h-screen flex flex-col antialiased ${inter.className}`}>

            <Navbar />

            {/* Main Content Area */}
            {/* Added pt-28 to clear the height of the floating navbar + top spacing */}
            <main className="flex-1 w-full pt-0">
                {children}
            </main>
        </div>
    );
}
