"use client";

import Image from "next/image";
import { Row } from "./Row";
import { Account } from "@ledgerhq/wallet-api-client";

type LiveAccountsListProps = {
  accounts: Account[];
  onAccountSelect: (accountId: string) => void;
};

export function LiveAccountsList(props: LiveAccountsListProps) {
  const { accounts, onAccountSelect } = props;

  return (
    <div className="">
      {accounts.map((account) => (
        <Row key={account.id} onClick={() => onAccountSelect(account.id)}>
          <div className="flex items-center">
            <div className="rounded-full overflow-hidden">
              <Image
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png"
                }
                width={48}
                height={48}
                alt={`Logo of ${account.currency}`}
              />
            </div>
            <p className="ml-3">{account.name}</p>
          </div>
          <div className="flex flex-col">
            <p>
              {account.balance.toString()} {account.currency}
            </p>
          </div>
        </Row>
      ))}
    </div>
  );
}
