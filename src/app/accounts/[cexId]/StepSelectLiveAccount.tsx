"use client";

import { cexes } from "@/app/data/cex";
import { CurrencyAccountsList } from "@/components/CurrencyAccountsList";
import { CexId } from "@/types/cex";
import {
  useCallback,
  useEffect,
  useState,
  SetStateAction,
  Dispatch,
} from "react";
import { AppState } from "./type";
import { useAccounts } from "@ledgerhq/wallet-api-client-react";
import { LiveAccountsList } from "@/components/LiveAccountList";

type StepSelectLiveAccountProps = {
  state: AppState;
  setState: Dispatch<SetStateAction<AppState>>;
  cexId: CexId;
};

export default function StepSelectLiveAccount(
  props: StepSelectLiveAccountProps
) {
  const { state, setState, cexId } = props;

  const { accounts } = useAccounts();

  console.log(accounts);

  const cex = cexes[cexId];

  const handleAccountSelect = useCallback(
    (accountId: string) => {
      setState((oldState) => ({
        ...oldState,
        toAccount: accountId,
      }));
    },
    [setState]
  );

  return (
    <>
      <h1 className="font-semibold text-2xl">Choose an asset to transfer</h1>
      <p className="font-regular text-sm leading-4 text-neutral-500 mt-2">
        Some assets might not be supported by Ledger and so may not display
        here.
      </p>
      <div className="flex flex-col my-6 w-full">
        {accounts ? (
          <LiveAccountsList
            accounts={accounts}
            onAccountSelect={handleAccountSelect}
            state={state}
          />
        ) : null}
      </div>
    </>
  );
}
