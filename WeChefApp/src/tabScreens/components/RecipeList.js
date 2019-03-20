import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
} from 'react-native';

// components
import RecipeCardOnList from './RecipeCardOnList';

const data = [
  {id: '1', name: 'Healthy Granola Bowl', difficultyRating: 4},
  {id: '2', name: 'Butternut Squash Soup', difficultyRating: 3},
  {id: '3', name: 'Buttermilk Pancakes', difficultyRating: 2},
  {id: '4', name: 'Shrimp Dumplings', difficultyRating: 4},
  {id: '5', name: 'Lamb Burger', difficultyRating: 5},
  {id: '6', name: 'Pesto Pasta with sliced Tomato', difficultyRating: 4},
  {id: '7', name: 'Cinnamon Rolls', difficultyRating: 1},
];
const numColumns = 2;
const size = Dimensions.get('window').width/numColumns - 14;

class RecipeList extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <RecipeCardOnList
              size={size}
              item={item}
            />
          </View>
        )}
        keyExtractor={item => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.listContentStyle}
      />
    );
  }
}

export default RecipeList;

const styles = StyleSheet.create({
  listContentStyle: {
    width: '100%',
    paddingTop: 35 - 10,
    paddingBottom: 35 - 10,
    justifyContent: 'center',
  },
  itemContainer: {
    width: size,
    // height: size,
  },
  item: {
    flex: 1,
    margin: 7,
    backgroundColor: 'lightblue',
  }
});
