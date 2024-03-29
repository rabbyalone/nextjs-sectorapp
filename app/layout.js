import { Inter } from "next/font/google";
import "./globals.css";
import FooterPage from "./footer/page";
import NavigationPage from "./components/navigation";

const inter = Inter({ subsets: ["latin"]});

export const metadata = {
  title: "Sector Grouping App",
  description: "next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="min-h-screen">
      <body className={inter.className}>
        <NavigationPage />
        <div className="min-h-screen mx-auto bg-gray-500">
        {children}          
        </div>
        <FooterPage />
        </body>
    </html>
  );
}
