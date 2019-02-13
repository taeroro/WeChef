import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import FBSDK, { LoginManager,GraphRequest,GraphRequestManager } from 'react-native-fbsdk';

const { LoginButton, AccessToken } = FBSDK;

class LoginScreen extends Component {
  constructor(props) {
    super(props)

    this.login = this.login.bind(this)
  }

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
                this.login();
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    const infoRequest = new GraphRequest(
                      '/me?fields=name,id,picture.type(large)',
                      null,
                      this._responseInfoCallback
                    );
                    new GraphRequestManager().addRequest(infoRequest).start();
                  }
                )
              }
            }
          }/>
      </View>
    );
  }

  _responseInfoCallback = (error, result) => {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      console.log('name is ' + result.name + ', id is ' + result.id);
      console.log('picture is ' + result.picture.data.url);
    }
  }

}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});
