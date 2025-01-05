"use client";
import * as React from "react";
import DrawerList from "../drawerList/page";
import { Box } from "@mui/material";
import Image from "next/image";
import { Divider, Grid2, Typography } from "@mui/material";

export default function Sidebar() {
  return (
    <Box>
      <Grid2>
        <Grid2
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 3,
          }}
        >
          <Image
            src={"/financialManagementIcon.jpg"}
            height={100}
            width={100}
            alt="nothing"
            className="rounded-[50%]"
          />
          <Typography sx={{ fontFamily: "sans-serif" }}>
            Danish Ajmal
          </Typography>
        </Grid2>
        <Grid2 sx={{ marginTop: 5 }}>
          <Divider sx={{ textAlign: "start", fontFamily: "monospace" }}>
            Main Componants
          </Divider>
          <DrawerList />
        </Grid2>
      </Grid2>
    </Box>
  );
}
