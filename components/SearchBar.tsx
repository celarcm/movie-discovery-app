'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function SearchBar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '')

    const handleSearch: React.SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()

        const trimmedQuery = searchQuery.trim();

        if (trimmedQuery) {
            router.push(`?query=${encodeURIComponent(searchQuery.trim())}`)
        } else {
            router.push('/')
        }
    }

    return (
        <form onSubmit={handleSearch} className="lg:max-w-3xl md:max-w-lg mx-auto flex gap-2">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for movies..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Search
            </button>
        </form>
    )
}