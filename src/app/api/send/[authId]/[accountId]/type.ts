import { CexAccountAddress } from "@/types/api";
import { CexAuth } from "@/types/cex";

export type CexSendHandler = (auth: CexAuth, accountId: string, amount: string, currency: string, to: string) => Promise<CexAccountAddress[]>