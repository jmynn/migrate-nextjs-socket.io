'use client'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

const Page = ():ReactNode => {
    const router = useRouter()
    return (
        <div>
            im pink page
            <button onClick={() => router.push('/')}>main</button>
        </div>
    )
}

export default Page