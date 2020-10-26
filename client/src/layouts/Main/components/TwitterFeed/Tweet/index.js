import React from 'react';
import { Grid } from '@material-ui/core';

import TweetProfileImageSection from './components/TweetProfileImageSection';
import TweetHeaderSection from './components/TweetHeaderSection';
import TweetTextSection from './components/TweetTextSection';
import TweetMediaSection from './components/TweetMediaSection';

import './Tweet.scss';

const Tweet = ({ tweet, feedLength, index }) => {
    const tweetClass = feedLength === 1 || feedLength - 1 === index ? 'twitter_wrapper twitter_wrapper_full_border' : 'twitter_wrapper';
    const hasMedia = tweet.tweet_media !== undefined && tweet.tweet_media.length > 0;                                                

    return (
        <Grid container className={tweetClass}>
            <TweetProfileImageSection src={tweet.user_profile_image}/>

            <Grid item xs={11} className='twitter_data_section'>
                <TweetHeaderSection userName={tweet.user_name} handler={tweet.user_handler} date={tweet.tweet_date}/>
                <TweetTextSection tweetTextData={tweet.tweet_text} tweetLinks={tweet.tweet_links} hasMedia={hasMedia}/>
                {tweet.tweet_media && tweet.tweet_media.length > 0 && <TweetMediaSection tweetMediaData={tweet.tweet_media} tweetId={tweet.tweet_id}/>}
            </Grid>
        </Grid>
    )
};

export default Tweet;