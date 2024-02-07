

import ButtonPage from '@/app/components/Button';
import { getItems } from '@/app/services/sector-assign';
import React from 'react'

export default async function ListPage() {

    const allData = await getItems();

    return (
        <div className="w-75 mx-auto glass border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-auto">
        <div className="p-5">
            <h2 className="card-title mb-5">List of Assigned Sectors</h2>
                    <table className='table '>
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
