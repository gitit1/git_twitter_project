import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

import Tweet from './Tweet/'
import './TwitterFeed.scss';

class TwitterFeed extends Component {

    render() {
        const { tweets } = this.props;

        return (
            <div className='twitter_feed'>
                <Grid container spacing={1}>
                    {tweets.map((tweet, index) => (<Tweet index={index} tweet={tweet} feedLength={tweets.length} key={tweet.tweet_id}/>))}
                </Grid>
            </div>
        )
    }
}

export default TwitterFeed;