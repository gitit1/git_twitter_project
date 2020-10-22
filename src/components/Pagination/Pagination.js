import React from 'react';
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons';
import './Pagination.scss'

const Pagination = ({ currentPage, lastPage, handlePagination }) => {
    return (
        <div className='pagination'>
            <div className={(currentPage === 1) ? 'left_arrow btn disabled' : 'left_arrow btn'} onClick={() => handlePagination('prev')}>
                <ArrowBackIosOutlined />
            </div>
            <div className={(currentPage === lastPage) ? 'right_arrow btn disabled' : 'left_arrow btn'} onClick={() => handlePagination('next')}>
                <ArrowForwardIosOutlined />
            </div>
        </div>
    )
};

export default Pagination;