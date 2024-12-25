import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Dashboard from "./pages/dashboard/page";
import Sidebar from "./pages/sidebar/page";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Box sx={{ flexGrow: 1, margin: 0.5 }}>
          <Grid container sx={{ display: "flex", flexWrap: "nowrap" }}>
            <Grid
              size={{ md: 2.4 }}
              sx={{
                minWidth: { md: 250 },
                display: { md: "flex", xs: "none" },
              }}
            >
              <Grid
                sx={{
                  marginX: { md: 1 },
                  borderRadius: "10px",
                  boxShadow: 1,
                  height: "98vh",
                }}
              >
                <Grid sx={{ marginX: { md: 1 } }}>
                  <Sidebar />
                </Grid>
              </Grid>
            </Grid>
            <Grid size={{ md: 9.6, xs: 12 }}>
              <Dashboard />
              <Box>{children}</Box>
            </Grid>
          </Grid>
        </Box>
      </body>
    </html>
  );
}
