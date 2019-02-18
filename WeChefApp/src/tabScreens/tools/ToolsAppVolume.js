import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

class ToolsAppVolume extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Volume App</Text>
      </View>
    );
  }
}

export default ToolsAppVolume;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
