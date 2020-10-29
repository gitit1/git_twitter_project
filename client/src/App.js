import React, { Component } from 'react';
import Header from './layouts/Header';
import Main from './layouts/Main';

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

const wsUrl = isLocalhost ? 'ws://localhost:3020' : 'ws://git_twitter_streamer.gititregev.com:3020';

const PAGINATION_LIMIT_DEFAULT = 5;

class App extends Component {
  ws;
  state = {
    flags: {
      isStreaming: true,
      isLoading: true,
      isServerLive: false,
      isSearchMode: false
    },
    pagination: {
      currentPage: 1,
      limit: PAGINATION_LIMIT_DEFAULT,
      newListFirstIndex: 0,
      newListLastIndex: PAGINATION_LIMIT_DEFAULT
    },
    tweetsArray: []
  }

  componentDidMount() { this.checkServerStatus(); }
  componentWillUnmount(){this.ws.onconnection = () => {this.ws.close()};}
  checkServerStatus = () => {
    this.setState({ flags: { isLoading: true } });
    this.ws = new WebSocket(wsUrl);

    setTimeout(() => {
      if (this.ws.readyState !== 1) {
        this.handleServerFlags(false, false, false);
        this.ws.onconnection = () => {
          this.ws.close(); //terminate this connection
        };
      } else {
        this.handleServerFlags(true, true, false);
        this.handleServerConnection();
      }
    }, 1500);
  }
  handleServerConnection = () => {
    this.ws.onclose = () => {
      this.handleServerFlags(false, false, false);
    };

    this.ws.onmessage = e => {
      if (this.state.flags.isStreaming) {
        const newTweet = JSON.parse(e.data);
        this.setState({
          tweetsArray: [newTweet, ...this.state.tweetsArray]
        })
      }
    };
  }
  handleServerFlags = (isStreaming, isServerLive, isLoading) => {
    this.setState({ flags: { ...this.state.flags, isStreaming, isServerLive, isLoading } });
  }

  handlePagination = (curr, newListFirstIndex, newListLastIndex) => {
    this.setState({ pagination: { ...this.state.pagination, currentPage: curr, newListFirstIndex, newListLastIndex } })
  }

  handleSearch = (results) => {
    this.setState({
      tweetsSearchArray: results,
      flags: { ...this.state.flags, isSearchMode: true },
      pagination: { ...this.state.pagination, currentPage: 1, limit: PAGINATION_LIMIT_DEFAULT, newListFirstIndex: 0, newListLastIndex: PAGINATION_LIMIT_DEFAULT }
    })
  }
  cancelSearch = () => { this.setState({ flags: { ...this.state.flags, isSearchMode: false } }) }

  toggleStreaming = (isStreaming) => { this.setState({ flags: { ...this.state.flags, isStreaming } }) }


  render() {
    const { tweetsArray, tweetsSearchArray, flags, pagination } = this.state;

    let tweetsCurrentArray = !flags.isSearchMode ? tweetsArray : tweetsSearchArray;
    const lastPage = tweetsCurrentArray.length > 0 ? Math.ceil(tweetsCurrentArray.length / pagination.limit) : 1;

    return (
        <div className='wrapper'>
          <Header flags={flags} pagination={pagination}
                  lastPage={lastPage} tweetsArray={tweetsArray} toggleStreaming={this.toggleStreaming}
                  handlePagination={this.handlePagination} checkServerStatus={this.checkServerStatus}
                  handleSearch={this.handleSearch} cancelSearch={this.cancelSearch} />
          <Main   flags={flags} pagination={pagination} tweetsCurrentArray={tweetsCurrentArray} lastPage={lastPage}/>
        </div>
    )
  }
}

export default App
