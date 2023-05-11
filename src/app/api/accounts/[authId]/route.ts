import { GetAccountResponse, schemaGetAccountParams } from "@/types/api";
import { CexId } from "@/types/cex";
// import { getServerSession } from 'next-auth';
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { CexGetAccountHandler } from "./type";
import binanceGetAccount from "./binance";
import coinbaseGetAccount from "./coinbase";
import krakenGetAccount from "./kraken";

const CexGetAccountHandler: Record<CexId, CexGetAccountHandler> = {
  "binance": binanceGetAccount,
  "coinbase": coinbaseGetAccount,
  "kraken": krakenGetAccount,
  "metamask": async () => []
}

type RouteParams = {
  params: {
    authId: string;
  }
};

export async function GET(
  req: NextRequest,
  { params }: RouteParams
) {
  const token = await getToken({ req });

  if (!token) {
    throw new Error("getAccounts: no token");
  }

  const auth = token.auths[params.authId];

  if (!auth) {
    throw new Error(`no authId ${params.authId} in token`);
  }

  const getAccount = CexGetAccountHandler[auth.cexId];

  const accounts = await getAccount(auth);

  const response: GetAccountResponse = {
    accounts,
  };

  return NextResponse.json(response);
}
