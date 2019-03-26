import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

// components
import RecipeList from '../components/RecipeList';

const data = [
  {_id: '1', title: 'Healthy Granola Bowl', difficulty: 4, recipeImageURL: 'null'},
  {_id: '2', title: 'Butternut Squash Soup', difficulty: 3, recipeImageURL: 'null'},
  {_id: '3', title: 'Buttermilk Pancakes', difficulty: 2, recipeImageURL: 'null'},
  {_id: '4', title: 'Shrimp Dumplings', difficulty: 4, recipeImageURL: 'null'},
  {_id: '5', title: 'Lamb Burger', difficulty: 5, recipeImageURL: 'null'},
  {_id: '6', title: 'Pesto Pasta with sliced Tomato', difficulty: 4, recipeImageURL: 'null'},
  {_id: '7', title: 'Cinnamon Rolls', difficulty: 1, recipeImageURL: 'null'},
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
