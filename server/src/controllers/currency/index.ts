import axios, { AxiosResponse } from "axios";
import { NextFunction, Request, Response } from "express";
import nodeCache from "node-cache";

interface ExchangeRates {
  result: "success" | "error";
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  conversion_rates: { [key: string]: number };
}

type ReqQuery = {
  from?: string;
  to?: string;
  amount?: number;
};

const myCache = new nodeCache();

export async function conversion(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { from, to, amount } = req.query as ReqQuery;
  if (!from || !to || !amount) {
    res.status(400).send({
      message:
        "In order for a conversion to work, there needs to be a valid from currency, to currency and a numeric amount.",
    });
    return;
  }
  const cachedValue = myCache.has(from);
  let exchangeRates: ExchangeRates["conversion_rates"];
  if (!cachedValue) {
    try {
      const response: AxiosResponse<ExchangeRates> = await axios.get(
        `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${from}`
      );

      if (response.status !== 200) {
        res.status(400).send({
          message: "Something went wrong with accessing the exchange rate data",
        });
        return;
      }
      exchangeRates = response.data.conversion_rates;
      myCache.set(from, response.data.conversion_rates, 86400);
    } catch (e) {
      res.status(400).send({
        message: "Something went wrong with accessing the exchange rate data",
      });
      return;
    }
  } else {
    exchangeRates = myCache.get(from) as ExchangeRates["conversion_rates"];
  }

  if (to in exchangeRates) {
    const conversionResult = exchangeRates[to] * Number(amount);
    res
      .status(200)
      .send({ data: { result: Number(conversionResult).toFixed(2) } });
    return;
  }
}
