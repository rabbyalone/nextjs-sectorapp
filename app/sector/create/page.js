'use client'

import { createSector, getSectors } from '../../services/sector';
import { createItem } from '../../services/sector-assign';
import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { toast } from 'react-toastify';
import Link from 'next/link'

export default function CreatePage() {

    const [groupedOpt, setGroupVal] = useState([]);
    const [selected, setSelected] = useState();
    const [sessionUser, setSessionUser] = useState();

    const onChange = (option) => setSelected(option);
    const [value, setValue] = useState();
    

    useEffect(() => {
        Promise.resolve(getSession()).then(res => {
            setSessionUser(res.user)
        })
    }, [])

    async function handleSubmit(event) {

        event.preventDefault()
        
        console.log(value)
        const formData = new FormData(event.target)
        const name = formData.get('name')

        const body = {
            groupName: name,
            sectors: value,
        }
        const dta = createSector(body)
        toast.success("Hurrah! Sectors created!!")

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
                    <h2 className="card-title mb-5">Add new sectors</h2>

                    <form onSubmit={handleSubmit} className="max-w-sm">
                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group Name</label>
                            <input type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your name" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sectors</label>                      
                            
                            <CreatableSelect isMulti onChange={(newValue) => setValue(newValue)} />
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        <Link href="list" className="text-white bg-gray-400 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-3">Back to list</Link>
                    </form>
                </div>
            </div>
        </>
    )
}
