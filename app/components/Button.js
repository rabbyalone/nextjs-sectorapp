import React from 'react'
import Link from 'next/link'

export default function ButtonPage({ id }) {
    return (
        <Link className='badge bg-green-500 text-white p-2' href={`update/${id}`}> Edit </Link>
    )
}
