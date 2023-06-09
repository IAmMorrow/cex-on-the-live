import { CexAuth } from "@/types/cex";
import { CexSendHandler } from "./type";
import { CexAccountAddress } from "@/types/api";
import {
  CoinbaseAccountAddress,
  schemaCoinbaseGetAddressesResponse,
} from "@/types/coinbase";

const getEndpointURL = (accountId: string) =>
  `https://api.coinbase.com/v2/accounts/${accountId}/transactions`;


const sendTransaction: CexSendHandler = async (auth: CexAuth, accountId: string, amount: string, currency: string, to: string, twoFactorCode?: string) => {
  if (auth.cexId !== "coinbase") {
    throw new Error("Bad auth type");
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.token}`,
      "CB-VERSION": "2023-02-11",
      ...(twoFactorCode ? {"CB-2FA-Token": twoFactorCode} : {})
    },
    body: JSON.stringify({
      type: "send",
      to: to,
      amount: amount,
      currency: currency,
    }),
  };

  console.log(options)

  const response = await fetch(getEndpointURL(accountId), options);

  if (response.status === 402) {
    return "2FA";
  }

  if (!response.ok) {
    console.log(JSON.stringify(await response.json(), null, 2))
    if (response.status !== 402) {
      throw new Error(`error ${response.status}`);
    }
  }

  const rawData = await response.json();

  console.log(rawData);

  // const { data } = schemaCoinbaseGetAddressesResponse.parse(rawData);

  return "OK";
};

export default sendTransaction;
