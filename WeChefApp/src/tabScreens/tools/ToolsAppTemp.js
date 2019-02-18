import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

class ToolsAppTemp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Temp App</Text>
      </View>
    );
  }
}

export default ToolsAppTemp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
