import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

class ToolsAppWeight extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Weight App</Text>
      </View>
    );
  }
}

export default ToolsAppWeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
