import React from 'react';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';

const StreamingBtn = (props) => {
    const { isServerLive, isLoading } = props.flags;
    return (
        <div className={isServerLive || isLoading ? 'refreshBtn disabled' : 'refreshBtn'} onClick={() => props.onClick()}>
            <div className='btn'>
                <RefreshOutlinedIcon />
            </div>
        </div>
    )
};

export default StreamingBtn;