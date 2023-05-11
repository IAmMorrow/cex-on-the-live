import { WalletAPIProvider } from "@ledgerhq/wallet-api-client-react";
import "./globals.css";
import { Inter } from "next/font/google";
import { WalletAPIProviderWrapper } from "./WalletAPIProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cex on the live",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} px-4 w-full`}>
        <main className="pt-6 w-full h-screen">
          <WalletAPIProviderWrapper>{children}</WalletAPIProviderWrapper>
        </main>
      </body>
    </html>
  );
}
