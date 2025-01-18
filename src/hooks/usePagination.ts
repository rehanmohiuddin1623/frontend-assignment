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

    const totalItems = Math.ceil(fetchDetails.data.length / currentPage.itemsPerPage)

    const getPageIntervals = () => {
        const pages = [];
        const totalPages = totalItems;
        const startPage = Math.max(1, currentPage.no - 1);
        const endPage = Math.min(totalPages, currentPage.no + 2);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Ensure we always return exactly 4 pages if possible
        while (pages.length < 4 && pages[0] > 1) {
            pages.unshift(pages[0] - 1);
        }

        while (pages.length < 4 && pages[pages.length - 1] < totalPages) {
            pages.push(pages[pages.length - 1] + 1);
        }

        if (endPage !== totalPages) {
            pages.push(totalPages)
        }

        return pages;
    };

    return [{ ...fetchDetails, currentPage, totalItems, latestPageIntervals: getPageIntervals() }, { setCurrentPage, fetchProjectsFromAPI }] as const

}

export default usePaginatedData
