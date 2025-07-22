"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  IconButton,
  Alert,
  Chip,
  LinearProgress,
  Button,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Refresh, Fullscreen } from "@mui/icons-material";
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

const DashboardAndCharts = () => {
  const [progress, setProgress] = useState(0);
  const [category, setCategory] = useState("Outcome");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [balances, setBalances] = useState([]); // Holds the card data from localStorage
  const [error, setError] = useState(null);

  // Fetch transactions from backend
  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/transactions"); // Replace with your API endpoint
      if (!response.ok) throw new Error("Failed to fetch transactions.");
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch balances/cards from localStorage when the component mounts
  useEffect(() => {
    const savedBalances = JSON.parse(localStorage.getItem("cards")) || [];
    setBalances(savedBalances);
  }, []);

  // Get the first card from the balances array (if it exists)
  const firstCard = balances.length > 0 ? balances[0] : null;

  // Calculate totals for summary
  const totalAmount = transactions.reduce(
    (sum, transaction) => sum + parseFloat(transaction.amount.replace("$", "")),
    0
  );

  const barChartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Sales ($)",
        data: [
          1200, 1900, 3000, 5000, 2400, 3200, 4000, 2800, 3300, 3500, 4200, 4600,
        ],
        backgroundColor: "rgba(63, 81, 181, 0.6)",
        borderColor: "rgba(63, 81, 181, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
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

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 4,
        padding: 4,
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Spending Summary */}
      <Card
        sx={{
          background: "linear-gradient(135deg, #1a1a1a, #000)",
          color: "#fff",
          borderRadius: "16px",
          boxShadow: 4,
          textAlign: "center",
          padding: 3,
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
            Spending Summary
          </Typography>
          <Box sx={{ position: "relative", width: 100, height: 100, margin: "0 auto" }}>
            <CircularProgress
              variant="determinate"
              value={progress}
              thickness={5}
              size={100}
              sx={{ color: "#3f51b5" }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 600, fontSize: "1.6rem" }}>
                {"{"}${progress}%{"}"}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            {`Selected Category: ${category}`}
          </Typography>
          <RadioGroup
            value={category}
            onChange={handleCategoryChange}
            sx={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: 2 }}
          >
            <FormControlLabel
              value="Outcome"
              control={<Radio sx={{ color: "#fff" }} />}
              label="Outcome"
              sx={{ color: "#fff" }}
            />
            <FormControlLabel
              value="Income"
              control={<Radio sx={{ color: "#fff" }} />}
              label="Income"
              sx={{ color: "#fff" }}
            />
            <FormControlLabel
              value="Savings"
              control={<Radio sx={{ color: "#fff" }} />}
              label="Savings"
              sx={{ color: "#fff" }}
            />
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card
       component="a"
      href="pages/Transactions"
        sx={{
          background: "#1e1e1e",
          color: "#fff",
          borderRadius: "16px",
          padding: 3,
          boxShadow: 4,
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Recent Transactions
            </Typography>
            <IconButton sx={{ color: "#fff" }} onClick={fetchTransactions}>
              <Refresh />
            </IconButton>
          </Box>
          {error && <Alert severity="error">{error}</Alert>}
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
              }}
            >
              <CircularProgress sx={{ color: "#fff" }} />
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table>
                  <TableBody>
                    {transactions.map((transaction, index) => (
                      <TableRow key={index} hover>
                        <TableCell
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            borderBottom: "none",
                            gap: 2,
                          }}
                        >
                          <img
                            src={transaction.icon}
                            alt={transaction.title}
                            style={{
                              width: 40,
                              height: 40,
                              objectFit: "contain",
                            }}
                          />
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {transaction.title}
                            </Typography>
                            <Typography variant="body2" color="gray">
                              {transaction.description}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ color: "#fff", borderBottom: "none" }}
                        >
                          {transaction.amount}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ color: "gray", borderBottom: "none" }}
                        >
                          {transaction.date}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TableContainer sx={{ marginTop: 4 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#fff" }}>Category</TableCell>
                      <TableCell sx={{ color: "#fff" }} align="right">
                        Total Amount
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ color: "gray" }}>All Transactions</TableCell>
                      <TableCell sx={{ color: "gray" }} align="right">
                        ${totalAmount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card
         component="a"
      href="pages/Analytics"
        sx={{
          position: "relative",
          width: "100%",
          height: "400px",
          marginTop: 0.5,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#FFFFFF",
        }}
      >
        <Bar data={barChartData} options={barChartOptions} />
      </Card>
      <Card
  sx={{
    marginBottom: 3,
    padding: 3,
    backgroundColor: "#1e1e1e",
    color: "#fff",
    borderRadius: "16px",
    boxShadow: 4,
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: 10,
    },
  }}
>
  <CardContent>
    <Typography variant="h6" sx={{ fontWeight: 500 }}>
      Debit
    </Typography>
    {firstCard ? (
      <>
        <Chip
          label={firstCard.status}
          color={firstCard.status === "Active" ? "success" : "error"}
          sx={{
            marginTop: 1,
            backgroundColor:
              firstCard.cardBrand === "MasterCard" ? "#FFB81C" : "#1976D2",
          }}
        />
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {firstCard.name}
          </Typography>
          <Typography variant="body2">VISA</Typography>
          <Typography variant="body2">{firstCard.expiry}</Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            CVV: {firstCard.showDetails ? firstCard.cvv : "*"}
          </Typography>
          <Typography variant="body2">
            Spending Limit: ${firstCard.spendingLimit.toFixed(2)}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(firstCard.spendingLimit / 10000) * 100}
            sx={{
              mt: 1,
              height: 8,
              borderRadius: 5,
              "& .MuiLinearProgress-bar": {
                backgroundColor:
                  firstCard.spendingLimit > 7000 ? "red" : "lightgreen",
              },
            }}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            PIN: {firstCard.showPin ? firstCard.pin : "**"}
          </Typography>
        </Box>
      </>
    ) : (
      <Typography variant="body2" color="gray">
        No Card Available
      </Typography>
    )}
  </CardContent>
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      marginTop: 2,
    }}
  >
   <Button
                  variant="outlined"href="pages/Card"
                  sx={{
                    color: "#fff",
                    borderColor: "#fff",
                    textTransform: 'none',
                    borderRadius: 20,
                    padding: '6px 20px',
                    '&:hover': { backgroundColor: "#333" }
                  }}
                >
                  Show More 
                </Button>
  </Box>
</Card>
    </Box>
  );
};

export default DashboardAndCharts;