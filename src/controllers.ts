import { PoolClient } from "pg";
import Express from "express";
import { Value } from "@sinclair/typebox/value";
import { PurchaseDTO } from "./models.js";
import { savePurchase } from "./services.js";

async function purchaseCreate(
  dbClient: PoolClient,
  request: Express.Request,
  response: Express.Response
) {
  let purchaseData: PurchaseDTO;
  try {
    // Validate input
    purchaseData = Value.Decode(PurchaseDTO, request.body);
  } catch (e) {
    console.error(e.message);
    return response.status(401).send("Invalid parameters");
  }

  try {
    await savePurchase(dbClient, purchaseData);
  } catch (e) {
    console.error(e);
    return response.status(500).send("Operation error");
  }
  response.send("Operation completed");
}

export function purchaseControllerFactory(dbClient: PoolClient) {
  return purchaseCreate.bind(this, dbClient);
}
