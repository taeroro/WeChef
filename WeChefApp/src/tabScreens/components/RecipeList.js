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
  {id: '1', value: 'A'},
  {id: '2', value: 'B'},
  {id: '3', value: 'C'},
  {id: '4', value: 'D'},
  {id: '5', value: 'E'},
  {id: '6', value: 'F'},
  {id: '7', value: 'A'},
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
            {/* <Text style={styles.item}> Hi </Text> */}
            <RecipeCardOnList />
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
    paddingTop: 35 - 7,
    paddingBottom: 35 - 7,
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
