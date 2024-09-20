import { PurchaseDTO } from "./models.js";
import { PoolClient } from "pg";

export const savePurchase = async (client: PoolClient, data: PurchaseDTO) => {
  try {
    const queryInsertPurchase =
      "INSERT INTO balance_changes(user_id, action, amount) VALUES($1, $2, $3) RETURNING id";
    const updateUserBalance =
      "UPDATE users SET balance = balance - $2 WHERE id = $1";

    await client.query("BEGIN");
    await client.query(queryInsertPurchase, [
      data.user_id,
      "purchase",
      data.amount,
    ]);
    await client.query(updateUserBalance, [data.user_id, data.amount]);
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  }
};
