import { Provider } from "@/_components/lib/ui/provider";
import { Toaster } from "@/_components/lib/ui/toaster";
import { Metadata } from "next";
import { Alata, Open_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: "Talentify",
};
const alata = Alata({ weight: ["400"], subsets: ["latin", "vietnamese"] });
const openSans = Open_Sans({
  weight: ["300", "500", "700"],
  subsets: ["latin", "vietnamese"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={[alata.className, openSans.className].join(" ")}>
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
