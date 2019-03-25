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
const sectionSize = Dimensions.get('window').width - 40;

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

        <View style={recipeStyles.ratingWrapper}>
          <Text style={recipeStyles.ratingText}>Difficulty Rating: </Text>

          <Rating
            imageSize={18}
            readonly
            // type={'custom'}
            // ratingColor={'#F56862'}
            startingValue={3}
            ratingCount={3}
            style={styles.rating}
          />
        </View>

      </View>
    );
  }

  // Q & A
  renderRecipeSection2() {
    const tempQuestion = "Should I use large free-range organic eggs or just normal eggs?";
    const tempAnswer = "Large top-shelf free-range organic eggs are recommended for the best result";

    return (
      <View style={recipeStyles.section2Container}>
        <Text style={recipeStyles.qnaText}>Q & A</Text>

        <View style={recipeStyles.qnaSingleContainer}>
          <Text style={recipeStyles.qnaContentText}>
            Q: {tempQuestion}
          </Text>
          <Text style={recipeStyles.qnaContentText}>
            A: {tempAnswer}
          </Text>

          <TouchableOpacity
            style={recipeStyles.moreQnaButtonContainer}
            onPress={() => {
              console.log("more q n a");

            }}
          >
            <Text style={recipeStyles.moreQnaText}>Read All Q & As</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderRecipeSection3() {
    const tempComment = "I tried it out this recipe and it is super delicious!";
    const tempUserName = "Ryan Fan";

    return (
      <View style={recipeStyles.section3Container}>
        <Text style={recipeStyles.qnaText}>Reviews</Text>

        <View style={recipeStyles.qnaSingleContainer}>
          <Text style={recipeStyles.reviewsUserNameText}>
            {tempUserName}:
          </Text>
          <Text style={recipeStyles.qnaContentText}>
            {tempComment}
          </Text>

          <TouchableOpacity
            style={recipeStyles.moreQnaButtonContainer}
            onPress={() => {
              console.log("more reviews");

            }}
          >
            <Text style={recipeStyles.moreQnaText}>Read All Reviews</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderDivider() {
    return ( <View style={styles.divider} /> );
  }

  renderRecipe() {
    return (
      <View style={recipeStyles.container}>
        <ScrollView
          contentContainerStyle={recipeStyles.recipeContainer}
          style={{width: "100%"}}
        >
          {this.renderRecipeSection1()}
          {this.renderDivider()}
          {this.renderRecipeSection2()}
          {this.renderDivider()}
          {this.renderRecipeSection3()}
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
  divider: {
    marginTop: 20,
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 20,
    height: 0.8,
    width: sectionSize,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  }
});
const recipeStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  recipeContainer: {
    flex: 0,

    paddingBottom: 25,
    // backgroundColor: 'rgba(0, 255, 0, 0.2)',
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
    marginRight: 20,
    marginLeft: 20,
    width: sectionSize,
  },
  recipeName: {
    fontSize: 22,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#3C3C3C',
    textTransform: 'capitalize',

    // backgroundColor: 'rgba(0, 0, 255, 0.2)',
  },
  ratingWrapper: {
    marginTop: 10,
    width: sectionSize,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    // backgroundColor: 'rgba(255, 0, 0, 0.2)',
  },
  ratingText: {
    marginRight: 5,
    fontSize: 13,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#3C3C3C',
  },

  section2Container: {
    marginRight: 20,
    marginLeft: 20,
    width: sectionSize,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

    // backgroundColor: 'rgba(100, 0, 0, 0.4)',
  },
  qnaText: {
    marginBottom: 3,
    fontSize: 17,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#3C3C3C',
  },
  qnaContentText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#3C3C3C',
  },
  moreQnaButtonContainer: {
    marginTop: 10,
    width: sectionSize,
    alignItems: 'center',

    // backgroundColor: 'rgba(100, 0, 0, 0.4)',
  },
  moreQnaText: {
    fontSize: 15,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#F56862',
  },

  section3Container: {
    marginRight: 20,
    marginLeft: 20,
    width: sectionSize,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

    // backgroundColor: 'rgba(100, 0, 0, 0.4)',
  },
  reviewsText: {
    marginBottom: 3,
    fontSize: 17,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#3C3C3C',
  },
  reviewsUserNameText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#3C3C3C',
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
