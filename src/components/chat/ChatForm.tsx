import React, { Component, KeyboardEvent } from "react";
import { connect } from "react-redux";

import SendChatProps from "../../types/SendChat";
import BaseState, { CurrentUserState, DirectChatDataState } from "../../types/state"

interface MapStateToProps {
  currentUser?: CurrentUserState
  currentUserId?: string
  directChat?: DirectChatDataState
}

interface ChatFormProps extends MapStateToProps {
  groupId?: string;
  handleClick: (data: SendChatProps) => void;
  otherUserId?: string;
}

interface ChatFormState {
  body: string;
  errorFlag: boolean;
  errorMessage: string;
}

class ChatForm extends Component<ChatFormProps, ChatFormState> {
  textareaRef: React.RefObject<HTMLTextAreaElement>;

  constructor(props: ChatFormProps) {
    super(props);
    this.state = {
      errorMessage: "入力してください",
      errorFlag: false,
      body: "",
    };
    this.textareaRef = React.createRef();
  }

  onInputTextarea(e: KeyboardEvent<HTMLTextAreaElement>): void {
    const body: string = e.currentTarget.value;
    const textarea: HTMLTextAreaElement = this.textareaRef.current!;
    const height: number = textarea.scrollHeight;
    const flagNumber: number = Math.round(height / 24);
    if (flagNumber < 4) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
    const errorMessage: string = this.handleCommentError(body);
    this.setState({ body, errorMessage });
  }

  handleCommentError(comment: string): string {
    if (comment) return "";
    else return "入力してください";
  }

  onClickSendBtn(): void {
    if (!!this.state.body) {
      const sendData: SendChatProps = {
        currentUserId: this.props.currentUserId!,
        otherUserId: this.props.otherUserId,
        groupId: this.props.groupId,
        body: this.state.body,
      };
      this.props.handleClick(sendData);
      this.setState({
        body: "",
      });
    } else {
      this.setState({ errorFlag: true });
    }
  }

  render(): JSX.Element {
    return (
      <div className="chat-form-container">
        {!!this.state.errorMessage && this.state.errorFlag && (
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

const mapStateToProps = (state: BaseState): MapStateToProps => ({
  currentUserId: state.currentUserId,
  currentUser: state.currentUser,
  directChat: state.directChat,
});

export default connect(mapStateToProps)(ChatForm);
