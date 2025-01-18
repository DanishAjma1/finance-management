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
import { Done } from "@mui/icons-material";
import { json } from "stream/consumers";
import { Account } from "@toolpad/core";
import { features } from "process";

interface Account {
  _id: string;
  name: string;
  description: string;
  balance: 0;
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
    alignItems: "center",
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
  });
  const editButton = (e: Event, account: Account) => {
    e.preventDefault();
    handleOpenModal();
    setInitialValues(account);
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
      const response = await fetch("/api/bankAccounts");
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
            width: { md: "95%", xs: "80%", lg: "80%" },
            flexDirection: { md: "", xs: "column" },
            justifyContent: "center",
          }}
        >
          <Grid2 sx={{ width: "80%" }}>
            <StyledButton sx={{ alignSelf: "start" }} onClick={handleOpen}>
              Create Account
            </StyledButton>
            <StyledGrid>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ fontFamily: "monospace" }}>
                    <TableRow sx={{ borderBottom: "2px solid black" }}>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Balance</StyledTableCell>
                      <StyledTableCell>Description</StyledTableCell>
                      <StyledTableCell>Actions</StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody sx={{ wordWrap: "break-word" }}>
                    {accounts.map((account) => (
                      <TableRow key={account._id}>
                        <TableCell>{account.name}</TableCell>
                        <TableCell>{account.balance}</TableCell>
                        <TableCell>{account.description}</TableCell>
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
                              onClick={(e) => editButton(e, account)}
                              sx={{ backgroundColor: "green", height: 30 }}
                            >
                              <Image
                                src={"/edit.png"}
                                height={18}
                                width={18}
                                alt="Icon"
                                loading="lazy"
                              />
                            </Button>
                            <Button
                              onClick={(e) => deleteButton(e, account)}
                              sx={{ backgroundColor: "red", height: 30 }}
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
              </TableContainer>
            </StyledGrid>
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
                    // Add new account
                    const newAccount = {
                      _id: values._id,
                      name: values.name,
                      description: values.description,
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
                  // Reset form values
                  setInitialValues({
                    _id: "0",
                    name: "",
                    description: "",
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
