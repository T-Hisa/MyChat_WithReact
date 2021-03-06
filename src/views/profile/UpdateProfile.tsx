import { Component } from "react";
import { connect } from "react-redux";

import ProfileCommon from "../../components/profile/ProfileCommon";

import BaseState, {CurrentUserState} from "../../types/state"

interface MapStateToProps {
  currentUser: CurrentUserState;
}

type UpdateProfileProps = MapStateToProps

class UpdateProfile extends Component<UpdateProfileProps, {}> {
  render() {
    return (
      <ProfileCommon
        username={this.props.currentUser?.username}
        photoURL={this.props.currentUser?.photoURL}
      />
    );
  }
}

const mapStateToProps = (state: BaseState): MapStateToProps => {
  return {currentUser: state.currentUser}
}

export default connect(mapStateToProps, null)(UpdateProfile);

// export default UpdateProfile