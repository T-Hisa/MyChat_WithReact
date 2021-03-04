import { Component } from "react";
import { renderImage } from "../../utils";

interface ChatOtherProps {
  body: string;
  defaultPhoto: string;
  photoURL: string;
}

class ChatOther extends Component<ChatOtherProps, {}> {
  render(): JSX.Element {
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
    );
  }
}

export default ChatOther;
