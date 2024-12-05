import React, { useState, useEffect, useContext } from "react";
import { useAppContext } from "../providers/poolContext";

import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";

import "../App.css";

export default function Package() {
  const { state, dispatch, ACTIONS } = useAppContext();
  const [packageSelection, setPackage] = useState("basic");

  useEffect(() => {
    dispatch({
      type: ACTIONS.UPDATE_PACKAGE,
      payload: packageSelection,
    });
  }, [packageSelection]);

  return (
    <section>
      <RadioGroup name="package" defaultValue="basic">
        <FormControlLabel
          value="basic"
          label="Zakladny balicek"
          control={
            <Radio
              onChange={(e) => {
                setPackage("basic");
              }}
              value="basic"
              inputProps={{
                "aria-label": "Zakladny balicek",
              }}
            />
          }
        />
        <FormControlLabel
          value="premium"
          label="Premium balicek"
          control={
            <Radio
              onChange={(e) => {
                setPackage("premium");
              }}
              inputProps={{
                "aria-label": "Premium balicek",
              }}
              value="premium"
            />
          }
        />
      </RadioGroup>
    </section>
  );
}
