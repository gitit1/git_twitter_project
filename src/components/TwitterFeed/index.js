import React from 'react';
import {Grid, Paper} from '@material-ui/core';
import './TwitterFeed.scss';
import Typography from '@material-ui/core/Typography';

const TwitterFeed = ({tweets}) => {   
    return(
        <Grid container spacing={1} className='twitter_feed'>
        {tweets.map(tweet => (
            <Grid item xs={12}  key={tweet.tweet_id}>
                <div className='root'>
                    <Paper className='paper'>
                    <Grid container spacing={2}>
                        <Grid item>
                            {/* <ButtonBase className='image'> */}
                                <img className='img' alt="complex" src={tweet.user_profile_image}/>
                            {/* </ButtonBase> */}
                        </Grid>
                        <Grid item xs={12} sm container >
                            <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                {tweet.user_handler}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                {tweet.tweet_text}
                                </Typography>
                            </Grid>
                            </Grid>
                            <Grid item>
                            <Typography variant="subtitle1">{tweet.created_at}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    </Paper>
                </div>
            </Grid>
        ))}
        </Grid>
    )
};

export default TwitterFeed;