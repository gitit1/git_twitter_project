import React from 'react';
import twitterImg from '../../../../assets/twitter.png';
import './Logo.scss'

const Logo = () => {   
    return(
        <div className='logo'  onClick={() => window.location.reload()}>
            <img src={twitterImg} alt="Logo"/>
            <span>Git's Twitter Streamer</span>
        </div>
    )
};

export default Logo;
