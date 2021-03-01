import React, { Component } from "react"
import { renderImage } from "../../utils"

class ChatSelf extends Component {

  render() {
    return (
      <div className="chat-container">
        <div className="chat-me chat-common">
          <p className="chat-wrapper"><span className="triangle"/>{this.props.body}</p>
        </div>
        <div className="img-me">
        {
          this.props.photoURL ?
            renderImage(this.props.photoURL) :
            renderImage(this.props.defaultPhoto)
        }
        </div>
      </div>
    )
  }
}

export default ChatSelf