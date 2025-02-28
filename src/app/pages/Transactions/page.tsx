"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  MenuItem,
  styled,
  Grid2,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { toast } from "react-toastify";

const TransactionPage = () => {
  const [transactions, setTransactions] = React.useState([]);
  const [accounts, setAccounts] = React.useState([]);

  const validationSchema = Yup.object({
    description: Yup.string().required("Description is required"),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive"),
    acc_num: Yup.string()
      .required("Account Number is required")
      .matches(/^[0-9]{16}$/, "Account Number must be 16 digit"),
  });

  const StyledCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: "black",
    color: "white",
    fontSize: "medium",
    fontWeight: "lighter",
  }));
  const deleteButton = async (tran) => {
    try {
      const response = await fetch(`/api/transactions?id=${tran._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const updatedTransactions = transactions.filter(
          (transaction) => transaction._id !== tran._id
        );
        setTransactions(updatedTransactions);
        toast.info("Transaction deleted successfully..");
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const fetchAccounts = async () => {
    try {
      const response = await fetch("/api/bankAccounts", {
        method: "GET",
      });
      const response2 = await fetch("/api/transactions", {
        method: "GET",
      });
      if (response.ok && response2.ok) {
        const { bankAccount } = await response.json();
        setAccounts(bankAccount);
        const { transactions } = await response2.json();
        setTransactions(transactions);
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  React.useEffect(() => {
    fetchAccounts();
  }, []);

  const initialValues = {
    description: "",
    amount: "",
    date: "",
    acc_num: "",
    accountType:"Debit"
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (!values.date) {
      values.date = new Date(Date.now()).toDateString().split("T")[0];
    }

    const respons = await fetch("/api/bankAccounts", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ acc_num: values.acc_num, amount: values.amount,accountType:values.accountType }),
    });
    if (respons.ok) {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        toast.success("Transaction Successful..");
        fetchAccounts();
        resetForm();
      }
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Transaction Page
      </Typography>

      <Card sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: "lighter" }}>
          Add Transaction..
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <Box display="grid" gap={2} gridTemplateColumns="repeat(2, 1fr)">
                <TextField
                  label="Description(Optional)"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  variant="outlined"
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && typeof errors.description === "string" ? errors.description : null}
                />
                <TextField
                disabled
                  
                  name="accountType"
                  value={values.accountType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  variant="outlined"
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && typeof errors.description === "string" ? errors.description : null}
                />
                <TextField
                  label="Amount"
                  name="amount"
                  value={values.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  variant="outlined"
                  type="number"
                  error={touched.amount && Boolean(errors.amount)}
                  helperText={touched.amount && typeof errors.amount === "string" ? errors.amount : null}
                />
                <TextField
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  variant="outlined"
                  type="date"
                  error={touched.date && Boolean(errors.date)}
                  helperText={touched.date && typeof errors.date === "string" ? errors.date : null}
                />
                <TextField
                  select
                  name="acc_num"
                  value={values.acc_num}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  fullWidth
                  variant="outlined"
                  error={touched.acc_num && Boolean(errors.acc_num)}
                  helperText={touched.acc_num && typeof errors.acc_num === "string" ? errors.acc_num : null}
                  label="Account Number"
                >
                  {accounts.map((account) => (
                    <MenuItem key={account._id} value={account.acc_num}>
                      {account.acc_num}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box sx={{ textAlign: "right", mt: 2 }}>
                <Button
                  variant="contained"
                  type="submit"
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
              </Box>
            </Form>
          )}
        </Formik>
      </Card>

      <TableContainer component={Card}>
        <Table>
          <TableHead sx={{ backgroundColor: "black", color: "white" }}>
            <TableRow>
              <StyledCell>Description</StyledCell>
              <StyledCell>Amount</StyledCell>
              <StyledCell>Date</StyledCell>
              <StyledCell>Account Number</StyledCell>
              <StyledCell>Account Type</StyledCell>
              <StyledCell>Actions</StyledCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>********{transaction.acc_num.slice(-5)}</TableCell>
                <TableCell>{transaction.accountType}</TableCell>
                <TableCell>
                  <Grid2
                    container
                    spacing={1}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <Button
                      onClick={() => deleteButton(transaction)}
                      sx={{ backgroundColor: "error", height: 30 }}
                    >
                      <Image
                        src="/delete.png"
                        alt="Icon"
                        width={18}
                        height={18}
                        loading="lazy"
                      />
                    </Button>
                  </Grid2>
                </TableCell>
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
