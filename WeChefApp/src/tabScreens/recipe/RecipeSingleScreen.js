import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Rating } from 'react-native-elements';

const imageSize = Dimensions.get('window').width;

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

  // Recipe image, name, rating
  renderRecipeSection1() {
    // TODO: replace image source, name of the recipe, and difficulty rating

    const tempName = "delicious blueberry and orange pancakes with organic maple syrup";

    return (
      <View style={recipeStyles.section1Container}>
        <Image
          resizeMode={"center"}
          style={recipeStyles.recipeImg}
          source={require('./../../../assets/img/photo-1490457843367-34b21b6ccd85.jpeg')}
        />
        <View style={recipeStyles.recipeNameWrapper}>
          <Text style={recipeStyles.recipeName}>
            {tempName}
          </Text>
        </View>
      </View>
    );
  }

  renderRecipe() {
    return (
      <View style={recipeStyles.container}>
        <ScrollView
          contentContainerStyle={recipeStyles.recipeContainer}
          style={{width: "100%"}}
        >
          {this.renderRecipeSection1()}
        </ScrollView>
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
const recipeStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  recipeContainer: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',

    backgroundColor: 'rgba(0, 255, 0, 0.2)',
  },
  section1Container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  recipeImg: {
    flex: 1,
    width: imageSize,
    height: imageSize,
  },
  recipeNameWrapper: {
    marginTop: 20,
    marginRight: 15,
    marginLeft: 15,
    width: '100%',
  },
  recipeName: {
    fontSize: 22,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#3C3C3C',
    textTransform: 'capitalize',

    backgroundColor: 'rgba(0, 0, 255, 0.2)',
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
