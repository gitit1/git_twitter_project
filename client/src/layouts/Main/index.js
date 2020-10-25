import React, { Component } from 'react';
import TwitterFeed from './components/TwitterFeed';
import Notifications from './components/Notifications';
import Loader from '../../components/Loader';
import ErrorNotification from '../../components/ErrorNotification';

import './Main.scss';

class Main extends Component {

    render() {
        const { tweetsCurrentArray, lastPage } = this.props;
        const { isLoading, isServerLive, isSearchMode } = this.props.flags;
        const { newListFirstIndex, newListLastIndex } = this.props.pagination;

        return (
            <main>
                {
                    isLoading ?
                        <Loader />
                        :
                        <React.Fragment>
                            <Notifications flags={this.props.flags} pagination={this.props.pagination} tweetsCurrentArray={this.props.tweetsCurrentArray} lastPage={lastPage}/>
                            { isServerLive || (!isServerLive && tweetsCurrentArray.length > 0) ? 
                                <TwitterFeed tweets={tweetsCurrentArray.slice(newListFirstIndex, newListLastIndex)} /> 
                                : (isSearchMode && tweetsCurrentArray.length === 0) ?
                                    <ErrorNotification errorMsg="Didn't Find Any Matching Tweets" />    
                                :                            
                                    <ErrorNotification errorMsg="Server is Down, Please retry later" />                                
                            }
                        </React.Fragment>
                }
            </main>
        )

    }
}

export default Main