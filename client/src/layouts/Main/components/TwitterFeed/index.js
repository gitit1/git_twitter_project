import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import SimpleReactLightbox from 'simple-react-lightbox';

import Tweet from './Tweet/';
import './TwitterFeed.scss';

class TwitterFeed extends Component {

    render() {
        const { tweets } = this.props;

        return (
            
                <div className='twitter_feed'>
                    <Grid container spacing={1}>
                        {tweets.map((tweet, index) => (
                        <SimpleReactLightbox key={tweet.tweet_id}>
                            <Tweet index={index} tweet={tweet} feedLength={tweets.length}/>
                        </SimpleReactLightbox>))}
                    </Grid>
                </div>
        )
    }
}

export default TwitterFeed;