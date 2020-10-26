import React from 'react';
import { Grid } from '@material-ui/core';
import './TweetTextSection.scss';

const convertTextMsgToHTML = (text, linksArray) => {
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


const TweetTextSection = ({ tweetTextData, tweetLinks, hasMedia }) => {
    const textAsObject = tweetTextData.replace(/[\n\r]/g, ' <br/> ').split(' ');
    const hasLinks = tweetLinks !== undefined && tweetLinks.length > 0;

    return (
        <Grid container className='twitter_data_section_text'>
            {tweetTextData && (
                <div>
                    {
                        textAsObject.map((t, index) => (
                            !(!hasLinks && t.includes('https://')) &&
                            !(hasMedia && (index + 1 === textAsObject.length)) &&
                            convertTextMsgToHTML(t, tweetLinks)
                        ))
                    }
                </div>
            )}
        </Grid>
    )
};

export default TweetTextSection;