import React, { useState, useEffect, useContext } from "react";
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
              Bazenova technologia:
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
                Zakladny Balicek material:{" "}
                <b>
                  <small>od </small>
                  {state.calculatedVolume * data.package.basic.material}
                  <small> €</small>
                </b>
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2" gutterBottom>
                Zakladny Balicek montaz:{" "}
                <b>
                  <small>od </small>
                  {Math.round(
                    state.calculatedVolume *
                      data.package.basic.material *
                      data.package.basic.services
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
                Premium Balicek material:{" "}
                <b>
                  <small>od </small>
                  {state.calculatedVolume * data.package.premium.material}
                  <small> €</small>
                </b>
              </Typography>{" "}
            </div>
            <div>
              <Typography variant="subtitle2" gutterBottom>
                Premium Balicek montaz:{" "}
                <b>
                  <small>od </small>
                  {Math.round(
                    state.calculatedVolume *
                      data.package.premium.material *
                      data.package.premium.services
                  )}
                  <small> €</small>
                </b>
              </Typography>{" "}
            </div>
          </>
        )}
      </section>
    </>
  );
}
