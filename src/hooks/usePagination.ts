import React, { useEffect, useState } from 'react'
import { API_ENDPOINT } from '../constants';

const usePaginatedData = <T>(itemsPerPage: number = 10) => {
    const [currentPage, setCurrentPage] = useState({ no: 1, itemsPerPage })
    const [fetchDetails, setFetchDetails] = useState<{
        loading: boolean,
        error: null | Record<string, any>,
        data: T[],
        paginatedData: T[],
        start: number,
        end: number,
    }>({
        loading: false,
        error: null,
        data: [],
        paginatedData: [],
        start: 1,
        end: 10,
    })

    function paginate() {
        const startIndex = (currentPage.no - 1) * currentPage.itemsPerPage;
        const endIndex = startIndex + currentPage.itemsPerPage;
        return [fetchDetails.data.slice(startIndex, endIndex), startIndex, endIndex];
    }


    const fetchProjectsFromAPI = async () => {
        const _fetchDetails = { ...fetchDetails }
        try {
            setFetchDetails({
                ...fetchDetails,
                loading: true
            })
            const rawData = await fetch(API_ENDPOINT, {
                method: "GET"
            })
            const responseList = await rawData.json()
            _fetchDetails.data = [...responseList]
        }
        catch (e) {
            console.error(e)
            setFetchDetails({
                ..._fetchDetails,
                error: { ERROR_API: "Something Went Wrong!!" }
            })
        }
        finally {
            setFetchDetails({
                ..._fetchDetails,
                loading: false
            })
        }
    }

    useEffect(() => {
        fetchProjectsFromAPI()
    }, [])


    useEffect(() => {
        if (fetchDetails.data.length) {
            const [paginatedItems, start, end] = paginate();
            setFetchDetails({
                ...fetchDetails,
                paginatedData: paginatedItems as T[],
                // increment as 0 indexed to 1 to n .... 
                start: start as number + 1,
                end: (end as number)
            })
        }
    }, [fetchDetails.data, currentPage])

    return [{ ...fetchDetails, currentPage, totalItems: Math.ceil(fetchDetails.data.length / currentPage.itemsPerPage) }, { setCurrentPage, fetchProjectsFromAPI }] as const

}

export default usePaginatedData
