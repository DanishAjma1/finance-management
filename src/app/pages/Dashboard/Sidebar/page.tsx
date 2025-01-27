"use client";
import * as React from "react";
import DrawerList from "../DrawerList/page";
import { Box } from "@mui/material";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import { Divider, Grid2, Typography } from "@mui/material";

export default function Sidebar() {
  const StyledGrid = styled(Grid2)(({}) => ({
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
  }));

  return (
    <Box>
      <Grid2>
        <StyledGrid>
          <Grid2 sx={{marginTop:2}}>
            <Image
              src={"/financialManagementIcon.jpg"}
              height={100}
              width={100}
              alt="nothing"
              style={{
                borderRadius: "50%",
                overflow: "hidden",
              }}
            />
          </Grid2>

          <Typography sx={{ fontFamily: "sans-serif" }}>
            Danish Ajmal
          </Typography>
        </StyledGrid>
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
