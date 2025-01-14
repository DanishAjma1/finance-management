"use client"
import * as React from 'react';
import { Grid2 } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";

export default function page() {
  return(
    <Grid2>
      <CssBaseline enableColorScheme />
      <Grid2 size={12}>
        <p>Hello it is main page of this application..</p>
      </Grid2>
    </Grid2>
  );
}
