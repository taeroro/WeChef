import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import FBSDK from 'react-native-fbsdk';

const { LoginButton } = FBSDK;

class ProfileSettingsScreen extends Component {
  logout() {
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>ProfileSettingsScreen</Text>
        <LoginButton onLogoutFinished={() => this.logout()}/>
      </View>
    );
  }
}

export default ProfileSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});
