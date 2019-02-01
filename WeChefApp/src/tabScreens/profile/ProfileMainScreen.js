import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class ProfileMainScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>ProfileMainScreen</Text>
      </View>
    );
  }
}

export default ProfileMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});
