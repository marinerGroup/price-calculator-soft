import React, { useState, useEffect, useContext } from "react";

import format from "number-formatter";
import { useAppContext } from "../../providers/poolContext";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { data } from "../../data";
import "../../App.css";

export default function PackageReceipt() {
  const { state } = useAppContext();

  return (
    <>
      <section className="receiptSection">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="h6" component="h3">
              Bazénová technológia
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <small>
              Folia - farba podla vyberu, Skimmer, Spodní vypust, Stenove trysky
              3x, Filtracny system, Elektricka skrina vsetok Vodoinstalacny
              material
            </small>
          </AccordionDetails>
        </Accordion>

        {state.package === "basic" && (
          <>
            <div>
              <Typography variant="subtitle2" gutterBottom>
                Základný balíček materiál:{" "}
                <b>
                  <small>od </small>
                  {format(
                    "### ##0,#0",
                    state.calculatedVolume * data.package.basic.material
                  )}
                  <small> €</small>
                </b>
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2" gutterBottom>
                Základný balíček montáž{" "}
                <b>
                  <small>od </small>
                  {format(
                    "### ##0,#0",
                    Math.round(
                      state.calculatedVolume *
                        data.package.basic.material *
                        data.package.basic.services
                    )
                  )}
                  <small> €</small>
                </b>
              </Typography>
            </div>
          </>
        )}
        {state.package === "premium" && (
          <>
            <div>
              <Typography variant="subtitle2" gutterBottom>
                Premium balíček materiál:{" "}
                <b>
                  <small>od </small>
                  {format(
                    "### ##0,#0",
                    state.calculatedVolume * data.package.premium.material
                  )}
                  <small> €</small>
                </b>
              </Typography>{" "}
            </div>
            <div>
              <Typography variant="subtitle2" gutterBottom>
                Premium balíček montáž:{" "}
                <b>
                  <small>od </small>
                  {Math.round(
                    format(
                      "### ##0,#0",
                      state.calculatedVolume *
                        data.package.premium.material *
                        data.package.premium.services
                    )
                  )}
                  <small> €</small>
                </b>
              </Typography>
            </div>
          </>
        )}
      </section>
    </>
  );
}
