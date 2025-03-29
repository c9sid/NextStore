import { Loader } from 'lucide-react'
import React from 'react'

const loading = () => {
    return (
        <div className='py-10 flex justify-center items-center'><Loader className='animate-spin text-neutral-500' /></div>
    )
}

export default loading