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
  Grid2,
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
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Transaction } from "mongodb";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardAndCharts = () => {
  const [accounts, setAccounts] = React.useState([]);
  const [progress, setProgress] = useState(0);
  const [category, setCategory] = useState("Credit");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState(null);
  const [error, setError] = useState(null);
  const [debit, setDebit] = useState(null);
  const [credit, setCredit] = useState(null);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/transactions", {
        method: "GET",
      });
      if (!response.ok) throw new Error("Failed to fetch transactions.");
      const { transactions } = await response.json();
      const lastTransactions = transactions.slice(-2);
      setTransactions(
        lastTransactions.map((transaction) => {
          return {
            acc_num: transaction.acc_num,
            amount: transaction.amount,
          };
        })
      );
      const totalBalance = transactions.reduce((sum, acc) => {
        return sum + acc.amount;
      }, 0);
      setDebit(totalBalance);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAccounts = async () => {
    try {
      const response = await fetch("/api/bankAccounts", {
        method: "GET",
      });
      if (response.ok) {
        const { bankAccount } = await response.json();
        setAccounts(
          bankAccount.map((account) => {
            return {
              label: account.name,
              balance: account.balance,
            };
          })
        );
        const totalBalance = bankAccount.reduce((sum, acc) => {
          return sum + acc.balance;
        }, 0);
        setCredit(totalBalance);
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };
  const fetchCard = async () => {
    try {
      const res = await fetch("/api/cards", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const { cards } = await res.json();
        setCard(cards.length > 0 ? cards[0] : null);
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };
  React.useEffect(() => {
    fetchTransactions();
    fetchAccounts();
    fetchCard();
  }, []);
  const firstCard = card;
  const totalAmount = transactions.reduce(
    (sum, transaction) => sum + parseFloat(transaction.amount),
    0
  );

  const barChartData = {
    labels: accounts.map((account) => account.label),
    datasets: [
      {
        label: "Accounts Analytics ($)",
        data: accounts.map((account) => account.balance),
        backgroundColor:
          "linear-gradient(90deg, rgba(63, 81, 181, 0.6), rgba(33, 150, 243, 0.6))", // Gradient effect
        borderColor: "rgb(75, 0, 44)",
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
          text: "Account Owners",
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
          text: "Accounts ($)",
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
        text: "Total Account Analytics",
        color: "#3F51B5",
        font: {
          weight: "bold",
          size: 20,
        },
      },
    },
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const { status } = useSession();

  const router = useRouter();

  const showSession = () => {
    if (status === "authenticated") {
      return (
        <button
          className="border border-solid border-black rounded"
          onClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push("/");
            });
          }}
        >
          Sign Out
        </button>
      );
    } else if (status === "loading") {
      return <span className="text-[#888] text-sm mt-7">Loading...</span>;
    } else {
      return (
        <Link
          href="/pages/signIn"
          className="border border-solid border-black rounded"
        >
          Sign In
        </Link>
      );
    }
  };

  return (
    <Grid2
      sx={{
        display: "grid",
        padding: 4,
      }}
      gap={4}
    >
      <Grid2
        size={12}
        columnGap={{ lg: 2 }}
        rowGap={{ xs: 4 }}
        sx={{ display: "flex", flexDirection: { lg: "row", xs: "column" } }}
      >
        {/* Spending Summary */}
        <Card
          sx={{
            background: "linear-gradient(135deg, #1a1a1a, #000)",
            width: "100%",
            color: "#fff",
            borderRadius: "16px",
            boxShadow: 4,
            textAlign: "center",
            padding: 3,
            transition:
              "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: 10,
            },
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
              Spending Summary
            </Typography>
            <Box
              sx={{
                position: "relative",
                width: 100,
                height: 100,
                margin: "0 auto",
              }}
            >
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
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 600, fontSize: "1.6rem" }}
                >
                  {category === "Credit" ? credit : debit}{" "}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              {`Selected Category: ${category}`}
            </Typography>
            <RadioGroup
              value={category}
              onChange={handleCategoryChange}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 2,
              }}
            >
              <FormControlLabel
                value="Credit"
                control={<Radio sx={{ color: "#fff" }} />}
                label="Credit"
                sx={{ color: "#fff" }}
              />
              <FormControlLabel
                value="Debit"
                control={<Radio sx={{ color: "#fff" }} />}
                label="Debit"
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
            width: "100%",
            background: "#1e1e1e",
            color: "#fff",
            borderRadius: "16px",
            padding: 3,
            boxShadow: 4,
            transition:
              "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: 10,
            },
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
                            <Box>
                              <Typography
                                variant="body1"
                                sx={{
                                  fontWeight: 600,
                                  color: "gray",
                                  borderBottom: "none",
                                }}
                              >
                                {"*********" + transaction.acc_num.slice(-5)}
                              </Typography>
                              <Typography variant="body2" color="gray">
                                {transaction.balance}
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
                        <TableCell sx={{ color: "gray" }}>
                          All Transactions
                        </TableCell>
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
      </Grid2>
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
                label={firstCard.state}
                color={firstCard.state === "Active" ? "success" : "error"}
                sx={{
                  marginTop: 1,
                  backgroundColor:
                    firstCard.cardBrand === "MasterCard"
                      ? "#FFB81C"
                      : "#1976D2",
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
                  CVV: {firstCard?.showDetails ? firstCard.cvv : "***"}
                </Typography>
                <Typography variant="body2">
                  Spending Limit: ${firstCard.limit.toFixed(2)}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(firstCard.limit / 10000) * 100}
                  sx={{
                    mt: 1,
                    height: 8,
                    borderRadius: 5,
                    "& .MuiLinearProgress-bar": {
                      backgroundColor:
                        firstCard.limit > 7000 ? "red" : "lightgreen",
                    },
                  }}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  PIN: {firstCard?.showPin ? firstCard.pin : "****"}
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
            variant="outlined"
            href="pages/Card"
            sx={{
              color: "#fff",
              borderColor: "#fff",
              textTransform: "none",
              borderRadius: 20,
              padding: "6px 20px",
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            Show More
          </Button>
        </Box>
      </Card>
      {showSession()}
    </Grid2>
  );
};

export default DashboardAndCharts;
