import React from 'react';
import './Notifications.scss';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const Notifications = ({ flags, pagination, tweetsCurrentArray, lastPage }) => {
    const { isSearchMode, isServerLive, isStreaming } = flags;
    const { currentPage  } = pagination;

    let serverStatusText = isServerLive ? 'online' : 'offline';
    let serverStatus = <span className='server_status'><FiberManualRecordIcon className={`blink ${serverStatusText}`} />Server is <span>{serverStatusText}</span></span>;
    let streamingStatus =  (
        <span className='streaming_status'>
            { isStreaming ? 
                <span>Streaming
                    <span className='dot'>.</span>
                    <span className='dot'>.</span>
                    <span className='dot'>.</span>
                </span>
                : <span>Streaming is <span className='paused'>Paused</span></span>
            }
        </span>

    ); 
    return (
        <div className='main_nav'>
            <span className='pagination_numbers'>Showing Page {currentPage} of {lastPage}  [Streamed {tweetsCurrentArray.length} Tweets]</span>
            <span className='notifications'>{serverStatus} | {streamingStatus} | <span className='mode'>Mode:</span> {isSearchMode ? 'Search Mode' : 'Live Feed'}</span>
        </div>
    )
};

export default Notifications;