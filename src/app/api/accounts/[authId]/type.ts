import { CexCurrencyAccount } from "@/types/api";
import { CexAuth } from "@/types/cex";

export type CexGetAccountHandler = (auth: CexAuth) => Promise<CexCurrencyAccount[]>