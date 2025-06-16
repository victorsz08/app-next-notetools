import { AuthContextProvider } from "@/context/auth-context";
import "./globals.css";
import { Inter, Poppins } from "next/font/google";


const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"] 
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
        <body className={`${poppins.className} antialiased bg-background`}>
          <AuthContextProvider>
            {children}
          </AuthContextProvider>
        </body>
    </html>
  );
}
