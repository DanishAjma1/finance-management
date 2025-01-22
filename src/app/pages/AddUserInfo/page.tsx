"use client";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import Textarea from "@mui/joy/Textarea";
import * as Yup from "yup";
import Image from "next/image";
import CssBaseline from "@mui/material/CssBaseline";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid2,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { Add, Done } from "@mui/icons-material";
import { json } from "stream/consumers";
import { Account } from "@toolpad/core";
import { features } from "process";
import { toast } from "react-toastify";

interface Account {
  _id: string;
  name: string;
  description: string;
  balance: 0;
  acc_num: 0;
}
export default function AddUserInfo() {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const [open, setOpen] = React.useState<Boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
    acc_num: Yup.string()
      .matches(/^\d{16}$/, "Account number must be 16 digits")
      .required("Account number is required."),
  });
  const editButton = (account: Account) => {
    handleOpenModal();
    setInitialValues(account);
  };
  const calculatePercentageChange = (currentBalance, previousBalance) => {
    if (previousBalance === null || previousBalance === 0) {
      return 0;
    }
    return ((currentBalance - previousBalance) / previousBalance) * 100;
  };
  const deleteButton = async (e: Event, account: Account) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this account?")) {
      try {
        const { _id } = account;
        const res = await fetch(`/api/bankAccounts?id=${_id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setAccounts(accounts.filter((acc) => acc._id !== account._id));
        }
      } catch (error) {
        alert(error);
      }
    }
  };

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
    <Box>
      <CssBaseline enableColorScheme />
      <BoxConatiner>
        <StyledBox
          sx={{
            width: { xs: "95%" },
            flexDirection: { xs: "column" },
          }}
        >
          <StyledButton
            sx={{ alignSelf: "end", padding: "8px 20px" }}
            onClick={handleOpen}
            startIcon={<Add />}
          >
            Create Account
          </StyledButton>
          <Grid2 container spacing={3}>
            {accounts.map((account, index) => {
              const previousBalance =
                index > 0 ? accounts[index - 1].balance : null;
              const percentageChange = calculatePercentageChange(
                account.balance,
                previousBalance
              );

              return (
                <Grid2 size={{ xs: 12, md: 6, lg: 4 }} key={account._id}>
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
                      <Grid2
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ fontWeight: 500, fontSize: "1.1rem" }}
                        >
                          {account.name}
                        </Typography>
                        <Chip
                          onClick={async (e) => {
                            e.preventDefault();
                            const res = await fetch(
                              `/api/cards?id=${account._id}`,
                              {
                                method: "DELETE",
                              }
                            );
                            if (res.ok) {
                              toast.success("Card Deleted Successfully..");
                              const updatedAccounts = accounts.filter(
                                (acc) => acc._id !== account._id
                              );
                              setAccounts(updatedAccounts);
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
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ mr: 1, color: "#bdbdbd" }}
                        >
                          {account.acc_num}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#bdbdbd" }}>
                          {account.description}
                        </Typography>
                      </Box>
                      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
                        {"$" + account.balance.toLocaleString()}
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
                        {percentageChange.toFixed(2)}% From Previous Period ↑
                      </Typography>
                    </CardContent>
                    <Box sx={{ textAlign: "center", p: 2 }}>
                      <Button
                        onClick={() => editButton(account)}
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
                        Edit
                      </Button>
                    </Box>
                  </Card>
                </Grid2>
              );
            })}
          </Grid2>
        </StyledBox>
      </BoxConatiner>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <StyledModalBox>
            <StyledFormContainer sx={{ width: "100%" }}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values: Account) => {
                  const accountIndex = accounts.findIndex((account) => {
                    return account._id === values._id;
                  });
                  if (accountIndex !== -1) {
                    // Update existing account
                    const res = await fetch(
                      `/api/bankAccounts?id=${values._id}`,
                      {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          name: values.name,
                          description: values.description,
                          balance: values.balance,
                          acc_num: values.acc_num,
                        }),
                      }
                    );
                    if (res.ok) {
                      handleCloseModal();
                      const updatedAccounts = accounts.map((account) =>
                        account._id === values._id
                          ? { ...account, ...values }
                          : account
                      );
                      setAccounts(updatedAccounts);
                    }
                  } else {
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
                        name="name"
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
                        name="balance"
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
                        name="acc_num"
                        id="acc_num"
                        label="Account Number"
                        variant="outlined"
                        type="text"
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
                        error={
                          touched.description && Boolean(errors.description)
                        }
                        required
                      />
                    </TextFieldBox>
                    <StyledButton variant="contained" type="submit">
                      Add Account
                    </StyledButton>
                    <StyledCancelButton
                      onClick={(e) => {
                        e.preventDefault();
                        handleCloseModal();
                      }}
                    >
                      Cancel
                    </StyledCancelButton>
                  </FormContainer>
                )}
              </Formik>
            </StyledFormContainer>
          </StyledModalBox>
        </Fade>
      </Modal>
    </Box>
  );
}
