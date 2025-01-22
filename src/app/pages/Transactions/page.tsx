"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
} from "@mui/material";

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    date: "",
    accountNumber: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTransaction = () => {
    const { description, amount, date, accountNumber, cvv } = formData;

    // Basic validation
    if (description && amount && date && accountNumber && cvv) {
      setTransactions((prev) => [...prev, formData]);
      setFormData({
        description: "",
        amount: "",
        date: "",
        accountNumber: "",
        cvv: "",
      }); // Reset form
    } else {
      alert("Please fill out all fields!");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Transaction Page
      </Typography>

      {/* Form Section */}
      <Card sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Add Transaction
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Account Number"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="CVV"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              type="password"
              inputProps={{ maxLength: 3 }}
            />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "right" }}>
  <Button
    variant="contained"
    onClick={handleAddTransaction}
    sx={{
      backgroundColor: "black",
      color: "white",
      "&:hover": {
        backgroundColor: "white",
        color: "black",
        border: "1px solid black",
      },
    }}
  >
    Add Transaction
  </Button>
</Grid>
        </Grid>
      </Card>

      {/* Transaction Table */}
      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Account Number</TableCell>
              <TableCell>CVV</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.accountNumber}</TableCell>
                <TableCell>{transaction.cvv}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {transactions.length === 0 && (
          <Typography
            sx={{ textAlign: "center", py: 2, color: "text.secondary" }}
          >
            No transactions available.
          </Typography>
        )}
      </TableContainer>
    </Box>
  );
};

export default TransactionPage;
