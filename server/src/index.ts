import express, { Express } from "express";
import currencyRoutes from "./routes/currency/index";
import bodyParser from "body-parser";
import cors from "cors";

require("dotenv").config();

const app: Express = express();
const port: number = Number(process.env.PORT) || 3002;

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());

app.use("/currency", currencyRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
