import React from 'react'

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-bold text-red-600">404</h1>
            <p className="text-xl text-gray-600 mt-2">Oops! Page not found.</p>
            <a href="/" className="mt-4 text-blue-500 hover:underline">Go back home</a>
        </div>
    )
}

export default NotFound