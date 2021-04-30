import React, { Component } from "react"
import { renderImage } from "../../utils"

class ChatOther extends Component {
  render() {
    return (
      <div className="chat-container">
        <div className="img-other">
          {this.props.photoURL
            ? renderImage(this.props.photoURL)
            : renderImage(this.props.defaultPhoto)}
        </div>
        <div className="chat-other chat-common">
          <p className="chat-wrapper">
            {this.props.body}
            <span className="triangle" />
          </p>
        </div>
      </div>
    )
  }
}

export default ChatOther
