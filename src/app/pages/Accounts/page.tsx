"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Card,
  CardContent,
  Grid2,
  styled,
  TableCell,
} from "@mui/material";

import Textarea from "@mui/joy/Textarea";
import * as Yup from "yup";
import { Add, FilterList } from "@mui/icons-material";
import { Formik } from "formik";

const BalancePage = () => {
  const [balances, setBalances] = useState([]);
  const [open, setOpen] = useState(false);
  const [newBalance, setNewBalance] = useState({
    title: "",
    currency: "",
    symbol: "",
    amount: "",
    flag: "",
  });

  // Load balances from localStorage when component mounts
  useEffect(() => {
    const savedBalances = JSON.parse(localStorage.getItem("balances")) || [];
    setBalances(savedBalances);
  }, []);

  interface Account {
    _id: string;
    name: string;
    description: string;
    acc_num: 0;
    balance: 0;
  }
  const [accounts, setAccounts] = React.useState<Account[]>([]);
  const [nextId, setNextId] = React.useState("1");
  const [initialValues, setInitialValues] = React.useState<Account>({
    _id: "0",
    name: "",
    description: "",
    acc_num: 0,
    balance: 0,
  });
  const StyledFormContainer = styled(Box)(({}) => ({
    minWidth: 300,
    maxWidth: 500,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    padding: 30,
  }));

  const FormContainer = styled(Box)(({}) => ({
    marginTop: 0,
    backgroundColor: "",
    width: "85%",
    textAlign: "center",
    justifyContent: "center",
  }));
  const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    margin: 20,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
  }));

  const StyledCancelButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    margin: 20,
    "&:hover": {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  }));
  const BoxConatiner = styled(Box)(({}) => ({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  }));

  const TextFieldBox = styled(Grid2)(({}) => ({
    flexDirection: "column",
    alignItems: "center",
  }));
  const StyledGrid = styled(Grid2)(({}) => ({
    minWidth: 280,
    maxHeight: "50vh",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: 5,
    overflowY: "scroll",
  }));

  const StyledBox = styled(Box)(({ theme }) => ({
    gap: theme.spacing(2),
    display: "flex",
    // alignItems: "center",
  }));
  const StyledTableCell = styled(TableCell)(({}) => ({
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: "17px",
    borderRight: "2px solid black",
  }));

  const StyledModalBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[24],
    borderRadius: 20,
    padding: theme.spacing(4),
  }));

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    balance: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive"),
    acc_num: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive"),
  });
  const fetchAccounts = async () => {
    try {
      const response = await fetch("/api/bankAccounts", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const { bankAccount } = await response.json();
        setAccounts(bankAccount);
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };
  React.useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <Box
      sx={{ p: 4, backgroundColor: "white", color: "#fff", minHeight: "100vh" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#fff" }}>
          Balance
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              mr: 2,
              backgroundColor: "#333",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#444",
                transform: "scale(1.05)",
                boxShadow: 3,
              },
              textTransform: "none",
              borderRadius: 2,
              padding: "8px 20px",
              boxShadow: 3,
            }}
            onClick={() => setOpen(true)}
          >
            Add Balance
          </Button>
        </Box>
      </Box>

      <Grid2 container spacing={3}>
        {accounts.map((account) => (
          <Grid2 size={{ xs: 12, md: 6, lg:4 }} key={account._id}>
            <Card
              sx={{
                background: "linear-gradient(135deg, #2e2e2e, #1c1c1c)",
                color: "#fff",
                boxShadow: 5,
                borderRadius: 4,
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)", boxShadow: 10 },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 500, fontSize: "1.1rem" }}
                >
                  {account.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography variant="body2" sx={{ mr: 1, color: "#bdbdbd" }}>
                    {account.description}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#bdbdbd" }}>
                    {account.acc_num}
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
                  {/* {balance.symbol} */}
                  {account.balance.toLocaleString()}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    display: "inline-block",
                    backgroundColor: "#3f51b5",
                    color: "#fff",
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontWeight: 600,
                  }}
                >
                  {account.change} From Previous Period ↑
                </Typography>
              </CardContent>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Button
                  variant="outlined"
                  sx={{
                    color: "#fff",
                    borderColor: "#fff",
                    textTransform: "none",
                    borderRadius: 20,
                    padding: "6px 20px",
                    "&:hover": { backgroundColor: "#333" },
                  }}
                >
                  Open
                </Button>
              </Box>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {/* Add Balance Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ fontWeight: 600, color: "#333" }}>
          Add New Balance
        </DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <StyledFormContainer>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values: Account) => {
                const accountIndex = accounts.findIndex((account) => {
                  return account.acc_num === values.acc_num;
                });
                if (accountIndex !== -1) alert("Account already exist");
                else {
                  const newAccount = {
                    _id: values._id,
                    name: values.name,
                    description: values.description,
                    acc_num: values.acc_num,
                    balance: values.balance,
                  };
                  const response = await fetch("/api/bankAccounts", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newAccount),
                  });
                  if (response.ok) {
                    setAccounts([]);
                    fetchAccounts();
                  }
                }
                setInitialValues({
                  _id: "0",
                  name: "",
                  description: "",
                  acc_num: 0,
                  balance: 0,
                });
              }}
            >
              {({ values, handleChange, handleSubmit, errors, touched }) => (
                <FormContainer component="form" onSubmit={handleSubmit}>
                  <Typography
                    variant="h5"
                    sx={{ marginBottom: "30px", fontWeight: "bold" }}
                  >
                    Account Details
                  </Typography>
                  <TextFieldBox container spacing={3}>
                    <TextField
                      id="id"
                      name="id"
                      value={values._id}
                      sx={{ display: "none" }}
                    />
                    <TextField
                      id="name"
                      label="Name"
                      variant="outlined"
                      value={values.name}
                      autoFocus
                      onChange={handleChange}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      fullWidth
                      required
                    />
                    <TextField
                      id="balance"
                      label="Amount"
                      variant="outlined"
                      type="number"
                      value={values.balance}
                      onChange={handleChange}
                      error={touched.balance && Boolean(errors.balance)}
                      helperText={touched.balance && errors.balance}
                      fullWidth
                      required
                    />
                    <TextField
                      id="acc_num"
                      label="Account Number"
                      variant="outlined"
                      type="number"
                      value={values.acc_num}
                      onChange={handleChange}
                      error={touched.acc_num && Boolean(errors.acc_num)}
                      helperText={touched.acc_num && errors.acc_num}
                      fullWidth
                      required
                    />
                    <Textarea
                      size="lg"
                      name="description"
                      placeholder="Description…"
                      minRows={2}
                      variant="outlined"
                      value={values.description}
                      onChange={handleChange}
                      sx={{ width: "100%", backgroundColor: "transparent" }}
                      error={touched.description && Boolean(errors.description)}
                      required
                    />
                  </TextFieldBox>
                  <StyledButton variant="contained" type="submit">
                    Add Account
                  </StyledButton>
                  <StyledCancelButton
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    Cancel
                  </StyledCancelButton>
                </FormContainer>
              )}
            </Formik>
          </StyledFormContainer>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default BalancePage;
