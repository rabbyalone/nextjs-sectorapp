'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import avatar from '@/public/vercel.svg'
import Component from '../components/login-btn'
import { SessionProvider } from 'next-auth/react'
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import GithubProvider from "next-auth/providers/github";


export default function NavigationPage() {
    const [sessionUser, setSessionUser] = useState();

    useEffect(() => {
        Promise.resolve(getSession()).then(res => {
            if (!res){
                signIn(GithubProvider)
            }

            setSessionUser(res.user)
        })
    }, [])

    return (
        <SessionProvider>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <Link href={"/"} className="btn btn-ghost text-xl">SectorApp</Link>
                    <ul className='space-y-5'>
                        <Link className='mr-5 underline' href={"/sector-assign/list"} > Sector-Assign </Link>
                        <Link className='mr-5 underline' href={"/sector/list"} > Sector </Link>
                    </ul>
                </div>
                <div className="flex-none gap-2">
                    <Component />
                </div>
            </div>
        </SessionProvider>


    )
}
