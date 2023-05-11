import { z } from "zod";

export const schemaCoinbaseAccountType = z.enum(["wallet", "fiat", "vault"]);

export const schemaCoinbaseMoneyHash = z.object({
  amount: z.string(),
  currency: z.string(),
});

export const schemaCoinbaseCurrency = z.object({
  code: z.string(),
  name: z.string(),
  color: z.string(),
  sort_index: z.number(),
  exponent: z.number(),
  type: z.string(),
  address_regex: z.string().optional(),
  asset_id: z.string().optional(),
  slug: z.string().optional(),
});

export const schemaCoinbaseCurrencyAccount = z.object({
  id: z.string(),
  name: z.string(),
  primary: z.boolean(),
  type: schemaCoinbaseAccountType,
  currency: schemaCoinbaseCurrency,
  balance: schemaCoinbaseMoneyHash,
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
  resource: z.literal("account"),
  resource_path: z.string(),
});

export type CoinbaseCurrencyAccount = z.infer<
  typeof schemaCoinbaseCurrencyAccount
>;

export const schemaCoinbaseGetAccountResponse = z.object({
  pagination: z.object({}).passthrough(),
  data: z.array(schemaCoinbaseCurrencyAccount),
});

export const schemaCoinbaseAccountAddress = z.object({
    "id": z.string(),
    "address": z.string(),
    "name": z.string(),
    "created_at": z.string(),
    "updated_at": z.string(),
    "network": z.string(),
    "resource": z.literal("address"),
    "resource_path": z.string(),
});

export type CoinbaseAccountAddress = z.infer<
  typeof schemaCoinbaseAccountAddress
>;

export const schemaCoinbaseGetAddressesResponse = z.object({
    pagination: z.object({}).passthrough(),
    data: z.array(schemaCoinbaseAccountAddress),
  });
  