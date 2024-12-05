import React, { useState, useEffect, useContext } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useAppContext } from "../providers/poolContext";
import "../App.css";

export default function Addons() {
  const { state, dispatch, ACTIONS } = useAppContext();
  const [addons, setAddons] = useState({
    salinator: false,
    light: false,
    heatPump: false,
    stream: false,
    asekoCl: false,
    asekoSalt: false,
    UVLamp: false,
  });

  useEffect(() => {
    dispatch({
      type: ACTIONS.UPDATE_ADDONS,
      payload: addons,
    });
  }, [addons]);

  return (
    <section>
      <FormGroup>
        {Object.keys(addons).map((feature, index) => (
          <FormControlLabel
            key={index}
            label={feature}
            control={
              <Checkbox
                id={feature}
                checked={addons[feature]}
                onChange={(e) => {
                  setAddons({
                    ...addons,
                    [feature]: e.target.checked,
                  });
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
          />
        ))}
      </FormGroup>
    </section>
  );
}
