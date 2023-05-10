export type CexId = "coinbase" | "binance" | "kraken";

export type CoinbaseAuth = {
    cexId: CexId;
    token: string;
  }
  
  export type CexAuth = CoinbaseAuth // extend with new auth types
  