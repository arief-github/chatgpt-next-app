// route handler
import NextAuth, { CallbacksOptions, AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

const authOptions: AuthOptions = {
    callbacks: {
        async signIn({ profile }: { profile: { login: string } }) {
            return profile.login === "arief-github"
        }
    } as unknown as CallbacksOptions,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
    ],
    debug: true,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };