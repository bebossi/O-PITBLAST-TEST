"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/Apollo/apollo.Config";
import { AuthContextMiddleware } from "@/Components/auth/authContextMiddleware";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = useApollo();

  return (
    <html lang="en">
      <AuthContextMiddleware>
        <body className={`${inter.className}`}>
          <ApolloProvider client={client}>{children}</ApolloProvider>
        </body>
      </AuthContextMiddleware>
    </html>
  );
}
