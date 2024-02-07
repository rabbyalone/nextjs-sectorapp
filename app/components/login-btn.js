import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'

export default function Component() {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                Signed in as {session.user.email} <br />
                <button className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={(e) => {
                        e.preventDefault();
                        signOut(
                            {
                                callbackUrl: '/api/auth/signin?callbackUrl=/'
                            }

                        )
                    }}>Sign out</button>
            </>
        )
    } else {
        return (
            <>
                Not signed in <br />
                <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 " onClick={() => signIn()}>Sign in</button>
            </>
        )
    }
}