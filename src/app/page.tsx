"use client";

import { ProviderSignInButton } from "@/components/ProviderSignInButton";
import { schemaGetAccountResponse } from "@/types/api";
import { useAccounts } from "@ledgerhq/wallet-api-client-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetch(`/api/accounts/coinbase`).then(async (response) => {
      const rawData = await response.json();

      const data = schemaGetAccountResponse.parse(rawData);

      console.log(JSON.stringify(data, null, 2));
    });
  }, []);

  const result = useAccounts();

  console.log(result.accounts);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hello world
      <ProviderSignInButton />
    </main>
  );
}
