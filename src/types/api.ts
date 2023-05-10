import { z } from "zod";

export const schemaCexCurrencyAccount = z.object({
    id: z.string(),
    name: z.string(),
    currency: z.string(),
    balance: z.string(),
    ticker: z.string(),
});

export type CexCurrencyAccount = z.infer<typeof schemaCexCurrencyAccount>;

export const schemaGetAccountParams = z.object({

});

export type GetAccountParams = z.infer<typeof schemaGetAccountParams>;

export const schemaGetAccountResponse = z.object({
    accounts: z.array(schemaCexCurrencyAccount),
});

export type GetAccountResponse = z.infer<typeof schemaGetAccountResponse>;
