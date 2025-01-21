export const data = {
  minVolume: 15,
  excavation: 31.5,
  extraction: 55,
  concrete: {
    base: 115,
    walls: 330,
    // walls: 370,
  },
  hatch: {
    concrete: 0,
    plastic: -300,
    none: -1500,
  },
  package: {
    basic: {
      material: 130,
      services: 0.28,
    },
    premium: {
      material: 150,
      services: 0.28,
    },
  },
  addons: {
    salinator: {
      price: 1200,
    },
    light: {
      price: 395,
    },
    heatPump: {
      price: 1780,
    },
    stream: {
      price: 2290,
    },
    asekoCl: {
      price: 2090,
    },
    asekoSalt: { price: 2890 },
    UVLamp: {
      price: 690,
    },
  },
};

export const copy = {
  premium:
    "Bazénová Fólia ALKORPLAN TOUCH, Skimmer, Spodný výpust, Stenné trysky 3x, Filtračný systém SPECK, Elektrická skriňa a všetok Vodoinštalačný materiál",
  basic:
    "Bazénová Fólia ALKORPLAN 2000, Skimmer, Spodný výpust, Stenné trysky 3x, Filtračný systém, Elektrická skriňa a všetok Vodoinštalačný materiál",
};

export const magicNumbers = {
  VAT: 0.23,
  withVAT: 1.23,
  extraSale: 0.9,
};
