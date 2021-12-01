import NextAuth from "next-auth"
import Providers from "next-auth/providers"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: "512265054010-k3le1p2l9vldmthtnr7e5ev6cvh8icf3.apps.googleusercontent.com",
      clientSecret: "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",
      authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth?" +
        "prompt=consent&" +
        "response_type=code&" +
        "access_type=offline"
    }),
    // ...add more providers here
  ],
  jwt: {
    encryption: true,
  },
  secret: "asdfasdf",
  callbacks: {
    async jwt(token, account) {
      if(account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    redirect: async (url, _baseUrl) => {
      if(url === '/') {
        return Promise.resolve("/login");
      }
      return Promise.resolve("/login");
    }
  }
})