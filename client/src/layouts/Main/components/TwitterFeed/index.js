import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import ReactPlayer from "react-player";
import './TwitterFeed.scss';

class TwitterFeed extends Component {

    convertTextMsgToHTML = (text, linksArray) => {
        if (text.includes('https://t.co')) {
            const linkIndex = linksArray.find(link => link.url === text);
            const newLink = linkIndex && linkIndex.expanded_url ? linkIndex.display_url : linksArray[0].expanded_url

            return <a className='tweeter_link' target='_blank' rel="noopener noreferrer" href={text}>{newLink}</a>
        }
        if (text === '<br/>') { return <br /> }
        if (text.charAt(0) === '#') {
            return <a className='tweeter_link' target='_blank' rel="noopener noreferrer" href={`https://twitter.com/search?q=${text.replace(text.charAt(0), '%23')}`}>{text} </a>
        }
        if (text.charAt(0) === '@') {
            return <a className='tweeter_link' target='_blank' rel="noopener noreferrer" href={`https://twitter.com/search?q=${text.replace(text.charAt(0), '%40')}`}>{text} </a>
        }
        return `${text.replace('&gt;', '>')} `;
    }

    convertMediaToHTML = (media) => {
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
                    playing={true}
                    controls={true}
                    loop={true}>
                </ReactPlayer> )
            case 'photo':
                return <img src={media.media_url} alt={media.id_str} />
            default:
                break;
        }
    }

    getDate = (date) => {
        date = new Date(date);
        let dd = date.getDate(), mm = date.getMonth() + 1, yyyy = date.getFullYear();
        let hour = date.getHours(), min = date.getMinutes(), sec = date.getSeconds()

        if (dd < 10) { dd = '0' + dd }
        if (mm < 10) { mm = '0' + mm }
        if (min < 10) { min = '0' + min }
        return `${mm}\\${dd}\\${yyyy} - ${hour}:${min}:${sec}`;
    }

    render() {
        const { tweets } = this.props;

        return (
            <div className='twitter_feed'>
                <Grid container spacing={1}>
                    {tweets.map((tweet, index) => {
                        const tweetClass = tweets.length === 1 || tweets.length - 1 === index ? 'twitter_wrapper twitter_wrapper_full_border' : 'twitter_wrapper';
                        const hasMedia = tweet.tweet_media !== undefined && tweet.tweet_media.length > 0;
                        const hasLinks = tweet.tweet_links !== undefined && tweet.tweet_links.length > 0;
                        const textAsObject = tweet.tweet_text.replace(/[\n\r]/g, ' <br/> ').split(' ');

                        return (
                            <Grid container key={tweet.tweet_id} className={tweetClass}>
                                <Grid item xs={1} className='twitter_profie_image_section'>
                                    <img className='img' alt="Profile" src={tweet.user_profile_image} />
                                </Grid>
                                <Grid item xs={11} className='twitter_data_section'>
                                    <Grid container className='twitter_data_section_header' justify="space-between">
                                        <span>
                                            <span className='twitter_data_user_name'>{tweet.user_name}</span>
                                            <span className='twitter_data_user_handler'>@{tweet.user_handler}</span>
                                        </span>
                                        <span className='twitter_data_date'>[{this.getDate(tweet.tweet_date)}]</span>
                                    </Grid>
                                    <Grid container className='twitter_data_section_text'>
                                        {tweet.tweet_text && (
                                            <div>
                                                {
                                                    textAsObject.map((t, index) => (
                                                        !(!hasLinks && t.includes('https://')) &&
                                                        !(hasMedia && (index + 1 === textAsObject.length)) &&
                                                        this.convertTextMsgToHTML(t, tweet.tweet_links)
                                                    ))
                                                }
                                            </div>
                                        )}
                                    </Grid>
                                    {tweet.tweet_media && tweet.tweet_media.length > 0 &&
                                        <Grid container className='twitter_data_section_media' direction="row" justify="flex-start">
                                            <div className={`twitter_data_section_media_item_container`}>
                                                <div className={`data_images_order_${tweet.tweet_media.length}`}>
                                                    {tweet.tweet_media.length !== 3 && tweet.tweet_media.map((media, index) => (//3 images has special stracture 
                                                        <div className={`tweet_img image_${index + 1}`}>{this.convertMediaToHTML(media)}</div>

                                                    ))}
                                                </div>
                                                {tweet.tweet_media.length === 3 &&
                                                    <div className='data_images_order_3'>
                                                        <div className={`tweet_img image_1`}>{this.convertMediaToHTML(tweet.tweet_media[0])}</div>
                                                        <div className='data_images_order_3_inside_container'>
                                                            <div className={`tweet_img image_2`}>{this.convertMediaToHTML(tweet.tweet_media[1])}</div>
                                                            <div className={`tweet_img image_3`}>{this.convertMediaToHTML(tweet.tweet_media[2])}</div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </Grid>
                                    }
                                </Grid>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        )
    }
}
// const  = ({tweets}) => {   
//     return(
//         <Grid container spacing={1} className='twitter_feed'>
//         {tweets.map(tweet => (
//             <Grid item xs={12}  key={tweet.tweet_id}>
//                 {/* <div className='root'> */}
//                     {/* <Paper className='paper'> */}
//                         {/* <Grid className='inside_' container spacing={2}> */}
//                             {/* <Grid item>
//                             </Grid> */}
//                             <Grid item xs={12} sm container className='tweet'>
//                                 <img className='img' alt="complex" src={tweet.user_profile_image}/>
//                                 <Grid item xs container direction="column" spacing={2}>
//                                 <Grid item xs>
//                                     <Typography gutterBottom variant="subtitle1">
//                                     {tweet.user_handler}
//                                     </Typography>
//                                     <Typography variant="body2" gutterBottom>
//                                     {tweet.tweet_text}
//                                     </Typography>
//                                 </Grid>
//                                 </Grid>
//                                 <Grid item>
//                                 <Typography variant="subtitle1">{tweet.created_at}</Typography>
//                                 </Grid>
//                             </Grid>
//                         {/* </Grid> */}
//                     {/* </Paper> */}
//                 {/* </div> */}
//             </Grid>
//         ))}
//         </Grid>
//     )
// };

export default TwitterFeed;