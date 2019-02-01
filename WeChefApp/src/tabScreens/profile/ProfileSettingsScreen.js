import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class ProfileSettingsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>ProfileSettingsScreen</Text>
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
