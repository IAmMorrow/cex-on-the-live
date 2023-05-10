"use client";

import { CurrencyAccountsList } from "@/components/CurrencyAccountsList";
import { CexCurrencyAccount, schemaGetAccountResponse } from "@/types/api";
import { useEffect, useState } from "react";

export default function Accounts() {
  const [loading, setLoading] = useState<boolean>(true);
  const [accounts, setAccounts] = useState<CexCurrencyAccount[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/accounts/coinbase`).then(async (response) => {
      const rawData = await response.json();

      const data = schemaGetAccountResponse.parse(rawData);

      setAccounts(data.accounts.filter(account => parseInt(account.balance) > 0))
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col mt-9 w-full p-10">
      <h1 className="font-semibold text-2xl">
        Choose an asset to transfer
      </h1>
      <p className="font-regular text-small text-neutral-500 mt-2">
        Some assets might not be supported by Ledger and so may not display here.
      </p>
      <div className="flex flex-col my-6 w-full">
        {loading ? (
          <div className="items-center justify-center p-3 text-neutral-500 border-2 border-dashed border-neutral-500 rounded-lg">
            <p className="text-center">
              Syncing with {"Coinbase"}
            </p>
          </div>
        ) : (
          <CurrencyAccountsList accounts={accounts} />
        )}
      </div>
    </div>
  );
}
