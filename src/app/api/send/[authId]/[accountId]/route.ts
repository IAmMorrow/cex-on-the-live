import { GetAccountResponse, GetAddressesResponse, schemaGetAccountParams } from "@/types/api";
import { CexId } from "@/types/cex";
// import { getServerSession } from 'next-auth';
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { CexSendHandler } from "./type";
import binanceSend from "./binance";
import coinbaseSend from "./coinbase";
import krakenSend from "./kraken";

const CexSendTransactionHandler: Record<CexId, CexSendHandler> = {
  "binance": binanceSend,
  "coinbase": coinbaseSend,
  "kraken": krakenSend,
  "metamask": async () => []
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

  const sendTransaction = CexSendTransactionHandler[auth.cexId];

  // TODO
  const addresses = await sendTransaction(auth, params.accountId, 1, "BTC", "0x000");

  const response: GetAddressesResponse = {
    addresses,
  };

  return NextResponse.json(response);
}
