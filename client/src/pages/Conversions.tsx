import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { Currency } from "../util/currency-data";
import { CurrencyOptions } from "./Home";
import { useEffect, useState } from "react";

export interface RecentConversion extends CurrencyOptions {
  result?: number;
  fromCurrencyName?: Currency["name"];
  fromCurrencySymbol?: Currency["symbol_native"];
  toCurrencyName?: Currency["name"];
  toCurrencySymbol?: Currency["symbol_native"];
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Conversions = () => {
  const [conversions, setConversions] = useState<RecentConversion[]>();

  useEffect(() => {
    const stringifiedConversions = localStorage.getItem("conversions");
    if (stringifiedConversions) {
      setConversions(JSON.parse(stringifiedConversions));
    }
  }, []);

  return (
    <TableContainer component={Paper} style={{ margin: "2em 0" }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>From Currency Name</StyledTableCell>
            <StyledTableCell>To Currency Name</StyledTableCell>
            <StyledTableCell>From Amount</StyledTableCell>
            <StyledTableCell>To Amount</StyledTableCell>
            <StyledTableCell>From Currency Code</StyledTableCell>
            <StyledTableCell>To Currency Code</StyledTableCell>
            <StyledTableCell>From Currency Symbol</StyledTableCell>
            <StyledTableCell>To Currency Code</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(conversions) &&
            conversions.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{row.fromCurrencyName}</StyledTableCell>
                <StyledTableCell>{row.toCurrencyName}</StyledTableCell>
                <StyledTableCell>{row.amount}</StyledTableCell>
                <StyledTableCell>{row.result}</StyledTableCell>
                <StyledTableCell>{row.from}</StyledTableCell>
                <StyledTableCell>{row.to}</StyledTableCell>
                <StyledTableCell>{row.fromCurrencySymbol}</StyledTableCell>
                <StyledTableCell>{row.toCurrencySymbol}</StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Conversions;
