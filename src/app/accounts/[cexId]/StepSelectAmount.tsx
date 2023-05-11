"use client";

import { cexes } from "@/app/data/cex";
import { CexId } from "@/types/cex";
import { useCallback, SetStateAction, Dispatch } from "react";
import { AppState } from "./type";

type StepSelectAmountProps = {
  state: AppState;
  setState: Dispatch<SetStateAction<AppState>>;
  cexId: CexId;
};

export default function StepSelectAmount(props: StepSelectAmountProps) {
  const { state, setState, cexId } = props;

  const cex = cexes[cexId];

  const handleAmountSelect = useCallback(
    (amount: number) => {
      setState((oldState) => ({
        ...oldState,
        amount,
      }));
    },
    [setState]
  );

  return (
    <>
      <h1 className="font-semibold text-2xl">Choose amount</h1>
      <p className="font-regular text-sm leading-4 text-neutral-500 mt-2">
        Choose the amount to transfer
      </p>
      <div className="flex flex-col my-6 w-full">TODO</div>
    </>
  );
}
