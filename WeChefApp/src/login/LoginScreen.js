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
      console.log('name is ' + result.name + ', id is ' + result.id + ', email is ' + result.email);
      console.log('picture is ' + result.picture.data.url);
      const login_request = 'https://wechef-server-dev.herokuapp.com/user/' + result.id
      const create_user_request = 'https://wechef-server-dev.herokuapp.com/user/signup'
      fetch(login_request, {
        method: 'GET',
      })
      .then((response) => response.status)
      .then((response_status) => {
        const user_not_exist = response_status == 404
        console.log('equality = ' + user_not_exist)
        if (user_not_exist) {
          return fetch(create_user_request, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({
              facebookID: result.id,
              userName: result.name,
              userImageURL: result.picture.data.url,
              email: result.email,
            }),
          })
        } else {
          return null
        }
      })
      .then((create_response) => create_response ? create_response.status : null)
      .then((create_response_status) => {
        if (create_response_status) {
          console.log('create status is ' + create_response_status)
        }
      })
      .catch((error) => {
        alert(error);
      });
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
          '/me?fields=name,id,email,picture.type(large)',
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
