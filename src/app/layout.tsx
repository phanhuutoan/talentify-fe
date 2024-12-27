import { Provider } from "@/_components/lib/ui/provider";
import { Toaster } from "@/_components/lib/ui/toaster";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talentify",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
