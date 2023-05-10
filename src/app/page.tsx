"use client";

import { ProviderSignInButton } from "@/components/ProviderSignInButton";
import { schemaGetAccountResponse } from "@/types/api";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetch(`/api/accounts/coinbase`).then(async (response) => {
      const rawData = await response.json();

      const data = schemaGetAccountResponse.parse(rawData);

      console.log(data);
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hello world
      <ProviderSignInButton />
    </main>
  );
}
