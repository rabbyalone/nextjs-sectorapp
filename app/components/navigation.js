'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import avatar from '@/public/vercel.svg'
import Component from '../components/login-btn'
import { SessionProvider } from 'next-auth/react'
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import GithubProvider from "next-auth/providers/github";
import { faBars, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <SessionProvider>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white text-3xl">
                        <Link href="/">SectorApp</Link>
                    </div>
                    <div className="hidden md:block">
                        <Link href="/" className="text-white mx-4">
                            <FontAwesomeIcon icon={faHome} className="text-gray-300 mr-2" width="16" />
                            Home</Link>
                        <Link href="/sector-assign/list" className="text-white mx-4">
                            Sector-Assign</Link>
                        <Link href="/sector/list" className="text-white mx-4">
                            Sector</Link>
                        <Component />
                    </div>
                    <div className="md:hidden">
                        <button className="text-white" onClick={toggleMenu}>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden bg-gray-800">
                        <Link href="/" className="block text-white py-2 px-4">
                            <FontAwesomeIcon icon={faHome} className="text-gray-300 mr-2" />
                            Home</Link>
                        <Link href="/sector-assign/list" className="block text-white py-2 px-4">
                            Sector-Assign</Link>
                        <Link href="/sector/list" className="block text-white py-2 px-4">
                            Sector</Link>
                        <Component />
                    </div>
                )}
            </nav>
        </SessionProvider>


    )
}
