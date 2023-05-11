"use client";

import { CexId } from "@/types/cex";
import { signIn } from "next-auth/react";
import { useCallback } from "react";
import Image from "next/image";
import { Row } from "./Row";
import { cexes } from "@/app/data/cex";

type ProviderSignInButtonProps = {
  cexId: CexId;
  comingSoon?: boolean;
};

export function ProviderSignInButton(props: ProviderSignInButtonProps) {
  const { cexId, comingSoon } = props;
  const cex = cexes[cexId];

  const handleSignIn = useCallback(() => {
    signIn(cexId, { callbackUrl: `/accounts/${cexId}` });
  }, [cexId]);

  return (
    <Row onClick={handleSignIn} additionalProps={{ disabled: comingSoon }}>
      <div className="flex items-center">
        <div className="rounded-full overflow-hidden">
          <Image
            src={cex.imageUrl}
            width={32}
            height={32}
            alt={`Logo of ${cex.name}`}
          />
        </div>
        <p className="ml-3">{cex.name}</p>
      </div>
      {comingSoon ? (
        <div className="bg-neutral-600 rounded-md p-1">
          <p className="text-sm">Coming soon</p>
        </div>
      ) : null}
    </Row>
  );
}
