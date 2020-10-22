import React from 'react';
import './StreamingBTN.scss'
import {PlayArrowOutlined, StopOutlined} from '@material-ui/icons';

const StreamingBTN = ({isStreaming, toggleStreaming}) => {   
    return(
        isStreaming  ?
            <div className='stop btn' onClick={()=>toggleStreaming(false)}>
                <StopOutlined />
            </div>
        :
            <div className='play btn' onClick={()=>toggleStreaming(true)}>
                <PlayArrowOutlined />
            </div>
    )
};

export default StreamingBTN;