
import React, { Component } from 'react';

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );
  
  const wsUrl = isLocalhost ? 'ws://localhost:3001' : 'ws://git_chat_room.gititregev.com:3001';
  console.log(wsUrl)
  
  class TwitterFeed extends Component {

    ws = new WebSocket(wsUrl);
    
    componentDidMount() {
        this.ws.onmessage = e => {
            console.log('got msg: ', e.data)
        }

        this.ws.onclose = () => {
            this.setState({
                ws: new WebSocket(wsUrl),
            })
        }
    }

    render() {
        return (
            <div>testing the page</div>
        )
    }
}

export default TwitterFeed
