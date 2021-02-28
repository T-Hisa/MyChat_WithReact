import React, { Component } from "react"
import { connect } from "react-redux"

class ChatForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMessage: "",
      body: ""
    }
    this.textareaRef = React.createRef()
  }

  onInputTextarea(e) {
    const body = e.target.value
    const textarea = this.textareaRef.current
    const height = textarea.scrollHeight
    const flag = Math.round(height / 24)
      if (flag < 4) {
        textarea.style.height = 'auto'
        textarea.style.height = textarea.scrollHeight + 'px'
      }
    this.setState({body})
  }

  onClickSendBtn() {
    const sendData = {
      currentUserId: this.props.currentUser.currentUserId,
      otherUserId: this.props.otherUserId,
      groupId: this.props.groupId,
      body: this.state.body
    }
    this.props.handleClick(sendData)
  }

  // componentDidMount() {
  // }

  render() {
    return (
      <div className="chat-form-container">
        {!!this.errorMessage && (
          <label className="text-danger label-text" htmlFor="chat">
            {this.state.errorMessage}
          </label>
        )}
        <div className="chat-form-wrapper">
          <textarea
            className="chat-form"
            name="chat"
            id="chat"
            rows="1"
            onInput={this.onInputTextarea.bind(this)}
            ref={this.textareaRef}
          ></textarea>
          <button onClick={this.onClickSendBtn.bind(this)} className="btn btn-info chat-submit-btn">送信</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  directChat: state.directChat,
})

export default connect(mapStateToProps, null)(ChatForm)
