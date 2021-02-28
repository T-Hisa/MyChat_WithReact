import React, {Component} from "react"

class ChatOther extends Component {
  renderImage(url) {
    return <img src={url} alt="サムネイル"/>
  }

  render() {
    return (
      <div className="chat-container">
        <div className="img-other">
          {
            this.props.photoURL ?
              this.renderImage(this.props.photoURL) :
              this.renderImage(this.props.defaultPhoto)
          }
        </div>
        <div className="chat-other chat-common">
          <p className="chat-wrapper">{this.props.body}<span className="triangle"/></p>
        </div>
      </div>
    )
  }
}

export default ChatOther