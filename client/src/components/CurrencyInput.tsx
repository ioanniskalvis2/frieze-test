import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import { Currency } from "../util/currency-data";

interface CurrencyInputProps {
  value: number;
  currencySymbol: Currency["symbol_native"];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const CurrencyInput = ({
  value,
  currencySymbol,
  onChange,
}: CurrencyInputProps) => {
  return (
    <FormControl sx={{ m: 1 }}>
      <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
      <OutlinedInput
        id="outlined-adornment-amount"
        type="number"
        startAdornment={
          <InputAdornment position="start">{currencySymbol}</InputAdornment>
        }
        label="Amount"
        onChange={onChange}
        value={value}
      />
    </FormControl>
  );
};

export default CurrencyInput;
