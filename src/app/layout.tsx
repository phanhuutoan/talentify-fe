import { Provider } from "@/_components/lib/ui/provider";
import { Toaster } from "@/_components/lib/ui/toaster";
import { Metadata } from "next";
import { Alata } from "next/font/google";

export const metadata: Metadata = {
  title: "Talentify",
};
const alata = Alata({ weight: ["400"], subsets: ["latin", "vietnamese"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={alata.className}>
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
