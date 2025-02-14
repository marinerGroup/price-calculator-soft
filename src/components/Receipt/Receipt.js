import React, { useState, useEffect, useContext } from "react";

import { useAppContext } from "../../providers/poolContext";
import AddonsReceipt from "./AddonsReceipt";
import PackageReceipt from "./PackageReceipt";
import InstalationReceipt from "./InstalationReceipt";
import { TotalsReceipt } from "./TotalsReceipt";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";

import { data, magicNumbers } from "../../data";
import "../../App.css";

export default function Receipt() {
  const initialCosts = {
    packageCost: 0,
    packageInstalationCost: 0,

    addonsCost: 0,
    addonsInstalationCost: 0,

    excavationCost: 0,
    extractionCost: 0,

    concreteWalls: 0,
    concreteBase: 0,

    hatchCost: 0,
  };

  const [receiptTotals, setReceiptTotals] = useState(initialCosts);
  const { state, dispatch, ACTIONS } = useAppContext();

  const calucalteAddonTotals = () => {
    const minVolume = data.minVolume;
    if (state.calculatedVolume > minVolume) {
      let runningTotal = 0;
      for (const addon in state.addons) {
        const isAddonSelected = state.addons[addon];
        if (isAddonSelected === true) {
          runningTotal += data.addons[addon].price;
        }
      }

      let addonInstalation = runningTotal * 0.15;

      setReceiptTotals((prevTotals) => ({
        ...prevTotals,
        addonsCost: runningTotal,
      }));

      setReceiptTotals((prevTotals) => ({
        ...prevTotals,
        addonsInstalationCost: addonInstalation,
      }));
    } else {
      setReceiptTotals((prevTotals) => ({
        ...initialCosts,
      }));
    }
  };

  const calculatePackageTotals = () => {
    const minVolume = data.minVolume;
    if (state.calculatedVolume > minVolume) {
      if (state.package === "basic") {
        setReceiptTotals((prevTotals) => ({
          ...prevTotals,
          packageCost: state.calculatedVolume * data.package.basic.material,
        }));
        setReceiptTotals((prevTotals) => ({
          ...prevTotals,
          packageInstalationCost: Math.round(
            prevTotals.packageCost * data.package.basic.services
          ),
        }));
      } else {
        setReceiptTotals((prevTotals) => ({
          ...prevTotals,
          packageCost: state.calculatedVolume * data.package.premium.material,
        }));
        setReceiptTotals((prevTotals) => ({
          ...prevTotals,
          packageInstalationCost:
            prevTotals.packageCost * data.package.premium.services,
        }));
      }
      calculateInstalationTotals();
    } else {
      setReceiptTotals((prevTotals) => ({
        ...initialCosts,
      }));
    }
  };
  const calculateInstalationTotals = () => {
    const minVolume = data.minVolume;
    const hatchPrice =
      state.hatch === "concrete"
        ? data.hatch.concrete
        : state.hatch === "plastic"
        ? data.hatch.plastic
        : data.hatch.none;

    if (state.calculatedVolume > minVolume) {
      setReceiptTotals((prevTotals) => ({
        ...prevTotals,
        excavationCost: state.calculatedVolume * data.excavation,
      }));
      setReceiptTotals((prevTotals) => ({
        ...prevTotals,
        extractionCost: state.calculatedVolume * data.extraction,
      }));
      setReceiptTotals((prevTotals) => ({
        ...prevTotals,
        concreteBase: state.actualVolume * data.concrete.base,
      }));
      setReceiptTotals((prevTotals) => ({
        ...prevTotals,
        concreteWalls: state.circumferenceMeters * data.concrete.walls,
      }));
      setReceiptTotals((prevTotals) => ({
        ...prevTotals,
        hatchCost: hatchPrice,
      }));
    }
  };

  const calculateTotals = () => {
    let runningTotal = 0;
    for (const it in receiptTotals) {
      runningTotal += receiptTotals[it];
    }

    let runningTotalWithSale = runningTotal * magicNumbers.extraSale;

    let temObj = {
      poolTotal: runningTotalWithSale,
      poolTotalVat: runningTotalWithSale * magicNumbers.VAT,
      poolTotalIncludingVAT: runningTotalWithSale * magicNumbers.withVAT,
    };
    runningTotal = 0;
    return temObj;
  };

  useEffect(() => {
    calculatePackageTotals();
    calucalteAddonTotals();
    calculateInstalationTotals(); // including hatch
  }, [state]);

  return (
    <aside>
      <Card sx={{ minWidth: 350, maxWidth: 400 }}>
        <CardContent>
          <Box sx={{ maxWidth: 400 }}>
            <a
              href="https://www.marinergroup.sk/"
              alt="Back to mariner group homepage"
            >
              <img src="./logo.png" width="200px" alt="Mariner Group logo" />
            </a>
            <section className="receiptSection">
              <small>Cenová kalkulácia pre bazén s rozmermi:</small>
              <br />
              <small>
                Dĺžka: <b>{state.dimmensions.length}m</b> Šírka:{" "}
                <b>{state.dimmensions.width}m</b> Hĺbka:{" "}
                <b>{state.dimmensions.depth}m</b>
              </small>
            </section>
            <PackageReceipt />
            <InstalationReceipt />
            <AddonsReceipt />
            <Divider />
            <TotalsReceipt
              poolTotal={calculateTotals().poolTotal || ""}
              poolTotalIncludingVAT={
                calculateTotals().poolTotalIncludingVAT || ""
              }
            />{" "}
            <small className="mt12">
              Uvedená cena je čo najpresnejšia ako sa dá vypočítať z
              limitovaných informácií ktoré ste nám zadali. Pre záväznú
              kalkuláciu nás kontaktujte na:{" "}
              <a
                className="themeBlue"
                href="mailto:info.marinergroup@gmail.com"
              >
                info.marinergroup@gmail.com
              </a>{" "}
              alebo{" "}
              <a className="themeBlue" href="tel:+421905812811">
                0905&nbsp;812&nbsp;811
              </a>
            </small>
          </Box>
        </CardContent>
      </Card>
    </aside>
  );
}
