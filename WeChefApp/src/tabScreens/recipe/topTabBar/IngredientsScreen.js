import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

class IngredientsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  /*
  * TODO: display ingredients
  * Backend data stored in params.ingredients.
  * e.g. [{name: "Milk", amount: "100ml"}, {name: "Sugar", amount: "100g"}, {name: "Ice", amount: "100g"}]
  */

  render() {
    console.log(this.props.navigation.state.params.ingredients);
    return (
      <View style={styles.container}>
        <Text>IngredientsScreen</Text>
      </View>
    );
  }
}

export default IngredientsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
