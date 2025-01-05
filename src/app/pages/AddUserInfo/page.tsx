"use client";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import Textarea from "@mui/joy/Textarea";
import * as Yup from "yup"; // Import Yup here

import {
  Box,
  Grid2,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/system";
import { Formik } from "formik";

interface Account {
  id: number;
  name: string;
  description: string;
  balance: 0;
}

export default function AddUserInfo() {
  const StyledFormContainer = styled(Box)(({}) => ({
    minWidth: 300,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    padding: "20px",
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

  const BoxConatiner = styled(Box)(({}) => ({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }));

  const TextFieldBox = styled(Grid)(({}) => ({
    flexDirection: "column",
    alignItems: "center",
  }));
  const StyledGrid = styled(Grid2)(({}) => ({
    minWidth: 280,
    maxHeight: 393,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
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
    setInitialValues(account);

    console.log("editing " + account.id + "" + nextId);
  };
  const deleteButton = (e: Event, account: Account) => {
    e.preventDefault();
    setAccounts(accounts.filter((acc) => acc.id !== account.id));
  };
  const [accounts, setAccounts] = React.useState<Account[]>([]);
  const [nextId, setNextId] = React.useState(1);
  const [initialValues, setInitialValues] = React.useState<Account>({
    id: 0,
    name: "",
    description: "",
    balance: 0,
  });
  return (
    <Box sx={{ marginTop: 5 }}>
      <BoxConatiner>
        <StyledBox
          sx={{
            width: { md: "90%", xs: "75%", lg: "80%" },
            flexDirection: { md: "row", xs: "column" },
          }}
        >
          <StyledFormContainer sx={{ width: { md: "50%", xs: "100%" } }}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                const accountIndex=accounts.findIndex((account)=>{
                  return account.id === values.id;
                })
                if (accountIndex !== -1) {
                  // Update existing account
                  const updatedAccounts = accounts.map((account) =>
                    account.id === values.id
                      ? { ...account, ...values }
                      : account
                  );
                  setAccounts(updatedAccounts);
                } else {
                  // Add new account
                  const newAccount = {
                    id: nextId,
                    name: values.name,
                    description: values.description,
                    balance: values.balance,
                  };
                  setAccounts([...accounts, newAccount]);
                  setNextId(nextId + 1); // Increment the ID for the next account
                }
                // Reset form values
                setInitialValues({
                  id: 0,
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
                      value={values.id}
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
                      error={touched.description && Boolean(errors.description)}
                      required
                    />
                  </TextFieldBox>
                  <StyledButton variant="contained" type="submit">
                    Add Account
                  </StyledButton>
                </FormContainer>
              )}
            </Formik>
          </StyledFormContainer>
          <StyledGrid
            sx={{
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              width: { md: "70%", xs: "75%", lg: "50%" },
            }}
          >
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead sx={{ fontFamily: "monospace" }}>
                  <TableRow sx={{ borderBlock: 2 }}>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Balance</StyledTableCell>
                    <StyledTableCell>Description</StyledTableCell>
                    <StyledTableCell>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {accounts.map((account, index) => (
                    <TableRow key={index}>
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
                            <img
                              src="/edit.png"
                              alt="Icon"
                              width={18}
                              height={18}
                              loading="lazy"
                            />
                          </Button>
                          <Button
                            onClick={(e) => deleteButton(e, account)}
                            sx={{ backgroundColor: "red", height: 30 }}
                          >
                            <img
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
        </StyledBox>
      </BoxConatiner>
    </Box>
  );
}
