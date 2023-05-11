"use client";

import Image from "next/image";
import { Row } from "./Row";
import { Account, Currency } from "@ledgerhq/wallet-api-client";
import { useCurrencies } from "@ledgerhq/wallet-api-client-react";
import { useMemo } from "react";
import { AppState } from "@/app/accounts/[cexId]/type";
import { utils } from "ethers";

type LiveAccountsListProps = {
  accounts: Account[];
  onAccountSelect: (accountId: string) => void;
  state: AppState;
};

export function LiveAccountsList(props: LiveAccountsListProps) {
  const { accounts, onAccountSelect, state } = props;

  const { currencies } = useCurrencies();

  const currencyById = useMemo(() => {
    if (!currencies) {
      return {};
    }

    return currencies.reduce((acc: Record<string, Currency>, currency) => {
      acc[currency.id] = currency;
      return acc;
    }, {});
  }, [currencies]);

  const currencyAccount = useMemo(() => {
    const cexAccounts =
      state.cexAccounts.status === "success" ? state.cexAccounts.data : [];

    return cexAccounts.find((acc) => acc.id === state.fromAccount);
  }, [state.cexAccounts, state.fromAccount]);

  // dirty
  if (!currencyAccount) {
    return null;
  }

  if (!currencies) {
    return null;
  }

  console.log(currencyById);
  return (
    <div className="">
      {accounts.map((account) => {
        const currency = currencyById[account.currency];
        const icon = currency ? currency.ticker.toLowerCase() : undefined;

        if (!currency) {
          return null;
        }

        if (
          currency &&
          currency.ticker.toLowerCase() !== currencyAccount.ticker.toLowerCase()
        ) {
          return null;
        }

        return (
          <Row key={account.id} onClick={() => onAccountSelect(account.id)}>
            <div className="flex items-center">
              <div className="rounded-full overflow-hidden">
                {icon ? (
                  <Image
                    src={`/icons/${icon}.png`}
                    width={48}
                    height={48}
                    alt={`Logo of ${account.currency}`}
                  />
                ) : null}
              </div>
              <p className="ml-3">{account.name}</p>
            </div>
            <div className="flex flex-col">
              <p>
                {utils.formatUnits(
                  account.balance.toString(),
                  currency.decimals
                )}{" "}
                {currency.ticker}
              </p>
            </div>
          </Row>
        );
      })}
    </div>
  );
}
