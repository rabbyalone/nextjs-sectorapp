'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getSession, useSession } from "next-auth/react"

export default function Component({ id, createBy }) {
    const [sessionUser, setSessionUser] = useState();

    useEffect(() => {
        Promise.resolve(getSession()).then(res => {
            if (!res) {
                signIn(GithubProvider)
            }

            setSessionUser(res.user)
        })
    }, [])
    return (
        <>
            {
                createBy === sessionUser?.email ?
                    <Link className='badge bg-green-500 text-white p-2' href={`update/${id}`}> Edit </Link>
                    :
                    <p className='text-red-500'>No Allowed!</p>

            }
        </>
    )
}
