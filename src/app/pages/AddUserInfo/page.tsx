"use client";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import Button from "@mui/material/Button";
import React from "react";

export default function Form() {
  const [userAccount, setUserAccount] = useState({
    Name: "",
    Email: "",
    Password: "",
    AccountNum: "",
    CardType: "",
  });
  const [emailError, setEmailError] = React.useState<string>("");
  const [isEmailValid, setIsEmailValid] = React.useState<boolean>(false);

  const emailValidation = (em:string) => {
    setUserAccount({ ...userAccount, Email: em });
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(em)) {
      setEmailError("Email is valid");
      setIsEmailValid(true);
    } else {
      setEmailError("Email is Invalid");
      setIsEmailValid(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailError === "Email is valid") {
      if (
        userAccount.Name &&
        userAccount.Password &&
        userAccount.AccountNum &&
        userAccount.CardType
      ) {
        alert("Account added!!");
      } else {
        alert("Information is not completed!!");
      }
    }
  };

  return (
    <div>
      <div className="w-full flex justify-center mb-10 mt-5">
        <form
          className="w-[90%] md:w-[55%] flex flex-col items-center shadow-xl rounded-xl py-10"
          onSubmit={handleSubmit}
        >
          <label className="text-2xl lg:text-4xl font-bold">
            Add User Info
          </label>
          <div className="w-[60%] md:w-[80%] flex flex-col gap-3 my-10">
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={userAccount.Name}
              onChange={(e) =>
                setUserAccount({ ...userAccount, Name: e.target.value })
              }
              required
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              className="mt-3"
              value={userAccount.Email}
              onChange={(e) => emailValidation(e.target.value)}
              required
            />
            <p
              className={`text-md tracking-wider font-serif ${isEmailValid === true ? "text-green-500" : isEmailValid === false ? "text-red-500" : ""}`}
            >
              {emailError}
            </p>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              className="mt-3"
              value={userAccount.Password}
              onChange={(e) =>
                setUserAccount({ ...userAccount, Password: e.target.value })
              }
              required
            />
            <TextField
              id="outlined-basic"
              label="Account Number"
              variant="outlined"
              className="mt-3"
              value={userAccount.AccountNum}
              onChange={(e) =>
                setUserAccount({ ...userAccount, AccountNum: e.target.value })
              }
              required
            />
            <div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Card Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userAccount.CardType}
                  label="Card Type"
                  onChange={(e) =>
                    setUserAccount({ ...userAccount, CardType: e.target.value })
                  }
                  required
                >
                  <MenuItem value="HBL">HBL</MenuItem>
                  <MenuItem value="UBL">UBL</MenuItem>
                  <MenuItem value="Meezan">Meezan</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="flex justify-end mt-5">
              <Button
                type="submit"
                variant="outlined"
                className="py-2 border-black text-white bg-black tracking-wider hover:bg-white hover:text-black"
              >
                Add Account
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}