import React from 'react';
import { Grid } from '@material-ui/core';
import './TweetHeaderSection.scss';

const getDate = (date) => {
    date = new Date(date);
    let dd = date.getDate(), mm = date.getMonth() + 1, yyyy = date.getFullYear();
    let hour = date.getHours(), min = date.getMinutes(), sec = date.getSeconds()

    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }
    if (min < 10) { min = '0' + min }
    return `${mm}\\${dd}\\${yyyy} - ${hour}:${min}:${sec}`;
}

const TweetHeaderSection = ({ userName, handler, date }) => {
    return (
        <Grid container className='twitter_data_section_header' justify="space-between">
            <span>
                <span className='twitter_data_user_name'>{userName}</span>
                <span className='twitter_data_user_handler'>@{handler}</span>
            </span>
            <span className='twitter_data_date'>[{getDate(date)}]</span>
        </Grid>
    )
};

export default TweetHeaderSection;