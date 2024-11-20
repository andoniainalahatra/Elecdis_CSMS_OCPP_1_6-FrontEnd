import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { BsCalendarDate } from 'react-icons/bs';

const FilterHistoriqueStatusCP = ({ setObjet }) => {
    const [id, setId] = useState('');
    const [status, setStatus] = useState('');
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const [close, setclose] = useState(true);

    // const [objet, setObjet] = useState({
    //     id_cp: '',
    //     status: '',
    //     start_time: '',
    //     end_time: ''
    // });

    const handleSelect = (ranges) => {
        setDateRange([ranges.selection]);
    };

    const formatDate = (date) => {
        return date.toISOString().slice(0, 10);
    };

    return (
        <div className='relative flex items-center space-x-4'>
            {/* ID and Status Filters */}
            <div className='flex space-x-2'>
                <input
                    placeholder='Identifiant'
                    className='p-2 border border-gray-200 rounded-sm outline-none '
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className='p-2 border border-gray-200 rounded-sm outline-none '
                >
                    <option defaultValue='All' value='tous'>Tous</option>
                    <option value='Available'>Available</option>
                    <option value='Unavailable'>Unavailable</option>
                </select>
            </div>

            {/* Date Range Picker */}

            <BsCalendarDate size={25} cursor={'pointer'} onClick={() => { setclose((n) => !n) }} />
            {close ? ('') : (<div className='relative flex justify-center bg-white rounded'>



                <div className='absolute z-20 p-2 bg-white border shadow-md '>
                    <DateRange
                        editableDateInputs={true}
                        onChange={handleSelect}
                        moveRangeOnFirstSelection={false}
                        ranges={dateRange}
                    />

                    <div className='flex justify-between'>
                        <button
                            onClick={() => {
                                setclose((n) => !n);
                                setObjet({
                                    id_cp: id,
                                    status: status,
                                    start_time: formatDate(dateRange[0].startDate),
                                    end_time: formatDate(dateRange[0].endDate)
                                });
                            }}
                            className='p-2 text-white bg-blue-500 rounded'
                        >
                            Soumettre
                        </button> <button
                            onClick={() => {
                                setclose((n) => !n);
                                setObjet({
                                    id_cp: '',
                                    status: "",
                                    start_time: "",
                                    end_time: " "
                                });
                            }}
                            className='p-2 text-white bg-blue-500 rounded'
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            </div>)}




        </div>
    );
};

export default FilterHistoriqueStatusCP;
