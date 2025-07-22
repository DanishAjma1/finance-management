import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Dashboard from "./pages/Dashboard/page";
import Sidebar from "./pages/Dashboard/Sidebar/page";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import { ToastContainer } from "react-toastify";
import { Provider } from "./provider";
import CssBaseline from "@mui/material/CssBaseline";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finance Management Application",
  description: "Structuring and managing your finances effectively",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ToastContainer />
          <CssBaseline enableColorScheme />

          <Box sx={{ flexGrow: 1, margin: 0.5 }}>
            <Grid2 container sx={{ display: "flex", flexWrap: "nowrap" }}>
              <Grid2
                size={{ md: 2.4 }}
                sx={{
                  minWidth: { md: 250 },
                  display: { md: "flex", xs: "none" },
                }}
              >
                <Grid2
                  sx={{
                    width: "100%",
                    marginX: { md: 1 },
                    borderRadius: "10px",
                    boxShadow: 1,
                    height: "98vh",
                  }}
                >
                  <Grid2>
                    <Sidebar />
                  </Grid2>
                </Grid2>
              </Grid2>
              <Grid2 size={{ md: 9.6, xs: 12 }}>
                <Dashboard />
                <Box>{children}</Box>
              </Grid2>
            </Grid2>
          </Box>
        </body>
      </Provider>
    </html>
  );
}
