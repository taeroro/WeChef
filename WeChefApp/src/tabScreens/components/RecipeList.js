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
      dataSize: null,
    };
  }

  render() {
    return (
      this.props.queryData
      ? this.props.queryData.length === 0
        ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No Recipe To Display...</Text>
            {/* <Text style={styles.pullText}>Pull Down To Refresh</Text> */}
          </View>
        )
        : (
          <FlatList
            data={this.props.queryData}
            renderItem={({item}) => (
              this.props.queryData.length === 1
              ? (
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.itemContainer}>
                    <RecipeCardOnList
                      size={size}
                      item={item}
                    />
                  </View>
                  <View style={styles.itemContainer} />
                </View>
              )
              : (
                <View style={styles.itemContainer}>
                  <RecipeCardOnList
                    size={size}
                    item={item}
                  />
                </View>
              )
            )}
            keyExtractor={item => item._id}
            numColumns={numColumns}
            contentContainerStyle={styles.listContentStyle}
          />
        )
      : <View />
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
  emptyContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 197,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#3C3C3C',
    // marginBottom: 5,
  },
  pullText: {
    fontSize: 14,
    fontWeight: '300',
    color: '#3C3C3C',
    marginTop: 5,
  },
});
