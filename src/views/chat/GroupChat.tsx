import { Component } from "react";
import { connect } from "react-redux";
import ChatForm from "../../components/chat/ChatForm";
import ChatSelf from "../../components/chat/ChatSelf";
import ChatOther from "../../components/chat/ChatOther";
import { renderImage } from "../../utils";
import { sendGroupChat } from "../../actions/groupChat";

import { GroupChatProps as GroupChatModelProps } from "../../types/models/Chat";
import UserProps from "../../types/models/User";
import GroupProps from "../../types/models/Group";
import RouteProps from "../../types/RouteProps";
import SendChatProps from "../../types/SendChat";
import BaseState, {
  CurrentUserState,
  GroupChatDataState,
  GroupsState,
  UsersState,
} from "../../types/state";

interface MapStateToProps {
  currentUser: CurrentUserState;
  currentUserId: string;
  defaultPhoto: string;
  groupChat: GroupChatDataState;
  groups: GroupsState;
  users: UsersState;
}

interface MapDispatchToProps {
  sendGroupChat: (data: SendChatProps) => void;
}

type GroupChatProps = RouteProps & MapStateToProps & MapDispatchToProps;

class GroupChat extends Component<GroupChatProps, {}> {
  getGroupInfo(): GroupProps {
    const { groupId } = this.props.match.params;
    return this.props.groups![groupId];
  }

  groupMemberIds(): Array<string> {
    return Object.keys((this.getGroupInfo() || {}).memberIds || []);
  }

  getUserInfo(userId: string): UserProps {
    return this.props.users![userId];
  }

  groupChatIds(): Array<string> {
    return Object.keys(this.props.groupChat || {}).reverse();
  }

  handleClickSendBtn(data: SendChatProps): void {
    this.props.sendGroupChat(data);
  }

  getChat(cid: string): GroupChatModelProps {
    return this.props.groupChat![cid];
  }

  isMe(cid: string): boolean {
    return this.getChat(cid).uid === this.props.currentUserId;
  }

  getChatUserInfo(cid: string): UserProps {
    const { uid } = this.getChat(cid);
    return this.props.users![uid];
  }

  renderChat(cid: string): JSX.Element {
    return (
      <div key={cid}>
        {this.isMe(cid) ? (
          <ChatSelf
            photoURL={this.props.currentUser!.photoURL}
            defaultPhoto={this.props.defaultPhoto}
            body={this.getChat(cid).body}
          />
        ) : (
          <ChatOther
            photoURL={this.getChatUserInfo(cid).photoURL!}
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
        <div className="title-wrapper title-group">
          グループ
          <span className="name group-name">
            {(this.getGroupInfo() || {}).groupName}
          </span>
        </div>
        <div className="member-whole-wrapper">
          メンバー
          <ul className="member-wrapper">
            {this.groupMemberIds().map((mid) => (
              <div key={mid} className="user-detail">
                {this.getUserInfo(mid).photoURL
                  ? renderImage(this.getUserInfo(mid).photoURL!)
                  : renderImage(this.props.defaultPhoto)}
                <span>{this.getUserInfo(mid).username}</span>
              </div>
            ))}
          </ul>
        </div>
        <div className="chat-whole-wrapper">
          {this.groupChatIds().map((cid) => this.renderChat(cid))}
        </div>

        <ChatForm
          groupId={this.props.match.params.groupId}
          handleClick={this.handleClickSendBtn.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = (
  state: BaseState,
  props: RouteProps
): MapStateToProps => {
  let groupChat: GroupChatDataState = null;
  if (state.groupChat) {
    groupChat = state.groupChat[props.match.params.groupId];
  }
  return {
    currentUser: state.currentUser,
    currentUserId: state.currentUserId,
    defaultPhoto: state.defaultPhoto,
    groupChat,
    groups: state.groups,
    users: state.users,
  };
};

const mapDispatchToProps: MapDispatchToProps = { sendGroupChat };

export default connect(mapStateToProps, mapDispatchToProps)(GroupChat);
