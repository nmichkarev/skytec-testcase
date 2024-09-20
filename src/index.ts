import "dotenv/config";
import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import { purchaseControllerFactory } from "./controllers.js";

const { Pool } = pg;
const pool = new Pool();

const app = express();
const port = 5000;

const client = await pool.connect();

app.use(bodyParser.json());

app.post("/purchase", purchaseControllerFactory(client));

app.listen(port, () => console.log(`Running on port ${port}`));

// TODO: shutdown pool on app stop
