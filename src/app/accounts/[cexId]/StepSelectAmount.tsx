"use client";

import { cexes } from "@/app/data/cex";
import { CexId } from "@/types/cex";
import {
  useCallback,
  SetStateAction,
  Dispatch,
  useMemo,
  useState,
} from "react";
import { AppState } from "./type";

type StepSelectAmountProps = {
  state: AppState;
  setState: Dispatch<SetStateAction<AppState>>;
  cexId: CexId;
};

export default function StepSelectAmount(props: StepSelectAmountProps) {
  const { state, setState, cexId } = props;

  const [inputValue, setInputValue] = useState("0");

  const handleInputValueChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      // todo prevent bad characters
      setInputValue(e.currentTarget.value);
    },
    []
  );

  const cex = cexes[cexId];

  const handleAmountSelect = useCallback(() => {
    if (!Number.isNaN(inputValue)) {
      setState((oldState) => ({
        ...oldState,
        amount: inputValue,
      }));
    }
  }, [setState, inputValue]);

  const currencyAccount = useMemo(() => {
    const cexAccounts =
      state.cexAccounts.status === "success" ? state.cexAccounts.data : [];

    return cexAccounts.find((acc) => acc.id === state.fromAccount);
  }, [state.cexAccounts, state.fromAccount]);

  // dirty
  if (!currencyAccount) {
    return null;
  }

  return (
    <>
      <h1 className="font-semibold text-2xl">Choose amount</h1>
      <p className="font-regular text-sm leading-4 text-neutral-500 mt-2">
        Choose the amount to transfer
      </p>
      <div className="flex flex-col my-6 w-full">
        <div className="flex flex-row w-full items-end justify-center">
          <input
            style={{
              width: `${Math.max(inputValue.length, 1)}ch`,
            }}
            onChange={handleInputValueChange}
            type="text"
            value={inputValue === "0" ? undefined : inputValue}
            className={`${
              inputValue !== "0" ? "text-neutral-50" : "text-neutral-500"
            } text-[56px] leading-10 appearance-none bg-transparent border-none focus:outline-none`}
            placeholder="0"
            aria-label="Full name"
          />
          <div className="text-2xl leading-10 text-neutral-50 ml-1">
            {currencyAccount.ticker}
          </div>
        </div>
      </div>
      <div className="align-bottom mt-auto py-4">
        <button
          className="w-full h-12 bg-neutral-700 rounded-xl"
          onClick={handleAmountSelect}
        >
          Continue
        </button>
      </div>
    </>
  );
}
