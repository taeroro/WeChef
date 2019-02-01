import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class RecipeMainScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>RecipeMainScreen</Text>
      </View>
    );
  }
}

export default RecipeMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
