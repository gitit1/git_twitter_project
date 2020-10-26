import React from 'react';
import { Grid } from '@material-ui/core';
import './TweetProfileImageSection.scss';

const TweetProfileImageSection = ({ src }) => {
    return (
        <Grid item xs={1} className='twitter_profie_image_section'>
            <img className='img' alt="Profile" src={src} />
        </Grid>
    )
};

export default TweetProfileImageSection;