
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#000000] justify-center items-center">
      <body className={inter.className}>
        <ToastContainer />
        <div className=" bg-[#0c0c0c] w-full flex flex-col justify-center min-h-[600px] h-screen items-center relative overflow-auto bg-[url('/background.webp')] bg-cover bg-repeat">
          <div className={inter.className}>{children}</div>
        </div>
      </body>
    </html>
  );
}
