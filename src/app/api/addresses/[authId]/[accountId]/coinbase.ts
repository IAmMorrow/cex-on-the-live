import { CexAuth } from "@/types/cex";
import { CexGetAccountHandler } from "./type";
import { CexAccountAddress } from "@/types/api";
import { CoinbaseAccountAddress, schemaCoinbaseGetAddressesResponse } from "@/types/coinbase";

const getEndpointURL = (accountId: string) => `https://api.coinbase.com/v2/accounts/${accountId}/addresses`;

function coinbaseAddressToAddress(accountAddress: CoinbaseAccountAddress): CexAccountAddress {
    return {
      "id": accountAddress.id,
      "address": accountAddress.address,
      "name": accountAddress.name,
      "created_at": accountAddress.created_at,
      "updated_at": accountAddress.updated_at,
      "network": accountAddress.network,
    }
}

const getAddresses: CexGetAccountHandler = async (auth: CexAuth, accountId: string) => {
  if (auth.cexId !== "coinbase") {
    throw new Error("Bad auth type");
  }

  const options = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
      "CB-VERSION": "2023-02-11",
    },
  };

  const response = await fetch(getEndpointURL(accountId), options);

  if (!response.ok) {
    throw new Error(`error ${response.status}`);
  }

  const rawData = await response.json();

  const { data } = schemaCoinbaseGetAddressesResponse.parse(rawData);

  return data.map(coinbaseAddressToAddress);
};

export default getAddresses;
