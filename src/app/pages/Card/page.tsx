"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid2,
  LinearProgress,
  Chip,
  FormControl,
  styled,
  Icon,
  MenuItem,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { toast } from "react-toastify";
export default function CardManagement() {
  const CardSchema = Yup.object().shape({
    name: Yup.string().required("Cardholder name is required"),
    number: Yup.string()
      .matches(/^\d{16}$/, "Card number must be 16 digits")
      .required("Card number is required"),
    expiry: Yup.string()
      .matches(
        /^(0[1-9]|1[0-2])\/\d{2}$/,
        "Expiry date must be in MM/YY format"
      )
      .required("Expiry date is required"),
    cvv: Yup.string()
      .matches(/^\d{3}$/, "CVV must be 3 digits")
      .required("CVV is required"),
    pin: Yup.string()
      .matches(/^\d{4}$/, "PIN must be 4 digits")
      .required("PIN is required"),
    limit: Yup.number()
      .min(0, "Spending limit cannot be negative")
      .required("Spending limit is required"),
  });
  const [cards, setCards] = useState([]);
  const [open, setOpen] = useState(false);
  const [accounts, setAccounts] = React.useState([]);

  const fetchCards = async () => {
    try {
      const res = await fetch("/api/cards", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const { cards } = await res.json();
        setCards(cards);
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };
  const fetchAccounts = async () => {
    try {
      const res = await fetch("/api/bankAccounts", {
        method: "GET",
      });
      if (res.ok) {
        const { bankAccount } = await res.json();
        setAccounts(bankAccount);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetchCards();
    fetchAccounts();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddCard = async (values, { resetForm }) => {
    const newCard = {
      name: values.name,
      number: values.number,
      expiry: values.expiry,
      cvv: values.cvv,
      pin: values.pin,
      limit: values.limit || 0,
      state: "Active",
      showDetails: false,
      showPin: false,
    };
    const res = await fetch("/api/cards", {
      method: "POST",
      body: JSON.stringify(newCard),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      toast.success("Card Added Successfully..");
      const updatedCards = [...cards, newCard];
      setCards(updatedCards);
      resetForm();
      handleClose();
    } else {
      console.log("Something went wrong.");
    }
  };

  const toggleDetails = (index) => {
    setCards(
      cards.map((card, i) =>
        i === index ? { ...card, showDetails: !card.showDetails } : card
      )
    );
  };

  const toggleShowPin = (index) => {
    setCards(
      cards.map((card, i) =>
        i === index ? { ...card, showPin: !card.showPin } : card
      )
    );
  };

  const toggleFreeze = (index) => {
    setCards(
      cards.map((card, i) =>
        i === index
          ? {
              ...card,
              state: card.state === "Active" ? "Inactive" : "Active",
              showDetails: false,
              showPin: false,
            }
          : card
      )
    );
  };

  const StyledFormControl = styled(FormControl)(({ theme }) => ({
    width: "100%",
    marginBottom: theme.spacing(2),
    "& .MuiInputBase-root": {
      borderRadius: theme.shape.borderRadius,
    },
    "& .MuiInputLabel-root": {
      color: "black",
    },
    "& .MuiInputBase-input": {
      color: "black",
    },
  }));

  const StyledDialogContent = styled(DialogContent)({
    display: "flex",
    flexDirection: "column",
  });

  const StyledForm = styled(Form)({
    width: 500,
  });
  return (
    <Box
      sx={{
        p: 4,
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Cards
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            backgroundColor: "#333",
            textTransform: "none",
            borderRadius: 2,
            padding: "8px 20px",
            boxShadow: 3,
            "&:hover": {
              backgroundColor: "#444",
              transform: "scale(1.05)",
              boxShadow: 5,
            },
          }}
          onClick={handleOpen}
        >
          Add Card
        </Button>
      </Box>

      <Grid2 container spacing={3}>
        {cards.map((card, index) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card
              sx={{
                background:
                  card.state === "Active"
                    ? "linear-gradient(135deg, #333, #666)"
                    : "linear-gradient(135deg, #4A90E2, #9013FE)",
                color: "white",
                borderRadius: 4,
                boxShadow: 5,
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 10,
                },
              }}
            >
              <CardContent>
                <Grid2
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Debit
                  </Typography>
                  <Chip
                    onClick={async (e) => {
                      e.preventDefault();
                      const res = await fetch(`/api/cards?id=${card._id}`, {
                        method: "DELETE",
                      });
                      if (res.ok) {
                        toast.done("Card Deleted Successfully..");
                        const updatedCards = cards.filter(
                          (c) => c._id !== card._id
                        );
                        setCards(updatedCards);
                      }
                    }}
                    label={
                      <Image
                        src={"/delete.png"}
                        alt="Icon"
                        width={10}
                        height={10}
                      />
                    }
                    color="error"
                    sx={{ alignSelf: "center" }}
                  />
                </Grid2>

                <Chip
                  label={card.state}
                  color={card.state === "Active" ? "success" : "error"}
                  sx={{ mt: 1 }}
                />
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1">{card.name}</Typography>
                  <Typography variant="body2">
                    {card.showDetails || card.state === "Inactive"
                      ? card.number
                      : "**** **** **** ***"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mt: 4,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2">VISA</Typography>
                  <Typography variant="body2">{card.expiry}</Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    CVV:{" "}
                    {card.showDetails || card.state === "Inactive"
                      ? card.cvv
                      : "***"}
                  </Typography>
                  <Typography variant="body2">
                    Spending Limit: ${card.limit.toFixed(2)}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(card.limit / 10000) * 100}
                    sx={{
                      mt: 1,
                      height: 8,
                      borderRadius: 5,
                      "& .MuiLinearProgress-bar": {
                        backgroundColor:
                          card.limit > 7000 ? "red" : "lightgreen",
                      },
                    }}
                  />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    PIN: {card.showPin ? card.pin : "****"}
                  </Typography>
                </Box>
                <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    color="info"
                    size="small"
                    disabled={card.state === "Inactive"}
                    onClick={() => toggleDetails(index)}
                  >
                    {card.showDetails ? "Hide Details" : "Details"}
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    disabled={card.state === "Inactive"}
                    onClick={() => toggleShowPin(index)}
                  >
                    {card.showPin ? "Hide PIN" : "Show PIN"}
                  </Button>
                  <Button
                    variant="contained"
                    color={card.state === "Active" ? "warning" : "success"}
                    size="small"
                    onClick={() => toggleFreeze(index)}
                  >
                    {card.state === "Active" ? "Freeze" : "Unfreeze"}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <Dialog open={open} onClose={handleClose} sx={{ width: "100%" }}>
        <DialogTitle sx={{ fontWeight: 600, color: "#333" }}>
          Add New Card
        </DialogTitle>
        <Formik
          initialValues={{
            name: "",
            number: "",
            expiry: "",
            cvv: "",
            pin: "",
            limit: 0,
          }}
          validationSchema={CardSchema}
          onSubmit={handleAddCard}
        >
          {({ errors, touched, values, handleBlur, handleChange }) => (
            <StyledForm>
              <StyledDialogContent>
                <StyledFormControl fullWidth>
                  <TextField
                    label="Cardholder Name"
                    name="name"
                    value={values.name}
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </StyledFormControl>
                <StyledFormControl fullWidth>
                  <TextField
                    select
                    name="acc_num"
                    value={values.number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    fullWidth
                    variant="outlined"
                    error={touched.number && Boolean(errors.number)}
                    helperText={touched.number && errors.number}
                    label="Account Number"
                  >
                    {accounts.map((account) => (
                      <MenuItem key={account._id} value={account.acc_num}>
                        {account.acc_num}
                      </MenuItem>
                    ))}
                  </TextField>
                </StyledFormControl>
                <StyledFormControl fullWidth>
                  <TextField
                    label="Expiry Date (MM/YY)"
                    name="expiry"
                    autoComplete="off"
                    value={values.expiry}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.expiry && Boolean(errors.expiry)}
                    helperText={touched.expiry && errors.expiry}
                  />
                </StyledFormControl>
                <StyledFormControl fullWidth>
                  <TextField
                    label="CVV"
                    name="cvv"
                    autoComplete="off"
                    value={values.cvv}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.cvv && Boolean(errors.cvv)}
                    helperText={touched.cvv && errors.cvv}
                  />
                </StyledFormControl>
                <StyledFormControl fullWidth>
                  <TextField
                    label="***"
                    name="pin"
                    type="password"
                    value={values.pin}
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.pin && Boolean(errors.pin)}
                    helperText={touched.pin && errors.pin}
                  />
                </StyledFormControl>
                <StyledFormControl fullWidth>
                  <TextField
                    label="Spending Limit"
                    name="limit"
                    type="number"
                    autoComplete="off"
                    value={values.limit}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.limit && Boolean(errors.limit)}
                    helperText={touched.limit && errors.limit}
                  />
                </StyledFormControl>
              </StyledDialogContent>

              <DialogActions>
                <Button
                  onClick={handleClose}
                  color="secondary"
                  sx={{ textTransform: "none" }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ textTransform: "none" }}
                >
                  Add Card
                </Button>
              </DialogActions>
            </StyledForm>
          )}
        </Formik>
      </Dialog>
    </Box>
  );
}
