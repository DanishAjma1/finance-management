"use client";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";

export default function Form() {
  const [userAccount, setUserAccount] = React.useState({
    name: "",
    decription: "",
    balance: 0,
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="w-full flex justify-center mb-10 mt-10">
        <div className="w-[75%] flex items-start gap-5">
          <form
            className="w-[75%] sm:w-[70%] md:w-[55%] flex flex-col items-center shadow-xl rounded-xl py-10"
            onSubmit={handleSubmit}
          >
            <label className="text-2xl lg:text-3xl font-bold">
              Add User Account
            </label>
            <div className="w-[85%] md:w-[80%] flex flex-col gap-5 my-8">
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={userAccount.name}
                onChange={(e) =>
                  setUserAccount({ ...userAccount, name: e.target.value })
                }
                required
              />
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                className="mt-3"
                value={userAccount.decription}
                onChange={(e) =>
                  setUserAccount({ ...userAccount, decription: e.target.value })
                }
                required
              />
              <TextField
                id="outlined-basic"
                label="Amount.."
                variant="outlined"
                className="mt-3"
                value={userAccount.balance}
                onChange={(e) =>
                  setUserAccount({
                    ...userAccount,
                    balance: Number(e.target.value),
                  })
                }
                required
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "black",
                }}
                className="py-2 text-white hover:bg-white hover:text-black"
              >
                Add Account
              </Button>
            </div>
          </form>
          <div className="shadow-lg ">
            <TableContainer>
              <Table
                sx={{ minWidth: 350, border: "black" }}
                aria-label="simple table"
              >
                <TableHead sx={{ fontFamily: "monospace" }}>
                  <TableRow sx={{ borderBlock: 2 }}>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                      Name
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: "15px" }}
                    >
                      Description
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: "15px" }}
                    >
                      Balance
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: "15px" }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell>hello</TableCell>
                    <TableCell>hello</TableCell>
                    <TableCell>hello</TableCell>
                    <TableCell>
                      <Link href="/pages/drawerList">
                        <img
                          src="/edit.png"
                          alt="Icon"
                          width={25}
                          height={25}
                          loading="lazy"
                        />
                      </Link>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
