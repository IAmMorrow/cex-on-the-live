import { CexAccountAddress } from "@/types/api";
import { CexAuth } from "@/types/cex";

export type CexGetAccountHandler = (auth: CexAuth, accountId: string) => Promise<CexAccountAddress[]>