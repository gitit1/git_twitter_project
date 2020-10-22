import React from 'react';
import twitterImg from './twitter.png';
import './Logo.scss'

const Logo = () => {   
    return(
        <div className='Logo'>
            <img src={twitterImg} alt="Logo"/>
            <span>GrubHub Twitter Assignment</span>
        </div>
    )
};

export default Logo;