import React, { Component } from 'react';

import Pagination from './components/Pagination';
import StreamingBtn from './components/StreamingBtn';
import RefreshBtn from './components/RefreshBtn';
import Logo from './components/Logo';
import Search from './components/Search';

import './Header.scss';

class Header extends Component {
    
    calculatePagination = (arrow) =>{
        const { currentPage, limit } = this.props.pagination;
    
        let curr = (arrow === 'prev') ? currentPage - 1 : currentPage + 1;
        
        let newListFirstIndex = (curr === 1) ? 0 : (curr * limit) - limit;
        let newListLastIndex = (curr === 1) ? limit : (curr * limit);

        this.props.handlePagination(curr, newListFirstIndex, newListLastIndex);
    }

    render() {
        const { pagination, lastPage, tweetsArray } = this.props;
        const { isStreaming } = this.props.flags;

        return (
            <header>
                <div className='nav_left'>
                    <Pagination currentPage={pagination.currentPage} lastPage={lastPage} handlePagination={this.calculatePagination} />
                    <StreamingBtn isStreaming={isStreaming} toggleStreaming={this.props.toggleStreaming} />
                    <RefreshBtn flags={this.props.flags} onClick={this.props.checkServerStatus}/>
                </div>
                <div className='nav_middle'>
                    <Logo />
                </div>
                <div className='nav_right'>
                    <Search flags={this.props.flags} tweets={tweetsArray} returnFilteredArray={this.props.handleSearch} cancelSearch={this.props.cancelSearch} />
                </div>
            </header>
        )

    }
}

export default Header