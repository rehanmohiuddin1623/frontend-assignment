import React from 'react';
import "./styles.css"
import { mockData } from '../../mock';
import Text from '../text';
import { ArrowLeft, ArrowRight, CircleUserRound, DollarSign, IndianRupee, LocateIcon, MapPin } from 'lucide-react';
import TitlePopover from '../title-popover';
import { ProjectItem } from '../../types';
import { PAGE_SIZES } from '../../constants';

const List = ({ projects = [], paginationDetails, onPaginationChange }: { projects: ProjectItem[]; paginationDetails: { current: number; total: number, start: number, end: number; size: number }; onPaginationChange: (current: number, next: number, size: number) => void }) => {

    const [isFirstPage, isLastPage] = [paginationDetails.current <= 1, paginationDetails.current === paginationDetails.total]
    const handleNextPaginationChange = () => {
        if (isLastPage) {
            return
        }
        if (onPaginationChange) {
            onPaginationChange(paginationDetails.current, paginationDetails.current + 1, paginationDetails.size)
        }
    }

    const handlePrevPaginationChange = () => {
        if (isFirstPage) {
            return
        }
        if (onPaginationChange) {
            onPaginationChange(paginationDetails.current, paginationDetails.current - 1, paginationDetails.size)
        }
    }

    return (
        <div className="flex-column list-container flex-column">
            <div className='justify-between flex-row items-info '>
                Showing Items {paginationDetails.start} To {paginationDetails.end}
            </div>
            <div className="list-table">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-left bg-gray-900">
                            <th className="p-4 text-gray-400">S.No</th>
                            <th className="p-4 text-gray-400">Project Name</th>
                            <th className="p-4 text-gray-400">Amount Pledged</th>
                            <th className="p-4 text-gray-400">Percentage Funded</th>
                            <th className="p-4 text-gray-400">Author</th>
                            <th colSpan={1} className="p-4 text-gray-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(project => (
                            <tr key={project['s.no']} className="border-t border-gray-800">
                                <td className="p-4 text-white">{project['s.no'] + 1}</td>
                                <td className="p-4 text-white"> <TitlePopover text={project.title} description={project.blurb} url={project.url} /></td>
                                <td className="flex-row align-center">
                                    <DollarSign size={16} />
                                    {project['amt.pledged']}
                                </td>
                                <td className="">
                                    {project['percentage.funded']}</td>
                                <td className="p-4">
                                    <div className="flex-row user-by">
                                        {/* <CircleUserRound className='user' width={44} height={44} /> */}
                                        <span className="text-white">{project.by}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex-row">
                                        <div className='flex-row align-center gap-2'>
                                            <TitlePopover triggerType='CLICK' dir='RIGHT' text={"View Details"} description={
                                                <div className='flex-column align-start' >
                                                    <div className='flex-row align-center gap-2'>
                                                        <span>End Time : </span>
                                                        {new Date(project['end.time']).toLocaleDateString()}
                                                    </div>
                                                    <div className='flex-row align-center gap-2'>
                                                        <span>Number Of Backers : </span>
                                                        {project['num.backers']}
                                                    </div>
                                                    <div className='flex-row align-center gap-2'>
                                                        <span>Location : </span>
                                                        {project['location']}
                                                    </div>
                                                </div>
                                            } url={null} />
                                        </div>
                                    </div>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
            <div className='justify-between flex-row pagination-container '>

                <span>
                    {paginationDetails.current} <span>OF</span> {paginationDetails.total}
                </span>
                <div className='flex-row align-center gap-2'>
                    <select value={paginationDetails.size} onChange={ev => onPaginationChange(1, 1, parseInt(ev.target.value))} >
                        {PAGE_SIZES.map(size => (
                            <option value={size} >{size}</option>
                        ))}
                    </select>
                    <button disabled={isFirstPage} className='pagination-btn' onClick={handlePrevPaginationChange} >
                        <ArrowLeft />
                    </button>
                    <button disabled={isLastPage} className='pagination-btn' onClick={handleNextPaginationChange}>
                        <ArrowRight />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default List;