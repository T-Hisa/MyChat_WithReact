import React, { Component, KeyboardEvent } from "react";
import { connect } from "react-redux";

import SendChatProps from "../../types/SendChat"

interface ChatFormProps {
  otherUserId?: string;
  groupId?: string;
  handleClick: Function;

  currentUser?: any;
  directChat?: any;
}

interface ChatFormState {
  errorMessage: string;
  body: string;
}

class ChatForm extends Component<ChatFormProps, ChatFormState> {
  textareaRef: React.RefObject<HTMLTextAreaElement>;

  constructor(props: ChatFormProps) {
    super(props);
    this.state = {
      errorMessage: "",
      body: "",
    };
    this.textareaRef = React.createRef();
  }

  onInputTextarea(e: KeyboardEvent<HTMLTextAreaElement>) {
    const body: string = e.currentTarget.value;
    const textarea: HTMLTextAreaElement = this.textareaRef.current!;
    const height: number = textarea.scrollHeight;
    const flagNumber: number = Math.round(height / 24);
    if (flagNumber < 4) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
    this.setState({ body });
  }

  onClickSendBtn() {
    const sendData: SendChatProps = {
      currentUserId: this.props.currentUser.currentUserId,
      otherUserId: this.props.otherUserId,
      groupId: this.props.groupId,
      body: this.state.body,
    };
    this.props.handleClick(sendData);
    this.setState({
      body: "",
    });
  }

  render() {
    return (
      <div className="chat-form-container">
        {!!this.state.errorMessage && (
          <label className="text-danger label-text" htmlFor="chat">
            {this.state.errorMessage}
          </label>
        )}
        <div className="chat-form-wrapper">
          <textarea
            className="chat-form"
            name="chat"
            id="chat"
            rows={1}
            onInput={this.onInputTextarea.bind(this)}
            ref={this.textareaRef}
            value={this.state.body}
          ></textarea>
          <button
            onClick={this.onClickSendBtn.bind(this)}
            className="btn btn-info chat-submit-btn"
          >
            送信
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  directChat: state.directChat,
});

export default connect(mapStateToProps, null)(ChatForm);