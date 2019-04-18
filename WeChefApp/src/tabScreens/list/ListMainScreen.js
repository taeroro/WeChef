import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import {
  MKColor,
  setTheme,
  MKCheckbox
} from 'react-native-material-kit';

class ListMainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listData: null,
    };
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });

    tempData = [
      {
        recipeName: "Buttermilk Pancakes",
        ingredients: [
          { name: "Eggs", quantity: "2" },
          { name: "Buttermilk", quantity: "2 cups" },
          { name: "Flour", quantity: "2 cups" },
        ]
      },
      {
        recipeName: "Lamb Burger",
        ingredients: [
          { name: "Lamb", quantity: "2 lbs" },
          { name: "Blue cheese", quantity: "2 cups" },
          { name: "Onion", quantity: "1" },
        ]
      },
    ]
    this.setState({ listData: tempData });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  renderShoppingList() {
    return (
      <FlatList
        data={this.state.listData}
        renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <Text>HI</Text>
            </View>
        )}
        keyExtractor={item => item._id}
        numColumns={1}
        contentContainerStyle={styles.listContentStyle}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleHeaderContainer}>
          <Text style={styles.headerTitle}>Shopping List</Text>
        </View>

        <View style={styles.contentContainer}>
          {this.renderShoppingList()}
        </View>
      </View>
    );
  }
}

export default ListMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
  contentContainer: {
    flex: 1,

    // backgroundColor: 'lightblue',
  },
  listContentStyle: {
    width: '100%',
    paddingTop: 35 - 10,
    paddingBottom: 35 - 10,
    justifyContent: 'center',
  },
});
