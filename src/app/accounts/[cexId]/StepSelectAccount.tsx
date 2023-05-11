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

type StepSelectAccountProps = {
  state: AppState;
  setState: Dispatch<SetStateAction<AppState>>;
  cexId: CexId;
};

export default function StepSelectAccount(props: StepSelectAccountProps) {
  const { state, setState, cexId } = props;

  const cex = cexes[cexId];

  const handleAccountSelect = useCallback(
    (accountId: string) => {
      setState((oldState) => ({
        ...oldState,
        fromAccount: accountId,
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
        {state.cexAccounts.status === "pending" ? (
          <div className="items-center justify-center p-3 text-neutral-500 border-2 border-dashed border-neutral-500 rounded-lg">
            <p className="text-center">Syncing with {cex.name}</p>
          </div>
        ) : state.cexAccounts.status === "success" ? (
          <CurrencyAccountsList
            accounts={state.cexAccounts.data}
            onAccountSelect={handleAccountSelect}
          />
        ) : state.cexAccounts.status === "error" ? (
          <div className="text-red-600">An error occured</div>
        ) : null}
      </div>
    </>
  );
}
