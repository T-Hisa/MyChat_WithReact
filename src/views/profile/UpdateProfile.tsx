import { Component } from "react";
import { connect } from "react-redux";

import ProfileCommon from "../../components/profile/ProfileCommon";
import UserProps from "../../types/models/User";

interface UpdateProfileProps {
  currentUser: UserProps;
}

class UpdateProfile extends Component<UpdateProfileProps, {}> {
  render() {
    return (
      <ProfileCommon
        username={this.props.currentUser.username}
        photoURL={this.props.currentUser.photoURL}
      />
    );
  }
}

// const mapStateToProps = (state) => ({ currentUser: state.currentUser });
const mapStateToProps = (state) => {
  console.log("state", state)
  return {currentUser: state.currentUser}
}

export default connect(mapStateToProps, null)(UpdateProfile);

// export default UpdateProfile