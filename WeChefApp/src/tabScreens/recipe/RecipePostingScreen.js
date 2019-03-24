import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';

class RecipePostingScreen extends Component {
  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>RecipePostingScreen</Text>
      </View>
    );
  }
}

export default RecipePostingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});
