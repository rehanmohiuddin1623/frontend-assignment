import React, { useMemo } from 'react'
import Header from '../components/header'
import "./style.css"
import { CircleDollarSign, FolderKanban, Group } from 'lucide-react';
import List from '../components/list';
import usePaginatedData from '../hooks/usePagination';
import { ProjectItem } from '../types';

function Home() {

    const [{ data, paginatedData, currentPage, totalItems, start, end, latestPageIntervals }, { setCurrentPage }] = usePaginatedData<ProjectItem>(5)

    const fetchNextItemsonPageChange = (current: number, next: number, size: number) => {
        setCurrentPage({ ...currentPage, no: next, itemsPerPage: size })
    }
    const { totalNumOfBackers, totalPledged } = useMemo(() => {
        return paginatedData.reduce((prevVal, currVal) => {
            prevVal.totalPledged += currVal['amt.pledged']
            prevVal.totalNumOfBackers += !isNaN(Number(currVal['num.backers'])) ? Number(currVal['num.backers']) : prevVal.totalNumOfBackers
            return { ...prevVal }
        }, { totalPledged: 0, totalNumOfBackers: 0 })
    }, [paginatedData])

    const statsCards = [
        { id: 1, icon: <FolderKanban size={32} />, count: data.length, label: `Total Projects (OverAll)`, color: "#FFD700" },
        { id: 2, icon: <CircleDollarSign size={32} />, count: totalPledged, label: `Amount Pledged (From ${start} To ${end})`, color: "#3B82F6" },
        { id: 3, icon: <Group size={32} />, count: totalNumOfBackers, label: `Total Number of Backers (From ${start} To ${end})`, color: "#EF4444" }
    ];

    return (
        <div className='main'>
            <Header />
            <main>
                <section className="flex-column sub-section-header"><h1 className="header">Welcome 👋</h1><p className="sub-text">Find The Trending Projects.</p></section>
                <div className="stats-grid">
                    {statsCards.map(({ id, icon, count, label, color }) => (
                        <div key={id} className="stat-card flex-column">
                            <div className='flex-row icon-center' >
                                <div className="flex-column stat-icon" style={{ color }}>
                                    {icon}
                                </div>
                                <div className="stat-count">{count}</div>
                            </div>
                            <div className="stat-content">
                                <div className="stat-label">{label}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <List latestPageIntervals={latestPageIntervals} projects={paginatedData} paginationDetails={{ current: currentPage.no, size: currentPage.itemsPerPage, total: totalItems, start, end }} onPaginationChange={fetchNextItemsonPageChange} />
            </main>
        </div>
    )
}

export default Home
