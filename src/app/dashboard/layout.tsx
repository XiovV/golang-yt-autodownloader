import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import SideNav from "@/components/navigation/SideNav";
import BottomNav from "@/components/navigation/BottomNav";
import { Toaster } from "@/components/ui/toaster";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Golty",
  description: "Archiving YouTube has never been easier!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className="flex h-screen flex-col lg:flex-row">
          <div className="hidden lg:block w-full flex-none lg:w-80">
            <SideNav />
          </div>

          <div className="flex-grow overflow-y-auto bg-[#101419]">
            {children}
          </div>

          <Toaster />
          <div>
            <BottomNav />
          </div>
        </div>
      </body>
    </html>
  );
}
