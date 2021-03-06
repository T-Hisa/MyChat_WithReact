import { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import Signin from "../views/sign/Signin"
import Signup from "../views/sign/Signup"

export type UpdateSignStateFunction = (state: SignContainerState) => void

interface SignContainerProps {
  updateState: UpdateSignStateFunction
}

interface SignContainerState {
  currentRoute: string
}

class SignContainer extends Component<SignContainerProps, SignContainerState> {
  constructor(props: SignContainerProps) {
    super(props)
    this.state = {
      currentRoute: ""
    }
  }

  updateState(state: SignContainerState): void {
    this.setState(state)
    this.props.updateState(state)
  }

  render(): JSX.Element {
    return (
      <div className="relative-container">
        <Route
          exact
          path="/signin"
          render={(routeProps) => (
            <Signin updateState={this.updateState.bind(this)} {...routeProps} />
          )}
        />
        <Route
          exact
          path="/signup"
          render={(routeProps) => (
            <Signup updateState={this.updateState.bind(this)} {...routeProps} />
          )}
        />
        <Route path="/">
          <Redirect to="/signin" />
        </Route>
      </div>
    )
  }
}

export default SignContainer
