import NextAuth from "next-auth"

import { JWT } from "next-auth/jwt"
import { CexAuth } from "./cex";



declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    auths: Record<string, CexAuth>;
  }
}

type CoinbaseAccount = {
  provider: "coinbase",
  type: "oauth",
  providerAccountId: string;
  access_token: string;
  token_type: string;
  expires_at: number;
  refresh_token: string;
  scope: string,
  created_at: number;
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address: string
    }
  }

  interface Account extends CoinbaseAccount {}

  interface Profile {
    id: string,
    name: string,
    email: string,
    image: string,
  }
}