import React, { Component } from 'react';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

class Search extends Component {
    state={
        searchInput: ""
    }
    onKeyDown = e => {
        console.log(e)
        if (e.keyCode === 13) {
            this.filterArray();
        } 
    }

    filterArray = () => {
        console.log('this.props.tweets:',this.props.tweets)
        console.log('this.state.searchInput:',this.state.searchInput)

        const res = this.props.tweets.filter(tweet => {
            return (tweet.tweet_text && tweet.tweet_text.includes(this.state.searchInput)) ||
            (tweet.user_handler && tweet.user_handler.includes(this.state.searchInput))  ||
            (tweet.user_name && tweet.user_name.includes(this.state.searchInput))
        });

        console.log('res:',res)

        this.props.returnFilteredArray(res);
    }

    onChange = e => {
        this.setState({
            searchInput: e.currentTarget.value
        },() =>{
            if (this.state.searchInput.length===0){
                this.props.cancelSearch()
            }
        });
    }

    render() {
        return (
            <div className='search' onKeyDown={(e) => this.onKeyDown(e)}>
                <div className='search_wrapper'>
                    <div className='search_icon btn' onClick={() => this.filterArray()}><SearchOutlinedIcon /></div>
                    <div className='search_input btn'><input type="text" placeholder="#food" onChange={(e) => this.onChange(e)} /></div>
                </div>
            </div>
        )
    }


}

export default Search