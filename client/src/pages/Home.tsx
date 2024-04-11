import { Box, Button, Typography } from "@mui/material";
import { MouseEvent, useState } from "react";
import axios, { AxiosResponse } from "axios";

import CurrencySelectInput from "../components/CurrencySelectInput";
import { currencies, Currency } from "../util/currency-data";
import CurrencyInput from "../components/CurrencyInput";
import { RecentConversion } from "./Conversions";

export interface CurrencyOptions {
  from: Currency["code"];
  to: Currency["code"];
  amount: number;
}

const Home = () => {
  const [currencyOptions, setCurrencyOptions] = useState<CurrencyOptions>({
    from: "GBP",
    to: "USD",
    amount: 0,
  });
  const [result, setResult] = useState<number>();

  const { from, to, amount } = currencyOptions;

  const fromCurrency = currencies.find(
    (currency) => currency.code === currencyOptions.from
  );

  const toCurrency = currencies.find(
    (currency) => currency.code === currencyOptions.to
  );

  const handleOnClick = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    try {
      const response: AxiosResponse<{ data: { result: number } }> =
        await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/currency/conversion?from=${from}&to=${to}&amount=${amount}`
        );
      if (response.status === 200) {
        setResult(response.data.data.result);
        const stringifiedConversions = localStorage.getItem("conversions");
        const newConversion = {
          from,
          to,
          amount,
          result: response.data.data.result,
          fromCurrencyName: fromCurrency?.name,
          fromCurrencySymbol: fromCurrency?.symbol_native,
          toCurrencyName: toCurrency?.name,
          toCurrencySymbol: toCurrency?.symbol_native,
        };
        if (stringifiedConversions) {
          const conversionsCopy: RecentConversion[] = [
            ...JSON.parse(stringifiedConversions),
          ];
          conversionsCopy.push(newConversion);
          localStorage.setItem("conversions", JSON.stringify(conversionsCopy));
        } else {
          const conversions = [];
          conversions.push(newConversion);
          localStorage.setItem("conversions", JSON.stringify(conversions));
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "35ch" },
        }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        margin="3em 0"
        gap="1rem"
        noValidate
        autoComplete="off"
      >
        <CurrencyInput
          value={currencyOptions.amount}
          currencySymbol={fromCurrency?.symbol_native ?? "£"}
          onChange={(e) => {
            setCurrencyOptions({
              ...currencyOptions,
              amount: Number(e.target.value),
            });
            setResult(undefined);
          }}
        />
        <CurrencySelectInput
          id="outlined-select-from-currency"
          label="From"
          value={currencyOptions.from}
          helperText="Please select the currency you want to convert from"
          onChange={(e) => {
            setCurrencyOptions({ ...currencyOptions, from: e.target.value });
            setResult(undefined);
          }}
        />
        <CurrencySelectInput
          id="outlined-select-to-currency"
          label="To"
          value={currencyOptions.to}
          helperText="Please select the currency you want to convert to"
          onChange={(e) => {
            setCurrencyOptions({ ...currencyOptions, to: e.target.value });
            setResult(undefined);
          }}
        />
        <Button variant="contained" onClick={(e) => handleOnClick(e)}>
          Convert
        </Button>
      </Box>
      {result && (
        <Typography
          variant="h4"
          gutterBottom
          style={{
            background: "linear-gradient(to right, #fc00ff, #00dbde)",
            WebkitTextFillColor: "transparent",
            WebkitBackgroundClip: "text",
          }}
        >
          {`${currencyOptions.amount} ${fromCurrency?.name_plural} is ${result} ${toCurrency?.name_plural}`}
        </Typography>
      )}
    </main>
  );
};

export default Home;
