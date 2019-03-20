import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

// components
import RecipeList from '../components/RecipeList';

const data = [
  {id: '1', name: 'Healthy Granola Bowl', difficultyRating: 4},
  {id: '2', name: 'Butternut Squash Soup', difficultyRating: 3},
  {id: '3', name: 'Buttermilk Pancakes', difficultyRating: 2},
  {id: '4', name: 'Shrimp Dumplings', difficultyRating: 4},
  {id: '5', name: 'Lamb Burger', difficultyRating: 5},
  {id: '6', name: 'Pesto Pasta with sliced Tomato', difficultyRating: 4},
  {id: '7', name: 'Cinnamon Rolls', difficultyRating: 1},
];

class SavedMainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayData: data,
    };
  }

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
        <View style={styles.titleHeaderContainer}>
          <Text style={styles.headerTitle}>Saved Recipes</Text>
        </View>
        <View style={styles.listContainer}>
          <RecipeList queryData={data} />
        </View>
      </View>
    );
  }
}

export default SavedMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  listContainer:{
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleHeaderContainer: {
    marginTop: getStatusBarHeight() + 40,
    marginLeft: 25,
    marginRight: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#3C3C3C',
    fontSize: 37,
    fontWeight: 'bold',
  },
});
