import React from 'react';
import twitterImg from '../../../../assets/twitter.png';
import './Logo.scss'

const Logo = () => {   
    return(
        <div className='logo'  onClick={() => window.location.reload()}>
            <img src={twitterImg} alt="Logo"/>
            <span>GrubHub Twitter Assignment</span>
        </div>
    )
};

export default Logo;