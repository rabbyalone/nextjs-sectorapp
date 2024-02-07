'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import avatar from '@/public/vercel.svg'
import Component from '../components/login-btn'
import { SessionProvider } from 'next-auth/react'
import { useSession, signIn, signOut, getSession } from "next-auth/react"


export default function NavigationPage() {
    const [sessionUser, setSessionUser] = useState();
    
    useEffect(() => {
        Promise.resolve(getSession()).then(res => {
            if(!res)
              signIn()
            
            setSessionUser(res.user)
        })
    }, [])
    
    return (
        <SessionProvider>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <Link href={"/"} className="btn btn-ghost text-xl">SectorApp</Link>
                    <ul className='space-y-5'>
                        <Link className='mr-5 underline' href={"/sector-assign/assign"} > Sector-Assign </Link>
                        <Link className='mr-5 underline' href={"/sector-assign/list"} > Assigned-List </Link>
                    </ul>
                </div>
                <div className="flex-none gap-2">
                <Component />
                    {/* <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <Image alt="Tailwind CSS Navbar component" src={avatar} width={70} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                
                            </li>
                        </ul>
                    </div> */}
                </div>
            </div>
        </SessionProvider>


    )
}
