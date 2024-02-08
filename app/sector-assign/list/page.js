

import ButtonPage from '@/app/components/Button';
import { getItems } from '@/app/services/sector-assign';
import React from 'react'
import Link from 'next/link'
import { getSession } from "next-auth/react"

export default async function ListPage() {
    const session = await getSession();
    const allData = await getItems(session.user.email);

    return (
        <div className="w-75 mx-auto glass border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-auto">
        <div className="p-5">
            <h2 className="card-title mb-5">List of Assigned Sectors</h2>
            <Link className='text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-5' href="/sector/create">Add New</Link>

                    <table className='table mt-5'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Sectors</th>
                                <th>Create By</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allData.map(res => (
                                    <tr key={res.id}>
                                        <td>{res.name}</td>
                                        <td>{res.sectors.map(r => <span className='badge badge-accent mr-1' key={r.value}>{r.label}</span>)}</td>
                                        <td>{res.createBy}</td>
                                        <td><ButtonPage id={res.id} /></td>
                                    </tr>))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
    )
}
