import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import { StateContext } from "@/context/useStateContext";

import "./globals.css";

const ubuntu = Ubuntu({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Multi step form | Frontendmentor",
  description: "Created by @stanko-tomic",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <StateContext>
        <body className={ubuntu.className}>{children}</body>
      </StateContext>
    </html>
  );
}
