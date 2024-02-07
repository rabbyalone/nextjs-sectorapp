import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: "d489e13a79b4374c85dc",
            clientSecret: "e47e33c906ca43d6d02fe3070fa118fdb52e4978",
        })
        
    ]
})

export { handler as GET, handler as POST }