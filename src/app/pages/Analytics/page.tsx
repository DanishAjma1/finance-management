"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import { Box, Typography, Paper, Grid } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  // Chart Data
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
      {
        label: "Sales ($)",
        data: [1200, 1900, 3000, 5000, 2400, 3200, 4000, 2800, 3300, 3500, 4200, 4600],
        backgroundColor: "linear-gradient(90deg, rgba(63, 81, 181, 0.6), rgba(33, 150, 243, 0.6))", // Gradient effect
        borderColor: "rgba(63, 81, 181, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Month",
          color: "#3F51B5",
          font: {
            weight: "bold",
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Sales ($)",
          color: "#3F51B5",
          font: {
            weight: "bold",
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales Analytics",
        color: "#3F51B5",
        font: {
          weight: "bold",
        },
      },
    },
  };

  // Analytics Insights
  const insights = [
    { title: "Highest Sales", detail: "April saw the highest sales at $5000." },
    { title: "Lowest Sales", detail: "January had the lowest sales at $1200." },
    { title: "Average Sales", detail: "Average monthly sales: $2783." },
    { title: "Growth", detail: "Significant growth observed in March and April." },
  ];

  return (
    <Paper elevation={6} sx={{ padding: 4, marginTop: 4, borderRadius: 3, backgroundColor: "#F5F5F5" }}>
      <Typography
        variant="h6"
        gutterBottom
        align="center"
        sx={{
          fontWeight: "bold",
          color: "#3F51B5",
          textTransform: "uppercase",
          letterSpacing: 1.2,
        }}
      >
        Analytics Overview
      </Typography>
      <Grid container spacing={3}>
        {/* Bar Chart Section */}
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "350px", // Adjusted for better visibility
              margin: "0 auto",
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: "#FFFFFF",
            }}
          >
            <Bar data={data} options={options} />
          </Box>
        </Grid>

        {/* Analytics Information Section */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              color: "#3F51B5",
              textTransform: "uppercase",
              marginBottom: 3,
            }}
          >
            Analytics Insights
          </Typography>
          <Box sx={{ padding: 2, backgroundColor: "#FFFFFF", borderRadius: 2, boxShadow: 2 }}>
            {insights.map((insight, index) => (
              <Box key={index} sx={{ marginBottom: 2, padding: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    color: "rgba(63, 81, 181, 1)",
                    transition: "color 0.3s ease",
                    "&:hover": { color: "#1976D2" }, // Hover effect for interactivity
                  }}
                >
                  {insight.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#616161" }}>
                  {insight.detail}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BarChart;
