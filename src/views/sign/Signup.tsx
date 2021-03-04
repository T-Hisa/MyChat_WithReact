import React, { Component } from "react";
import firebase from "../../firebase-setup";
import SignCommon, { SignCommonState } from "../../components/sign/SignCommon";

import { connect } from "react-redux";
import { setUserProfile } from "../../actions/users";

import RouteProps from "../../types/RouteProps";
import { SetProfileProps } from "../../types/Profile";

interface SignupProps extends RouteProps {
  updateState: (data: { currentRoute: string }) => void;

  setUserProfile: any;
}

interface SignupState {
  emailFlag: boolean;
  passwordFlag: boolean;
}

class Signup extends Component<SignupProps, SignupState> {
  constructor(props: SignupProps) {
    super(props);
    this.state = {
      emailFlag: false,
      passwordFlag: false,
    };
    const currentRoute = props.location.pathname;
    props.updateState({ currentRoute });
  }

  checkEmail(email: string): boolean {
    const flag: boolean = !email.match(/^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i);
    return flag;
  }

  checkPassword(password: string): boolean {
    return !(password.length > 5);
  }

  onClickSignupBtn(state: SignCommonState): void {
    const { email, password } = state;
    if (this.checkEmail(email) || password.length < 6) {
      this.setState({
        emailFlag: true,
        passwordFlag: true,
      });
      alert("入力に誤りがあります。もう一度確認してください。");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((data: firebase.auth.UserCredential) => {
          const userId: string = data?.user?.uid!;
          const sendData: SetProfileProps = {userId, email};
          this.props.setUserProfile(sendData);
          this.props.history.push("set-profile");
        })
        .catch(() => {
          alert("既に登録してあるメールアドレスです");
        });
    }
  }

  render() {
    return (
      <React.StrictMode>
        <SignCommon
          title="登録"
          checkEmail={this.checkEmail}
          checkPassword={this.checkPassword}
          emailFlag={this.state.emailFlag}
          passwordFlag={this.state.passwordFlag}
          handleClick={this.onClickSignupBtn.bind(this)}
        />
      </React.StrictMode>
    );
  }
}

const mapDispatchToProps = { setUserProfile };
export default connect(null, mapDispatchToProps)(Signup);

// export default Signup;
