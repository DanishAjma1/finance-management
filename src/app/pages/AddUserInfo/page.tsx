"use client";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import Textarea from "@mui/joy/Textarea";
import * as Yup from "yup";
import Image from "next/image";
import CssBaseline from "@mui/material/CssBaseline";

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

interface Account {
  _id: string;
  name: string;
  description: string;
  balance: 0;
}
export default function AddUserInfo() {

const [open, setOpen] = React.useState<Boolean>(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const [accounts, setAccounts] = React.useState<Account[]>([]);
const [nextId, setNextId] = React.useState(1);
const [initialValues, setInitialValues] = React.useState<Account>({
  _id: '0',
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
    borderRight:'2px solid black',
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
  };
  const deleteButton = async(e: Event, account: Account) => {
    e.preventDefault();
    try{
      const { _id } = account;
    const res  = await fetch(`/api/bankAccounts?id=${_id}`,{
      method: 'DELETE',
    });
    if(res.ok)
    {
      setAccounts(accounts.filter((acc) => acc._id !== account._id));
    }
  }catch(error){
    alert(error);
  }
  };
  React.useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch("/api/bankAccounts");
        if(response.ok)
        {
          const {bankAccount} = await response.json();
          setAccounts(bankAccount);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);
  return (
    <Box>
      <CssBaseline enableColorScheme />
      <BoxConatiner>
        <StyledBox
          sx={{
            width: { md: "95%", xs: "80%", lg: "80%" },
            flexDirection: { md: "row", xs: "column" },
            justifyContent:'center',
          }}
        >
          <StyledGrid
            sx={{
              width: '80%',
            }}
          >
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ fontFamily: "monospace" }}>
                  <TableRow sx={{ borderBottom:'2px solid black' }}>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Balance</StyledTableCell>
                    <StyledTableCell>Description</StyledTableCell>
                    <StyledTableCell>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody sx={{wordWrap:'break-word'}}>
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
        </StyledBox>
      </BoxConatiner>
    </Box>
  );
}
