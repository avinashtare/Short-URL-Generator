import React from 'react'

const SingleLink = ({ link_id, original_url, shorted_url, clicks_count, created_at }) => {
    return (
        <>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900">
                <td className="px-6 py-4 truncate min-w-[120px] max-w-[350px]">
                    <a href={original_url} target='_blank' className="text-blue-600">{original_url}</a>
                </td>
                <td className="px-6 py-4 truncate min-w-[120px] max-w-[350px]">
                    <a href={shorted_url} target='_blank' className="text-blue-600">{shorted_url}</a>
                </td>
                <td className="px-6 py-4 truncate min-w-[10px]">
                    {clicks_count}
                </td>
                <td className="px-6 py-4 truncate min-w-[30px]">
                    {created_at}
                </td>
                <td className="px-6 py-4 truncate min-w-[10px]">
                    <span className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">Delete</span>
                </td>
            </tr>
        </>
    )
}

export default SingleLink