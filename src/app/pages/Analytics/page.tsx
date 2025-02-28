"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import { Box, Typography, Paper, Grid2, Button } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const BarChart = () => {
  const fetchAccounts = async () => {
    try {
      const response = await fetch("/api/transactions", {
        method: "GET",
      });
      if (response.ok) {
        const { transactions } = await response.json();
        setAccounts(
          transactions.map((account) => {
            return {
              accountType:account.accountType,
              acc_num: account.acc_num,
              label: account.description,
              amount: account.amount,
            };
          })
        );
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };
  
  React.useEffect(() => {
    fetchAccounts();
  }, []);
  const [accounts,setAccounts] = React.useState([]);
  const data = {
    labels: ["CREDIT Transactions", "DEBIT Transactions"], 
    datasets: [
      {
        label: "Transaction Details",
        data: [
          accounts.filter((account) => account.accountType === "debit").length, 
          accounts.reduce((total, account) => total + account.amount, 0), 
        ],
        backgroundColor: ["rgba(63, 81, 181, 0.6)", "rgba(255, 99, 132, 0.6)"], // Colors for the bars
        borderColor: ["rgb(63, 81, 181)", "rgb(255, 99, 132)"],
        borderWidth: 1,
      },
    ],
  };
  
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
          text: "Accounts Owners",
          color: "rgb(0, 38, 51)",
          font: {
            weight: "bold" as const,
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Accounts ($)",
          color: "rgb(0, 27, 36)",
          font: {
            weight: "bold" as const,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Total Accounts Analytics",
        color: "rgb(22, 0, 79)",
        font: {
          weight: "bold" as const,
        },
      },
    },
  };
  const highestAccount = accounts.length > 0
  ? accounts.reduce((highestAcc, acc) => (acc.balance > highestAcc.balance ? acc : highestAcc), accounts[0])
  : "No Accounts available";

  const lowestAccount = accounts.length > 0
  ? accounts.reduce((highestAcc, acc) => (acc.balance < highestAcc.balance ? acc : highestAcc), accounts[0])
  : "No Accounts available";

  const averageBalance = accounts.length > 0
  ? accounts.reduce((sum, acc) => sum + acc.balance, 0) / accounts.length
  : 0;

  const insights = [
    { title: "Highest Amount Account",detail: highestAccount.acc_num + " had the highest balance at $"+ highestAccount.balance+"."},
    { title: "Lowest Amount Account", detail: lowestAccount.acc_num +  " had the lowest balance at $"+ lowestAccount.balance+"."},
    { title: "Average Amount Account", detail: "Average Accounts Debits: "+ "$" + averageBalance+"." },  ];

  return (
    <Paper elevation={6} sx={{ padding: 4, marginTop: 4, borderRadius: 3, backgroundColor: "#F5F5F5" }}>
      <Typography
        variant="h6"
        gutterBottom
        align="left"
        sx={{
          fontWeight: "bold",
          color: "rgb(0, 26, 42)",
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        Analytics Overview
      </Typography>
      <Grid2 container spacing={3}>
        <Grid2 size={{ sm: 12, md: 6,lg:8 }}>
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
        </Grid2>

        {/* Analytics Information Section */}
        <Grid2 size={{sm:12 , md:6, lg:4 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              color: "rgb(0, 8, 32)",
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
                    color: "rgb(120, 0, 70)",
                    transition: "color 0.3s ease",
                    "&:hover": { color: "#1976D2" }, // Hover effect for interactivity
                  }}
                >
                  {insight.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "rgb(48, 50, 0)" }}>
                  {insight.detail}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid2>
      </Grid2>
    </Paper>
  );
};

export default BarChart;
