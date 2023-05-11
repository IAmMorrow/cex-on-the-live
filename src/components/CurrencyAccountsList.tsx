"use client";

import { CexCurrencyAccount } from "@/types/api";
import Image from "next/image";
import { Row } from "./Row";

type CurrencyAccountsListProps = {
  accounts: CexCurrencyAccount[];
  onAccountSelect: (accountId: string) => void;
};

export function CurrencyAccountsList(props: CurrencyAccountsListProps) {
  const { accounts, onAccountSelect } = props;

  const filteredAccounts = accounts.filter(
    (account) => Number(account.balance) > 0
  );

  return (
    <div className="">
      {filteredAccounts.map((account) => (
        <Row key={account.id} onClick={() => onAccountSelect(account.id)}>
          <div className="flex items-center">
            <div className="rounded-full overflow-hidden">
              <Image
                src={`/icons/${account.ticker.toLowerCase()}.png`}
                width={48}
                height={48}
                alt={`Logo of ${account.currency}`}
              />
            </div>
            <p className="ml-3">{account.name}</p>
          </div>
          <div className="flex flex-col">
            <p>
              {account.balance} {account.ticker}
            </p>
          </div>
        </Row>
      ))}
    </div>
  );
}
