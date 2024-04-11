import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";

import { currencies, Currency } from "../util/currency-data";

interface CurrencySelectInputProps {
  value: Currency["code"];
  id: string;
  label: string;
  helperText: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const CurrencySelectInput = ({
  value,
  id,
  label,
  helperText,
  onChange,
}: CurrencySelectInputProps) => {
  return (
    <TextField
      id={id}
      select
      label={label}
      value={value}
      helperText={helperText}
      onChange={onChange}
    >
      {currencies.map((currency) => (
        <MenuItem
          key={currency.code}
          value={currency.code}
        >{`${currency.code} - ${currency.name}`}</MenuItem>
      ))}
    </TextField>
  );
};

export default CurrencySelectInput;
