import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import FBSDK from 'react-native-fbsdk';

// non-packages
import Root from './src/config/router';
import LoginScreen from './src/login/LoginScreen';

const { AccessToken } = FBSDK;

// type Props = {};
// export default class App extends Component<Props> {

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      accessToken: null
    }
  }

  componentDidMount() {
    AccessToken.getCurrentAccessToken()
    .then((data) => {
      this.setState({
        accessToken: data.accessToken
      })
    })
    .catch(error => {
      console.log(error)
    })
  }


  render() {
    const RootScreen = rootNavigator(this.state.accessToken)
    const DisplayScreen = createAppContainer(RootScreen)
    return <DisplayScreen />
  }
}

const rootNavigator = (isLoggedIn) => {
  return createSwitchNavigator(
    {
      Login: {
        screen: LoginScreen
      },
      Main: {
        screen: Root
      }
    },
    {
      initialRouteName: isLoggedIn ? "Main" : "Login"
    }
  )
}

export default App;
