import { ProviderSignInButton } from "@/components/ProviderSignInButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col mt-9 w-full p-10">
      <h1 className="font-semibold text-2xl">
        Where is your crypto held?
      </h1>
      <div className="flex flex-col my-6 w-full">
        <ProviderSignInButton cexId="coinbase" />
        <ProviderSignInButton cexId="binance" comingSoon />
        <ProviderSignInButton cexId="kraken" comingSoon />
      </div>
    </main>
  );
}
