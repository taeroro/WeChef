import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
} from 'react-native';
import { withNavigation } from 'react-navigation';

// components
import RecipeCardOnList from './RecipeCardOnList';

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
        data={this.props.queryData}
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

export default withNavigation(RecipeList);

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
