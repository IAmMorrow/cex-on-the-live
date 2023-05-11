import { z } from "zod";

export const schemaCexId = z.enum(["coinbase", "binance", "kraken", "metamask"]);

export type CexId = z.infer<typeof schemaCexId>;

export type CoinbaseAuth = {
    cexId: CexId;
    token: string;
  }

export type CexAuth = CoinbaseAuth // extend with new auth types

export type Cex = {
  id: CexId,
  name: string,
  imageUrl: string,
}
