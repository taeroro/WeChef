import React, { Component, View, Text } from 'react';
import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import FBSDK from 'react-native-fbsdk';

// non-packages
import Root from './src/config/router';
import LoginScreen from './src/login/LoginScreen';
import LoadingScreen from './src/loading/LoadingScreen';

const { AccessToken } = FBSDK;

// type Props = {};
// export default class App extends Component<Props> {

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      accessToken: null,
      isLoading: true
    }
  }

  componentDidMount() {
    /********* For Testing Purpose *******/
    /* DO NOT DELETE. UNCOMMENT WHEN TESTING */
//     AccessToken.setCurrentAccessToken({
//        accessToken: 'EAAghoBEJy9UBAJGYJchXi24ha1mnXMyqWPKFVOQcykZByeUNp2VDFa7LwlZCH8yReKd137FWVzeRQCY47parY4hSnzNWSrE10VmaYeiANbQ5lN871grxo1Ri39wsjttFHNvleFlEG3EqpCKtLYZCYLIrxhKHe3GKfGWxuGSEIApNouuEj5ynrrTpx9ZBhDDTQGZBncz708Yf3F1XpBRWwAMWLAsTK4AjaKUZCScH6IGfAI08RdNEwz',
//        applicationID: '2288771178023893',
//        userID: '100033517541289',
//        permissions: ['public_profile'],
//        declinedPermissions: [],
//        //accessTokenSource: '',
//        expirationTime: new Date().getTime()*2,
//        lastRefreshTime: new Date().getTime()
//     });
    /********* End of Testing *******/

    AccessToken.getCurrentAccessToken()
    .then((data) => {
      if (data) {
        this.setState({
          accessToken: data.accessToken,
          isLoading: false
        })
      }
      else {
        this.setState({
          isLoading: false
        })
      }
    })
    .catch(error => {
      console.log(error)
    })
  }


  render() {
    if (this.state.isLoading) {
      const LoadingNavigate = loadingNavigator()
      const Loading = createAppContainer(LoadingNavigate)
      return <Loading />
    }
    else {
      const RootScreen = rootNavigator(this.state.accessToken)
      const DisplayScreen = createAppContainer(RootScreen)
      return <DisplayScreen />
    }
  }
}

const loadingNavigator = () => {
  return createStackNavigator(
    {
      Loading: {
        screen: LoadingScreen
      },
    }
  );
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
