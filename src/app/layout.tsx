import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Metacreadores",
  description: "Aprende figuras retóricas con IA como tutor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
