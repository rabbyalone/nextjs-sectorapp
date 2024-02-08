'use client'

import { getSectors } from '../../services/sector';
import { createItem } from '../../services/sector-assign';
import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { toast } from 'react-toastify';
import Link from 'next/link'

export default function CreatePage() {

    const [groupedOpt, setGroupVal] = useState([]);
    const [selected, setSelected] = useState();
    const [sessionUser, setSessionUser] = useState();

    const onChange = (option) => setSelected(option);

    useEffect(() => {
        Promise.resolve(getSession()).then(res => {
            setSessionUser(res.user)
        })
    }, [])

    async function handleSubmit(event) {

        event.preventDefault()
        const formData = new FormData(event.target)
        const name = formData.get('name')

        const body = {
            name: name,
            sectors: selected,
            isAgreed: true,
            createBy: sessionUser.email
        }
        const dta = createItem(body)
        toast.success("Hurrah! Sectors assignment works like a charm!")

    }

    useEffect(() => {
        Promise.resolve(getSectors()).then(res => {
            const da = res.map(g => ({
                label: g.groupName,
                options: g.sectors
            }));

            setGroupVal(da)
        })
    }, [])



    return (
        <>
            <div className="max-w-sm mx-auto glass border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="p-5">
                    <h2 className="card-title mb-5">Assign Sectors</h2>

                    <form onSubmit={handleSubmit} className="max-w-sm">
                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                            <input type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your name" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sectors</label>
                            <Select
                                isMulti
                                options={groupedOpt}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                required
                                name='gr'
                                value={selected}
                                onChange={onChange}
                                instanceId="sectorGroupId"
                            />
                        </div>
                        <div className="flex items-start mb-5">
                            <div className="flex items-center h-5">
                                <input id="remember" name="rh" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                            </div>
                            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Agree terms & condition</label>
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        <button className="text-white bg-gray-400 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-3"><Link href="list" >Back to list</Link></button>
                    </form>
                </div>
            </div>
        </>
    )
}
