import React from 'react'

type CardProps = {
    title: string;
    description: string;
    time: string;
}

const Card = ({ title, description, time }: CardProps) => {
    return (
        <a href="#" className="block max-w-xs p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-1 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {title}
            </h5>
            <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                {description}
            </p>
            <p className='mt-2 text-xs font-normal text-gray-500'>
                {time}
            </p>
        </a>
    )
}

export default Card
