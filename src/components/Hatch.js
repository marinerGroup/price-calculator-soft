import React, { useState, useEffect, useContext } from "react";
import { useAppContext } from "../providers/poolContext";

import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";

import "../App.css";

export default function Hatch() {
  const { state, dispatch, ACTIONS } = useAppContext();
  const [hatch, setHatch] = useState("");

  useEffect(() => {
    dispatch({
      type: ACTIONS.UPDATE_HATCH,
      payload: hatch,
    });
  }, [hatch]);

  return (
    <section>
      <RadioGroup name="use-radio-group" defaultValue="none">
        <FormControlLabel
          value="none"
          label="Bez šachty"
          control={
            <Radio
              onChange={(e) => {
                setHatch("none");
              }}
              inputProps={{
                "aria-label": "Bez šachty",
              }}
              value="none"
            />
          }
        />
        <FormControlLabel
          value="concrete"
          label="Betonova sachta"
          control={
            <Radio
              onChange={(e) => {
                setHatch("concrete");
              }}
              inputProps={{
                "aria-label": "Betonová šachta",
              }}
              value="concrete"
            />
          }
        />
        <FormControlLabel
          value="plastic"
          label="Plastová šachta"
          control={
            <Radio
              onChange={(e) => {
                setHatch("plastic");
              }}
              inputProps={{
                "aria-label": "Plastová šachta",
              }}
              value="plastic"
            />
          }
        />
      </RadioGroup>
    </section>
  );
}
