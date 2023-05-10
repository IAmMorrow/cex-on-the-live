import { z } from "zod";

export const schemaCexCurrencyAccount = z.object({
    id: z.string(),
    name: z.string(),
    currency: z.string(),
    balance: z.string(),
});

export type CexCurrencyAccount = z.infer<typeof schemaCexCurrencyAccount>;

export const schemaGetAccountParams = z.object({

});

export type GetAccountParams = z.infer<typeof schemaGetAccountParams>;

export const schemaGetAccountResponse = z.object({
    accounts: z.array(schemaCexCurrencyAccount),
});

export type GetAccountResponse = z.infer<typeof schemaGetAccountResponse>;

export const schemaCexAccountAddress = z.object({
    "id": z.string(),
    "address": z.string(),
    "name": z.string(),
    "created_at": z.string(),
    "updated_at": z.string(),
    "network": z.string(),
});

export type CexAccountAddress = z.infer<typeof schemaCexAccountAddress>;

const schemaGetAddressesResponse = z.object({
    accounts: z.array(schemaCexCurrencyAccount),
});
