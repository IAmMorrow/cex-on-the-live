import { CexCurrencyAccount } from "@/types/api";
import { Loadable } from "@/types/common";

export type AppState = {
    cexAccounts: Loadable<CexCurrencyAccount[]>;
    fromAccount: string | null;
    toAccount: string | null;
    amount: number | null;
  };
  