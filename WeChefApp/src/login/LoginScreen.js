import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import FBSDK, { LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

const { AccessToken } = FBSDK;

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
          <TouchableHighlight onPress={() => {
            this._fbAuth();
          }}>
            <View style={styles.container}>
              <View>
                <Text>Login with Facebook</Text>
              </View>
            </View>
          </TouchableHighlight>
      </View>
    );
  }

  _responseInfoCallback = (error, result) => {
    console.log('_responseInfoCallback')
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      console.log('name is ' + result.name + ', id is ' + result.id);
      console.log('picture is ' + result.picture.data.url);
    }
  }

  _fbAuth = () => {
    LoginManager.setLoginBehavior('web');
    LoginManager.logInWithReadPermissions(['public_profile','email']).then(
      (result) => {
      if(result.isCancelled) {
        console.log('loging cancelled')
      } else {
        this.login();
        const infoRequest = new GraphRequest(
          '/me?fields=name,id,picture.type(large)',
          null,
          this._responseInfoCallback
        );
        new GraphRequestManager().addRequest(infoRequest).start();
      }
    }, function(error) {
      alert('An error occured: ' + error)
    }).catch((error) => console.error(error));
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
