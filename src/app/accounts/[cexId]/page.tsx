"use client";

import { Stepper } from "@/components/Stepper";
import { schemaGetAccountResponse } from "@/types/api";
import { CexId } from "@/types/cex";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AppState } from "./type";
import StepSelectAccount from "./StepSelectAccount";
import StepSelectAmount from "./StepSelectAmount";

const initialState: AppState = {
  cexAccounts: {
    status: "idle",
  },
  fromAccount: null,
  amount: null,
  toAccount: null,
};

export default function Accounts({ params }: { params: { cexId: CexId } }) {
  const { cexId } = params;

  const [state, setState] = useState<AppState>(initialState);

  const loadAccounts = useCallback(async () => {
    try {
      setState((oldState) => ({
        ...oldState,
        cexAccounts: {
          status: "pending",
        },
      }));

      const response = await fetch(`/api/accounts/${cexId}`);
      const rawData = await response.json();
      const { accounts } = schemaGetAccountResponse.parse(rawData);

      setState((oldState) => ({
        ...oldState,
        cexAccounts: {
          status: "success",
          data: accounts,
        },
      }));
    } catch (error) {
      setState((oldState) => ({
        ...oldState,
        cexAccounts: {
          status: "error",
          error,
        },
      }));
    }
  }, [cexId]);

  useEffect(() => {
    if (state.cexAccounts.status === "idle") {
      loadAccounts();
    }
  }, [loadAccounts, state.cexAccounts.status]);

  const currentStep = useMemo(() => {
    if (state.toAccount !== null) {
      return 3;
    }

    if (state.amount !== null) {
      return 2;
    }

    if (state.fromAccount !== null) {
      return 1;
    }

    return 0;
  }, [state]);

  console.log(state);

  return (
    <div className="flex flex-col">
      <Stepper currentStep={currentStep} maxStep={4} />
      {currentStep === 0 ? (
        <StepSelectAccount state={state} setState={setState} cexId={cexId} />
      ) : currentStep === 1 ? (
        <StepSelectAmount state={state} setState={setState} cexId={cexId} />
      ) : currentStep === 2 ? (
        "todo"
      ) : currentStep === 3 ? (
        "todo"
      ) : null}
    </div>
  );
}
