import React from 'react';
import {PlayArrowOutlined, StopOutlined} from '@material-ui/icons';

const StreamingBtn = ({isStreaming, toggleStreaming}) => {   
    return(
        <div className='streamingBtn'>
            {
                isStreaming  ?
                    <div className='stop btn' onClick={()=>toggleStreaming(false)}>
                        <StopOutlined />
                    </div>
                :
                    <div className='play btn' onClick={()=>toggleStreaming(true)}>
                        <PlayArrowOutlined />
                    </div>
            }
        </div>
    )
};

export default StreamingBtn;