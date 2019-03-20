import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Rating } from 'react-native-elements';

class RecipeSingleScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeID: this.props.navigation.state.params.id,
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

  renderRecipe() {
    return (
      <View style={styles.recipeContainer}>
        <Text>Recipe Section</Text>
      </View>
    );
  }

  renderBottomBar() {
    return (
      <View style={styles.bottomBarContainer}>
        <View style={styles.bottomBarSafeArea}>
          <TouchableOpacity
            style={bottomBarstyles.ingredientsButtonContainer}
            onPress={() => {
              console.log("ingredients");
              this.props.navigation.navigate('IngAndDir');
            }}
          >
            <Text style={bottomBarstyles.ingredientsText}>ingredients</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={bottomBarstyles.directionsButtonContainer}
            onPress={() => {
              console.log("directions");
            }}
          >
            <Text style={bottomBarstyles.directionsText}>directions</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderRecipe()}
        {this.renderBottomBar()}
      </View>
    );
  }
}

export default RecipeSingleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  recipeContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',

    backgroundColor: 'green',
  },
  bottomBarContainer: {
    height: 49 + getBottomSpace(),
    width: '100%',
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',

    backgroundColor: 'red',
  },
  bottomBarSafeArea: {
    height: 49,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'yellow',
  },
});
const bottomBarstyles = StyleSheet.create({
  ingredientsButtonContainer: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'brown',
  },
  ingredientsText: {
    textTransform: 'uppercase',
  },
  directionsButtonContainer: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'blue',
  },
  directionsText: {
    textTransform: 'uppercase',
  },
});
