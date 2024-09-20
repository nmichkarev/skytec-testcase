import { Type, type Static } from "@sinclair/typebox";

export const PurchaseDTO = Type.Object({
  user_id: Type.Number(),
  amount: Type.Number({ minimum: 0 }),
});

export type PurchaseDTO = Static<typeof PurchaseDTO>;
