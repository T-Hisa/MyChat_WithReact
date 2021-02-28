import React, { Component } from "react"

class ChatSelf extends Component {

  renderImage(url) {
    return <img src={url} alt="サムネイル"/>
  }
  render() {
    return (
      <div className="chat-container">
        <div className="chat-me chat-common">
          <p className="chat-wrapper"><span className="triangle"/>{this.props.body}</p>
        </div>
        <div className="img-me">
        {
          this.props.photoURL ?
            this.renderImage(this.props.photoURL) :
            this.renderImage(this.props.defaultPhoto)
        }
        </div>
      </div>
    )
  }
}

export default ChatSelf