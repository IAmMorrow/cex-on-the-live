"use client";

import { getProviders, signIn } from "next-auth/react";
import { useCallback } from "react";

type ProviderSignInButtonProps = {};

export function ProviderSignInButton(props: ProviderSignInButtonProps) {
  const handleSignIn = useCallback(() => {
    signIn("coinbase");
  }, []);

  return <button onClick={handleSignIn}>Sign In</button>;
}
