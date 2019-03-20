import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, ActionSheetIOS, StatusBar } from 'react-native';
import { ListItem } from 'react-native-elements';

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

class ProfileRecipesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayData: data
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
          <Text style={styles.headerTitle}>My Recipes</Text>
        </View>

        <View style={styles.listContainer}>
          <RecipeList queryData={data} />
        </View>

      </View>
    );
  }
}

export default ProfileRecipesScreen;

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
    marginTop: 10,
    paddingLeft: 25,
    paddingRight: 25,
  },
  headerTitle: {
    color: '#3C3C3C',
    fontSize: 32,
    fontWeight: 'bold',
  },
  listConatiner: {
    marginTop: 20,
    backgroundColor: '#FFF',
  },
  settingContainerStyle: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: '#D2D2D2',
  },
  settingTitleStyle: {
    marginLeft: 15,
    fontWeight: '400',
    fontSize: 16,
    color: '#3C3C3C',
    letterSpacing: 0.5,
  },
});
