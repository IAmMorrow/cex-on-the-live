import { CexAuth } from "@/types/cex";
import { CexGetAccountHandler } from "./type";
import { CexCurrencyAccount, schemaGetAccountResponse } from "@/types/api";
import { CoinbaseCurrencyAccount, schemaCoinbaseGetAccountResponse } from "@/types/coinbase";

const endpointURL = "https://api.coinbase.com/v2/accounts";

function coinbaseCurrencyAccountToAccount(account: CoinbaseCurrencyAccount): CexCurrencyAccount {
    return {
        id: account.id,
        cexId: "coinbase",
        balance: account.balance.amount,
        name: account.name,
        currency: account.currency.name,
        ticker: account.currency.code,
    }
}

const getAccount: CexGetAccountHandler = async (auth: CexAuth) => {
  if (auth.cexId !== "coinbase") {
    throw new Error("Bad auth type");
  }

  const options = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
      "CB-VERSION": "2023-02-11",
    },
  };

  const response = await fetch(endpointURL, options);

  if (!response.ok) {
    throw new Error(`error ${response.status}`);
  }

  const rawData = await response.json();

  const { data } = schemaCoinbaseGetAccountResponse.parse(rawData);

  return data.map(coinbaseCurrencyAccountToAccount);
};

export default getAccount;
