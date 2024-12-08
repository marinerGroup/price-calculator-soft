import React, { useState, useEffect } from "react";
import { useAppContext } from "../providers/poolContext";
import emailjs from "emailjs-com";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import Dimmension from "../components/Dimmensions";
import Hatch from "../components/Hatch";
import Addons from "../components/Addons";
import Package from "../components/Package";
import Receipt from "../components/Receipt/Receipt";
import HiddenFormFields from "../components/HiddenFormFields";
import "../App.css";

function App() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [buttonError, setButtonError] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState(true);
  const { state, dispatch, ACTIONS } = useAppContext();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError(!validateEmail(event.target.value));
    setButtonError(!validateEmail(event.target.value));
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
    setNameError(e.target.value === "" ? true : false);
    // setButtonError(e.target.value === "" ? true : false);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const steps = [
    {
      label: (
        <Typography key="1" variant="h6" component="h3" gutterBottom>
          Zadajte rozmery bazéna a typ šachty
        </Typography>
      ),
      description: [<Dimmension />, <Hatch />],
    },
    {
      label: (
        <Typography key="2" variant="h6" component="h3" gutterBottom>
          Vyberte si balíček bazénových technológií
        </Typography>
      ),
      description: <Package />,
    },
    {
      label: (
        <Typography key="3" variant="h6" component="h3" gutterBottom>
          Pridajte požadované príslušenstvo
        </Typography>
      ),
      description: <Addons />,
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setFormState(true);
    setActiveStep(0);
  };
  const submitForm = (e) => {
    e.preventDefault();
    if (error || nameError) {
      return false;
    } else {
      console.log("form submitting", e.target);
      setLoading(true);
      emailjs
        .sendForm(
          "service_lq5jsyx",
          "template_xw0hpf7",
          e.target,
          "zhuZ9I_93pR6xUAJR"
        )
        .then(
          (result) => {
            setLoading(false);
            setFormState(false);
            console.log(result);
            // window.location.reload(); //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior)
          },
          (error) => {
            setLoading(false);
            console.log(error.text);
          }
        );
    }
  };

  useEffect(() => {
    return () => {};
  });

  return (
    <div className="App">
      <header className="App-header">{/* <h1>Cenova Ponuka</h1> */}</header>
      <main>
        <Card sx={{ minWidth: 350, maxWidth: 400 }}>
          <CardContent>
            <Box sx={{ maxWidth: 400 }}>
              <a href="https://www.marinergroup.sk/" alt="Mariner Group logo">
                <img src="./logo.png" width="200px" />
              </a>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step>
                    <StepLabel
                      key={index}
                      optional={
                        index === steps.length - 1 ? (
                          <Typography variant="caption">
                            Posledný krok
                          </Typography>
                        ) : null
                      }
                    >
                      {step.label}
                    </StepLabel>
                    <StepContent key={99 - index}>
                      {step.description}
                      <Box sx={{ mb: 2 }}>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1
                            ? "Prepočítať"
                            : "Pokračovať"}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Späť
                        </Button>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length && (
                <div>
                  <form className="submitForm" onSubmit={submitForm}>
                    {formState && (
                      <>
                        <Typography gutterBottom>
                          Zadajte váš email alebo telefónne číslo a my sa vám
                          radi ozveme
                        </Typography>
                        <HiddenFormFields />
                        <div>
                          <TextField
                            sx={{ maxWidth: 150 }}
                            label="Meno"
                            variant="outlined"
                            name="userName"
                            onChange={handleNameChange}
                            error={nameError}
                            value={userName}
                            helperText={nameError ? "Povinne pole" : ""}
                          />
                          <TextField
                            sx={{ maxWidth: 150 }}
                            label="Email"
                            variant="outlined"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            error={error}
                            helperText={
                              error ? "Zadajte email v sparavnom formate" : ""
                            }
                          />
                          <TextField
                            sx={{ maxWidth: 150 }}
                            label="Telefon"
                            name="phone"
                            variant="outlined"
                            value={phone}
                            onChange={handlePhoneChange}
                          />
                        </div>
                      </>
                    )}
                    <div className="buttonHolder">
                      {formState && (
                        <>
                          <Typography gutterBottom>
                            Alebo neváhajte a zavolajte nám priamo na{"  "}
                            <b>
                              <a href="tel:+421905812811">
                                0905&nbsp;812&nbsp;811
                              </a>
                            </b>
                          </Typography>
                          <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 1, mr: 1 }}
                            disabled={buttonError}
                          >
                            Poslať
                          </Button>
                        </>
                      )}
                      <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Začať znova
                      </Button>
                    </div>
                  </form>
                  {!formState && (
                    <Typography gutterBottom>
                      Ďakujeme za váš dopyt, ozveme sa vám pre viac detailov
                    </Typography>
                  )}
                </div>
              )}
            </Box>
          </CardContent>
        </Card>

        <Receipt />
      </main>
    </div>
  );
}

export default App;
