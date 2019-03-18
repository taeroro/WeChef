import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

class RecipeMainScreen extends Component {
  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          start={{x: 0, y: 0}} end={{x: 1, y: 1}}
          colors={['#FA967B', '#F56862']}
          style={styles.searchBarContainer}
        >

        </LinearGradient>

        <View>
          <Text>Content</Text>
        </View>
      </View>
    );
  }
}

export default RecipeMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  searchBarContainer: {
    width: '100%',
    height: getStatusBarHeight() + 120,
  },
});
