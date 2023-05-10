import NextAuth from "next-auth";
import CoinbaseProvider from "next-auth/providers/coinbase";

const handler = NextAuth({
  providers: [
    CoinbaseProvider({
      clientId: process.env.COINBASE_ID,
      clientSecret: process.env.COINBASE_SECRET,
      authorization: {
        url: "https://www.coinbase.com/oauth/authorize",
        params: {
          scope: "wallet:accounts:read",
          account: "all",
        },
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account && account.access_token) {
        //not sure we need to pass the access token here

        if (!token.auths) {
            token.auths = {};
        }

        if (token.auths.coinbase) {
          throw new Error(`Coinbase already logged in`);
        }

        token.auths.coinbase = {
          cexId: "coinbase",
          token: account.access_token,
        }

        console.log("token", token);
        console.log("account", account);
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.

      console.log("sever session", session);

      return session;
    },
  },
});

export { handler as GET, handler as POST };