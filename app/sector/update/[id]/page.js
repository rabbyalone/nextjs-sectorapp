'use client'

import { createSector, getItemsBySectorId, getSectors, updateSector } from '../../../services/sector';
import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { toast } from 'react-toastify';
import Link from 'next/link'

export default function CreatePage({params}) {
    const uid = params.id;
    
    const [groupedOpt, setGroupVal] = useState([]);
    const [sessionUser, setSessionUser] = useState();
    const [value, setValue] = useState();
    const [groupName, setName] = useState('');
    
    

    useEffect(() => {
        Promise.resolve(getSession()).then(res => {
            setSessionUser(res.user)
        })
    }, [])
    
    useEffect(() => {
        Promise.resolve(getItemsBySectorId(uid)).then(res => {
            setValue(res.sectors);
            setName(res.groupName)
        })
    }, [])

    async function handleSubmit(event) {

        event.preventDefault()
        
        console.log(value)
        const formData = new FormData(event.target)
        const name = formData.get('name')

        const body = {
            id: uid,
            groupName: name,
            sectors: value,
        }
        const dta = updateSector(uid,body)
        toast.success("Hurrah! Sectors updated!!")

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
                    <h2 className="card-title mb-5">Update sectors</h2>

                    <form onSubmit={handleSubmit} className="max-w-sm">
                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group Name</label>
                            <input type="text" onChange={(e) => setName(e.target.value)} value={groupName} name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your name" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sectors</label>                      
                            
                            <CreatableSelect  value={value} isMulti onChange={(newValue) => setValue(newValue)} instanceId="creatableId"/>
                        </div>
                        <div className='flex'>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                            <button type='button' className="text-white bg-gray-400 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-3"><Link href="/sector/list">Cancel</Link></button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
