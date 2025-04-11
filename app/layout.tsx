// Name: App layout
// By: Danielle Stewart
// Layout for all pages of Database - includes theme and Header
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@mui/material";
import theme from "./utils/theme/theme";
// Components:
import Header from "./layout/Header";

export const metadata: Metadata = {
  title: "ISU | CAS Collaboration System",
  description: `This database stores faculty teaching and research interests within the College and Arts and Sciences.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <Header />
          <div className="page-wrapper">
          {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
