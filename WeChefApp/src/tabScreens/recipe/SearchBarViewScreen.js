import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

// components
import SearchBar from '../components/SearchBar';

class SearchBarViewScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          start={{x: 0, y: 0}} end={{x: 1, y: 1}}
          colors={['#FA967B', '#F56862']}
          style={styles.searchBarContainer}
        >
          <SearchBar />
        </LinearGradient>
      </View>
    );
  }
}

export default SearchBarViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  searchBarContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 80,

  },
});
