import React, { Component } from 'react';
import TwitterFeed from './components/TwitterFeed';
import Pagination from './components/Pagination/Pagination';
import StreamingBTN from './components/StreamingBTN';
import Logo from './components/Logo';
import Loader from './components/Loader';
import Search from './components/Search';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
// import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

const wsUrl = isLocalhost ? 'ws://localhost:3001' : 'ws://git_twitter_stream.gititregev.com:3001';

const PAGINATION_LIMIT_DEFAULT = 5;

class App extends Component {
  ws;
  state = {
    isStreaming: true,
    isLoading: true,
    isServerLive: false,
    isSearchMode: false,
    pagination: {
      currentPage: 1,
      limit: PAGINATION_LIMIT_DEFAULT,
      newListFirstIndex: 0,
      newListLastIndex: PAGINATION_LIMIT_DEFAULT
    },
    tweetsArray: [],
    tweetsSearchArray: []
  }

  componentDidMount() {
    this.checkServerConnection();
  }

  checkServerConnection() {
    console.log('checkServerConnection')
      this.setState({isLoading: true});
      this.ws =  new WebSocket(wsUrl);
      setTimeout(() => {
        if (this.ws.readyState !== 1) {
          this.setState({ isStreaming: false, isServerLive: false, isLoading: false });
        } else {
          this.setState({ isStreaming: true, isServerLive: true, isLoading: false  })
          this.getTweetsFromServer();
          // this.ws.onerror = function(err) {
          //   console.error('Socket encountered error: ', err.message, 'Closing socket');
          //   this.ws.close();
          //   this.setState({ isStreaming: false, isServerLive: false, isLoading: false });
          // };
        }
      }, 1500);
  }

  componentWillUnmount() {
    this.ws.close();
  }

  getTweetsFromServer = () => {
    this.ws.onmessage = e => {
      if (this.state.isStreaming) {
        const newTweet = JSON.parse(e.data);

        this.setState({
          tweetsArray: [newTweet, ...this.state.tweetsArray]
        })

      }
    };
  }

  
  handlePagination = (arrow) => {
    const { currentPage, limit } = this.state.pagination;
    
    let curr = (arrow === 'prev') ? currentPage - 1 : currentPage + 1;
    
    let newListFirstIndex = (curr === 1) ? 0 : (curr * limit) - limit;
    let newListLastIndex = (curr === 1) ? limit : (curr * limit);
    
    this.setState({
      pagination: {
        ...this.state.pagination,
        currentPage: curr,
        newListFirstIndex,
        newListLastIndex
      }
    })
  }

  handleSearch= (results) => {
    console.log(results)
    this.setState({
      isSearchMode: true,
      tweetsSearchArray: results,
      pagination: {
        ...this.state.pagination,
        currentPage: 1,
        limit: PAGINATION_LIMIT_DEFAULT,
        newListFirstIndex: 0,
        newListLastIndex: PAGINATION_LIMIT_DEFAULT
      }
    })
  }

  cancelSearch = () => {this.setState({isSearchMode:false})}
  toggleStreaming = (isStreaming) => { this.setState({ isStreaming: isStreaming })}

  render() {
    const { isStreaming, isServerLive, isLoading, isSearchMode, tweetsArray, tweetsSearchArray, } = this.state;
    const { currentPage, limit, newListFirstIndex, newListLastIndex } = this.state.pagination;
    
    let tweetsCurrentArray = !isSearchMode ? tweetsArray : tweetsSearchArray;
    const lastPage = tweetsCurrentArray.length > 0 ? Math.ceil(tweetsCurrentArray.length / limit) : 1;


    return (
      <div className='wrapper'>
        <header>
          <div className='nav_left'>
            <div className='pagination'><Pagination currentPage={currentPage} lastPage={lastPage} handlePagination={this.handlePagination} /></div>
            <div className='streamingBtn'><StreamingBTN isStreaming={isStreaming} toggleStreaming={this.toggleStreaming} /></div>
            <div className={isServerLive ? 'refreshBtn disabled' : 'refreshBtn'} onClick={() => this.checkServerConnection()}><div className='btn'><RefreshOutlinedIcon /></div></div>
          </div>
          <div className='nav_middle'>
            <div className='logo' onClick={() => window.location.reload()}><Logo /></div>
          </div>
          <div className='nav_right'>
            <Search tweets={tweetsArray} returnFilteredArray={this.handleSearch} cancelSearch={this.cancelSearch}/>
          </div>
        </header>
        <main>
          {
            isLoading ?
              <Loader />
              :
              <React.Fragment>
                <div className='main_nav'>
                  <span className='pagination_numbers'>Showing Page {currentPage} of {lastPage}  [Streamed {tweetsCurrentArray.length} Tweets]</span>
                  <span className='server_status'>Server is {isServerLive ? 'Online': 'Offline'} | {isStreaming ? 'Streaming...' : 'Streaming is Paused'} | {isSearchMode ? 'Search Mode' : 'Live Feed'}</span>
                </div>
                {isServerLive ? <TwitterFeed tweets={tweetsCurrentArray.slice(newListFirstIndex, newListLastIndex)} /> : <span className="error"><h1>Server is Down, Please retry later</h1></span>}
              </React.Fragment>
          }

        </main>
        {/* <footer>
          this is a footer
        </footer> */}
      </div>
    )
  }
}

export default App
