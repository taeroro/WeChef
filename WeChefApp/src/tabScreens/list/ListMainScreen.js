import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class ListMainScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>ListMainScreen</Text>
      </View>
    );
  }
}

export default ListMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
