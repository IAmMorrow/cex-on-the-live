"use client";

import { Transport, WindowMessageTransport } from "@ledgerhq/wallet-api-client";
import { WalletAPIProvider } from "@ledgerhq/wallet-api-client-react";
import {
  getSimulatorTransport,
  profiles,
} from "@ledgerhq/wallet-api-simulator";

function getWalletAPITransport(simulator?: boolean): Transport {
  if (typeof window === "undefined") {
    return {
      onMessage: undefined,
      send: () => {},
    };
  }
  if (simulator) {
    return getSimulatorTransport(profiles.STANDARD);
  }

  const transport = new WindowMessageTransport();
  transport.connect();
  return transport;
}

const transport = getWalletAPITransport(true);

type WalletAPIProviderWrapperProps = {
  children: React.ReactElement;
};
export function WalletAPIProviderWrapper(props: WalletAPIProviderWrapperProps) {
  const { children } = props;

  return (
    <WalletAPIProvider transport={transport}>{children}</WalletAPIProvider>
  );
}
