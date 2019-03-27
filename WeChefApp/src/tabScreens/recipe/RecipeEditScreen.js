import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';

class RecipeEditScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {

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
    /*
    *  TODO: edit page
    *  current recipe information is stored in this.props.navigation.state.params.recipeObj
    *  recipeObj has many fields, you may look at the below logging.
    *  examples of recipeObj.content and recipeObj.ingredients can be found in DirectionScreen.js and IngredientsScreen.js
    */
    console.log(this.props.navigation.state.params.recipeObj);

    return (
      <View style={styles.container}>
        <Text>RecipeEditScreen</Text>
      </View>
    );
  }
}

export default RecipeEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});
