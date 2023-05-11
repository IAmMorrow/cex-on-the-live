"use client";

import { cexes } from "@/app/data/cex";
import { CexId } from "@/types/cex";
import { useRouter } from "next/navigation";
import {
  useCallback,
  SetStateAction,
  Dispatch,
  useMemo,
  useState,
} from "react";
import { AppState } from "./type";
import { useAccounts } from "@ledgerhq/wallet-api-client-react";
import { schemaSendTransactionResponse } from "@/types/api";

type SummaryProps = {};

function Summary(props: SummaryProps) {
  return (
    <div className="w-full rounded-xl p-4 bg-neutral-800 space-y-6 text-sm">
      <div className="flex justify-between">
        <span>Asset to transfer</span>
        <div>Ethereum</div>
      </div>
      <div className="flex justify-between">
        <span>Amount</span>
        <div>Ethereum</div>
      </div>
      <div className="flex justify-between">
        <span>Fees</span>
        <div>Ethereum</div>
      </div>
      <div className="flex justify-between">
        <span>Account</span>
        <div>Ethereum</div>
      </div>
    </div>
  );
}

type StepSummaryProps = {
  state: AppState;
  setState: Dispatch<SetStateAction<AppState>>;
  cexId: CexId;
};

export default function StepSummary(props: StepSummaryProps) {
  const { state, setState, cexId } = props;
  const router = useRouter();

  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState<string | null>(null);

  const cex = cexes[cexId];
  const { accounts } = useAccounts();

  console.log(accounts);

  const handleValidate = useCallback(async () => {
    if (
      !(
        state.toAccount &&
        state.fromAccount &&
        state.amount &&
        state.cexAccounts.status === "success" &&
        accounts
      )
    ) {
      return;
    }

    const liveAccount = accounts.find((acc) => acc.id === state.toAccount);
    const cexAccount = state.cexAccounts.data.find(
      (acc) => acc.id === state.fromAccount
    );

    if (!liveAccount || !cexAccount) {
      return;
    }

    const params = new URLSearchParams();
    params.set("to", liveAccount.address);
    params.set("currency", cexAccount.ticker);
    params.set("amount", state.amount);

    if (twoFactorCode !== null) {
      params.set("twoFactorCode", twoFactorCode);
    }

    console.log(`/api/send/${cexId}/${state.fromAccount}?${params.toString()}`);

    const response = await fetch(
      `/api/send/${cexId}/${state.fromAccount}?${params.toString()}`
    );
    const rawData = await response.json();
    const { result } = schemaSendTransactionResponse.parse(rawData);

    if (result === "2FA") {
      setTwoFactorRequired(true);
    }

    if (result === "OK") {
      router.replace("/success");
    }
  }, [accounts, cexId, state, router, twoFactorCode]);

  const currencyAccount = useMemo(() => {
    const cexAccounts =
      state.cexAccounts.status === "success" ? state.cexAccounts.data : [];

    return cexAccounts.find((acc) => acc.id === state.fromAccount);
  }, [state.cexAccounts, state.fromAccount]);

  // dirty
  if (!currencyAccount) {
    return null;
  }

  console.log(twoFactorCode);

  return (
    <>
      {twoFactorRequired ? (
        <>
          <h1 className="font-semibold text-2xl">Enter 2FA Code</h1>

          <div className="flex flex-col my-6 w-full space-y-3">
            <div className="flex flex-row w-full items-end justify-center">
              <input
                onChange={(e) => {
                  setTwoFactorCode(e.currentTarget.value);
                }}
                type="text"
                value={twoFactorCode || ""}
                className={`text-neutral-50 text-[56px] leading-10 appearance-none bg-transparent border-none focus:outline-none`}
                placeholder="XXXXXXX"
                aria-label="2FA Code"
              />
            </div>
          </div>
          <div className="align-bottom mt-auto py-4">
            <button
              className="w-full h-12 text-neutral-800 bg-white rounded-xl"
              onClick={handleValidate}
            >
              Confirm 2FA
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="font-semibold text-2xl">Summary</h1>

          <div className="flex flex-col my-6 w-full space-y-3">
            <div className="w-full rounded-xl p-4 bg-neutral-800 space-y-6">
              coinbase
            </div>
            <div className="w-full rounded-xl p-4 bg-neutral-800 space-y-6">
              ledger live
            </div>
            <Summary />
          </div>
          <div className="align-bottom mt-auto py-4">
            <button
              className="w-full h-12 text-neutral-800 bg-white rounded-xl"
              onClick={handleValidate}
            >
              Confirm transaction
            </button>
          </div>
        </>
      )}
      <></>
    </>
  );
}
