import { Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import Navbar from "../components/extra/navbar";
import { MyProvider } from "../components/context/context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={`${inter.variable} ${sourceCodePro.variable} antialiased`}>
        <MyProvider>
          <Navbar />
          {children}
        </MyProvider>
      </body>
    </html>
  );
}
