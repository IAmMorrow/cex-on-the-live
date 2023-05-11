import { GetAccountResponse, GetAddressesResponse, SendTransactionResponse, schemaGetAccountParams, schemaSendTransactionParams } from "@/types/api";
import { CexId } from "@/types/cex";
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
  "metamask": async () => "OK"
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

  const rawQuery = {
    currency: req.nextUrl.searchParams.get("currency"),
    amount: req.nextUrl.searchParams.get("amount"),
    to: req.nextUrl.searchParams.get("to"),
    twoFactorCode: req.nextUrl.searchParams.get("twoFactorCode") || undefined,
  }

  console.log({rawQuery});

  const { to, currency, amount, twoFactorCode } = schemaSendTransactionParams.parse(rawQuery);


  const sendTransaction = CexSendTransactionHandler[auth.cexId];

  const result = await sendTransaction(auth, params.accountId, amount, currency, to, twoFactorCode);

  

  const response: SendTransactionResponse = {
    result,
  };


  return NextResponse.json(response);
}
