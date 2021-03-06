import { Component } from "react";
import { connect } from "react-redux";
import ChatForm from "../../components/chat/ChatForm";
import ChatSelf from "../../components/chat/ChatSelf";
import ChatOther from "../../components/chat/ChatOther";
import { sendDirectChat } from "../../actions/directChat";
import { renderImage } from "../../utils";

import SendChatProps from "../../types/SendChat";
import RouteProps from "../../types/RouteProps";
import UserProps from "../../types/models/User";
import { DirectChatProps as DirectChatDataProps } from "../../types/models/Chat";

import BaseState, {
  UsersState,
  CurrentUserState,
  DirectChatDataState,
} from "../../types/state";

interface MapStateToProps {
  currentUser: CurrentUserState;
  currentUserId: string;
  defaultPhoto: string;
  directChat: DirectChatDataState;
  users: UsersState;
}

interface MapDispatchToProps {
  sendDirectChat: (data: SendChatProps) => void;
}

type DirectChatProps = RouteProps & MapStateToProps & MapDispatchToProps;

class DirectChat extends Component<DirectChatProps, {}> {
  userInfo(): UserProps | null {
    if (this.props.users) return this.props.users[this.otherUserId()];
    return null;
  }

  otherUserId(): string {
    return this.props.match.params.userId;
  }

  currentUserInfo(): UserProps {
    return this.props.currentUser!;
  }

  directChatIds(): Array<string> {
    return Object.keys(this.props.directChat || {}).reverse();
  }

  isMe(cid: string): boolean {
    return this.getChat(cid).which === "me";
  }

  getChat(cid: string): DirectChatDataProps {
    return this.props.directChat![cid];
  }

  handleClicKSendBtn(data: SendChatProps): void {
    this.props.sendDirectChat(data);
  }

  renderChat(cid: string): JSX.Element {
    return (
      <div key={cid}>
        {this.isMe(cid) ? (
          <ChatSelf
            photoURL={(this.currentUserInfo() || {}).photoURL!}
            defaultPhoto={this.props.defaultPhoto}
            body={this.getChat(cid).body}
          />
        ) : (
          <ChatOther
            photoURL={(this.userInfo() || {}).photoURL!}
            defaultPhoto={this.props.defaultPhoto}
            body={this.getChat(cid).body}
          />
        )}
      </div>
    );
  }

  render(): JSX.Element {
    return (
      <div className="chat-whole-container">
        <div className="title-wrapper">
          ユーザー:
          <div className="user-wrapper">
            {this.userInfo()?.photoURL
              ? renderImage(this.userInfo()?.photoURL!)
              : renderImage(this.props.defaultPhoto)}
            <span className="name">{this.userInfo()?.username}</span>
          </div>
        </div>
        <div className="chat-whole-wrapper">
          {this.directChatIds().map((cid) => this.renderChat(cid))}
        </div>
        <ChatForm
          otherUserId={this.otherUserId()}
          handleClick={this.handleClicKSendBtn.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = (
  state: BaseState,
  props: RouteProps
): MapStateToProps => {
  const currentUserId: string = state.currentUserId!;
  const otherUserId: string = props.match.params.userId;
  let directChat: DirectChatDataState = null;
  if (state.directChat)
    directChat = (state.directChat[currentUserId] || {})[otherUserId] || null;
  return {
    currentUser: state.currentUser,
    currentUserId,
    defaultPhoto: state.defaultPhoto,
    directChat,
    users: state.users,
  };
};

const mapDispatchToProps: MapDispatchToProps = { sendDirectChat };

export default connect(mapStateToProps, mapDispatchToProps)(DirectChat);
