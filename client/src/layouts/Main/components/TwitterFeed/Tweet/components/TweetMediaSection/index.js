import React from 'react';
import { Grid } from '@material-ui/core';
import ReactPlayer from "react-player";
import './TweetMediaSection.scss';

import { SRLWrapper } from 'simple-react-lightbox'

const convertMediaToHTML = (media) => {
    switch (media.type) {
        case 'animated_gif':
            return (
            <ReactPlayer url={media.video_info['variants'][0].url}
                playsinline={true}
                playing={true}
                controls={true}
                loop={true}>
            </ReactPlayer> )
        case 'video': 
            return (
            <ReactPlayer url={media.video_info['variants'][0].url}
                playsinline={true}
                playing={false}
                controls={true}
                loop={true}>
            </ReactPlayer> )
        case 'photo':
            return <img src={media.media_url} alt={media.id_str} />
        default:
            break;
    }
}


const TweetMediaSection = ({ tweetMediaData, tweetId }) => {

    return (
        <Grid container className='twitter_data_section_media' direction="row" justify="flex-start">
            <div className={`twitter_data_section_media_item_container`}>
                <SRLWrapper>
                    <div className={`data_images_order_${tweetMediaData.length}`}>
                        {tweetMediaData.length !== 3 && tweetMediaData.map((media, imgIndex) => (//3 images has special stracture 
                            <div className={`tweet_img image_${imgIndex + 1}`} key={`${tweetId}-${imgIndex}`}>{convertMediaToHTML(media)}</div>
                        ))}
                    </div>
                    {tweetMediaData.length === 3 &&
                        <div className='data_images_order_3'>
                            <div className={`tweet_img image_1`}>{convertMediaToHTML(tweetMediaData[0])}</div>
                            <div className='data_images_order_3_inside_container'>
                                <div className={`tweet_img image_2`}>{convertMediaToHTML(tweetMediaData[1])}</div>
                                <div className={`tweet_img image_3`}>{convertMediaToHTML(tweetMediaData[2])}</div>
                            </div>
                        </div>
                    }
                </SRLWrapper>
            </div>
        </Grid>
    )
};

export default TweetMediaSection;