import { Inter } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@utils/navbarWrapper";
import SessionWrapper from "@components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Switch Admin",
  description: "Admin",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <NavbarWrapper />
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
