import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
} from 'react-native';
import { Searchbar as _Searchbar } from 'react-native-paper';
import axios from 'axios';

const DB_PREFIX = 'https://wechef-server-dev.herokuapp.com/';

const results = [
  {id: '1', name: 'Healthy Granola Bowl', difficultyRating: 4},
  {id: '2', name: 'Butternut Squash Soup', difficultyRating: 3},
];


class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.animatedValue = new Animated.Value(0);

    this.state = {
      isFocused: false,
      firstQuery: '',
      results: null,
    };

    this.searchSubmitEvent = this.searchSubmitEvent.bind(this);
  }

  searchSubmitEvent() {
    // this.state.firstQuery is the search term.
    // need to undo expansion and lengthen the search bar

    // TODO: when backend is done, use query to get actual results.
    this.props.callbackFromParent(false);
    this.searchInDB();
    this.focusedAnimation(false);
  }

  searchInDB = () => {
    console.log('searchInDB');
    console.log(this.state.firstQuery);
    let requestURL = DB_PREFIX + 'recipe/search?keywords=' + this.state.firstQuery;

    axios.get(requestURL)
      .then(res => {
        console.log(res);
        this.setState({ results: res.data });
        this.props.submitCallback(this.state.results);

      })
      .catch(error => {
        alert(error);
      })
  }

  focusedAnimation(focused) {
    if (focused && !this.state.isFocused) {
      this.animatedValue.setValue(0);

      Animated.timing(
        this.animatedValue,
        {
          toValue: 1,
          duration: 200,
        }
      ).start();

      this.setState({ isFocused: true });
    }
    else if (!focused && this.state.isFocused) {
      this.animatedValue.setValue(1);

      Animated.timing(
        this.animatedValue,
        {
          toValue: 0,
          duration: 200,
        }
      ).start();

      this.setState({ isFocused: false });
    }
  }

  render() {
    const { firstQuery } = this.state;
    const animatedWidth = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['93%', '78%']
    });

    return (
      <View style={styles.container}>
        <_Searchbar
          ref="searchBarRef"
          placeholder="Search..."
          onChangeText={query => {
             this.setState({ firstQuery: query });
             if (query == "") {
               this.props.showAllCallback();
             }
           }}
          value={firstQuery}
          style={{
            width: animatedWidth,
            shadowColor: 'transparent'
          }}
          inputStyle={{
            fontSize: 15
          }}
          selectionColor='#007AFF'
          autoCorrect={false}
          autoCapitalize='none'
          onFocus={() => {
            this.props.callbackFromParent(true);
            this.focusedAnimation(true);
          }}
          onBlur={() => {
            // this.focusedAnimation(false);
          }}
          onSubmitEditing={this.searchSubmitEvent}
        />
      </View>
    );
  }
}

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    // width: '82%',
    height: 48,
    marginLeft: '6%',
    backgroundColor: '#FFF',
  },
});
