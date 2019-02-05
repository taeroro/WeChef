import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import FBSDK, { LoginManager,GraphRequest,GraphRequestManager } from 'react-native-fbsdk';

const { LoginButton, AccessToken } = FBSDK;

class LoginScreen extends Component {
  login() {
    this.props.navigation.navigate('Recipe')
  }

  render() {
    return (
      <View style={styles.container}>
        <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    this.login();
                  }
                )
              }
            }
          }/>
      </View>
    );
  }

}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
