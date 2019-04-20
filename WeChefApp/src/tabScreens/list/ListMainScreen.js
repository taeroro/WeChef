import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  SectionList,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import {
  MKColor,
  setTheme,
  MKCheckbox
} from 'react-native-material-kit';

var tempCheckValues = [];

class ListMainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listData: null,
      checkBoxChecked: [],
    };
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });

    tempData = [
      {
        id: "a0",
        recipeName: "Buttermilk Pancakes",
        ingredients: [
          { name: "Eggs", quantity: "2" },
          { name: "Buttermilk", quantity: "2 cups" },
          { name: "Flour", quantity: "2 cups" },
        ]
      },
      {
        id: "a1",
        recipeName: "Lamb Burger",
        ingredients: [
          { name: "Lamb", quantity: "2 lbs" },
          { name: "Blue cheese", quantity: "2 cups" },
          { name: "Onion", quantity: "1" },
        ]
      },
    ];

    // store data to this.state.listData and update checkbox array
    this.setState({ listData: tempData }, () => {
      let tempCheck = [];
      this.state.listData.map((item, index) => {
        tempCheck[index] = {id: item.id, checked: false};
      });
      this.setState({ checkBoxChecked: tempCheck });
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  checkBoxChanged(id, value) {
    this.setState({
      checkBoxChecked: tempCheckValues
    })

    var tempCheckBoxChecked = this.state.checkBoxChecked;
    tempCheckBoxChecked[id].checked = !value;

    this.setState({
      checkBoxChecked: tempCheckBoxChecked
    });

    console.log(JSON.stringify(this.state.checkBoxChecked));
  }

  renderIngredients(recipe) {
    // this.checkBoxChanged(recipe.id, true);
    let recipeIndex = this.state.checkBoxChecked.findIndex(obj => obj.id === recipe.id);

    return (
      <View style={styles.recipeContainer}>
        <MKCheckbox
          checked={recipeIndex !== -1 ? this.state.checkBoxChecked[recipeIndex].checked : false}
          onCheckedChange={() => this.checkBoxChanged(recipeIndex, this.state.checkBoxChecked[recipeIndex].checked)}
        />
        <Text>{recipe.recipeName}</Text>

        <FlatList
          data={recipe.ingredients}
          renderItem={({item}) => (
            <View style={styles.singleIngredient}>
              <Text>{item.name}</Text>
              <Text>{item.quantity}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
          // contentContainerStyle={styles.listContentStyle}
        />

      </View>
    );
  }

  renderShoppingList() {
    return (
      <FlatList
        data={this.state.listData}
        renderItem={({item}) => (
          this.renderIngredients(item)
        )}
        keyExtractor={item => item.id}
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
  },
  listContentStyle: {
    width: '100%',
    justifyContent: 'center',

    backgroundColor: 'lightblue',
  },
  recipeContainer: {

  },
  singleIngredient: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 0, 0, 0.2)'
  },
});
