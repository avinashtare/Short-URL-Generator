import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import SingleLink from './SingleLink';
import { getLinks } from '../../redux/urls';


const LinksTable = () => {
    const LinksLoaded = useRef(false);
    const dispatch = useDispatch();

    const linksState = useSelector((state) => state.urls.getLinks)

    useEffect(() => {
        if (LinksLoaded.current == false) {
            LinksLoaded.current = true;
            console.log("welcome")
            dispatch(getLinks());
        }
    }, [LinksLoaded])

    return (
        <>
            <h1 className='py-3 mb-2 text-center text-4xl text-gray-200 font-bold'>Your Links</h1>
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Real URL
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Short URL
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Clicks
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {!linksState.isLoading ? linksState.links.map((data, index) =>
                            <SingleLink
                                key={index}
                                {...data}
                            />
                        ) : null}
                    </tbody>
                </table>
            </div>
            {
                !linksState.isLoading && linksState.links.length == 0 ?
                    (
                        <div className='my-5 flex items-center flex-col'>
                            <span className='p-2 text-2xl text-white'>There is no any links click below button to create links</span>
                            <Link to="/" className="my-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Craete Link</Link>
                        </div>
                    ) : linksState.isLoading ? (
                        <div className='my-5 flex items-center flex-col'>
                            <span className='p-2 text-4xl text-white'>Loading</span>
                        </div>
                    ) : null
            }
        </>

    )
}

export default LinksTable