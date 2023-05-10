"use client";

import { CexCurrencyAccount } from "@/types/api";
import Image from "next/image";
import { Row } from "./Row";

type CurrencyAccountsListProps = {
  accounts: CexCurrencyAccount[];
};

export function CurrencyAccountsList(props: CurrencyAccountsListProps) {
  const { accounts } = props;
  
  return (
    <div className="">
      {accounts.map(account => (
        <Row onClick={() => console.log("Hello", account)}>
          <div className="flex items-center">
            <div className="rounded-full overflow-hidden">
              <Image
                src={'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png'}
                width={48}
                height={48}
                alt={`Logo of ${account.currency}`}
              />
            </div>
            <p className="ml-3">{ account.name }</p>
          </div>
          <div className="flex flex-col">
            <p>{account.balance} {account.ticker}</p>
          </div>
        </Row>
      ))}
    </div>
  );
}
