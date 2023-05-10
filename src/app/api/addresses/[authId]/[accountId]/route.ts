import { GetAccountResponse, GetAddressesResponse, schemaGetAccountParams } from "@/types/api";
import { CexId } from "@/types/cex";
// import { getServerSession } from 'next-auth';
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { CexGetAccountHandler } from "./type";
import binanceGetAccount from "./binance";
import coinbaseGetAccount from "./coinbase";
import krakenGetAccount from "./kraken";

const CexGetAddressesHandler: Record<CexId, CexGetAccountHandler> = {
  "binance": binanceGetAccount,
  "coinbase": coinbaseGetAccount,
  "kraken": krakenGetAccount,
}

type RouteParams = {
  params: {
    authId: string;
    accountId: string;
  }
};

export async function GET(
  req: NextRequest,
  { params }: RouteParams
) {
  const token = await getToken({ req });

  if (!token) {
    throw new Error("getAddresses: no token");
  }

  const auth = token.auths[params.authId];

  if (!auth) {
    throw new Error(`no authId ${params.authId} in token`);
  }

  const getAddresses = CexGetAddressesHandler[auth.cexId];

  const addresses = await getAddresses(auth, params.accountId);

  const response: GetAddressesResponse = {
    addresses,
  };

  return NextResponse.json(response);
}
