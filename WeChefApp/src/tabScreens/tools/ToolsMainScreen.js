import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class ToolsMainScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>ToolsMainScreen</Text>
      </View>
    );
  }
}

export default ToolsMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});
