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
import { MKSpinner } from 'react-native-material-kit';
import axios from 'axios';
import FBSDK from 'react-native-fbsdk';

const DB_PREFIX = 'https://wechef-server-dev.herokuapp.com/';
const { AccessToken } = FBSDK;
const image = 'http://www.getmdl.io/assets/demos/welcome_card.jpg';

const imageSize = Dimensions.get('window').width;
const sectionSize = Dimensions.get('window').width - 40;

class RecipeSingleScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeID: this.props.navigation.state.params.id,
      recipeObj: null,
      isRecipeSaved: false,
      firstQandA: null,
      firstReview: null,
      currentUser: null,
      isRecipeAddedToCart: false,
    };
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });

    this.fetchOneRecipes();
    this.fetchFirstQandA();
    this.fetchFirstReview();
    this.fetchStatus();

    this.props.navigation.setParams({ onNavigateBack: this.handleNavigateBackEdit });

  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  handleNavigateBackQnA = () => {
    this.fetchFirstQandA();
  }

  handleNavigateBackEdit = () => {
    this.fetchOneRecipes();
  }

  handleNavigateBackReview = () => {
    this.fetchFirstReview();
  }

  fetchOneRecipes = () => {
    let requestURL = DB_PREFIX + 'recipe/recipe-byid/' + this.state.recipeID;

    axios.get(requestURL)
      .then(res => {
        console.log(res);
        let recipeInfo = res.data;
        this.setState({recipeObj: recipeInfo});
        this.props.navigation.setParams({ recipeObj: this.state.recipeObj });
        this.props.navigation.setParams({ recipeID: this.state.recipeID });
      })
      .catch(error => {
        alert(error);
      })
  }

  fetchFirstQandA = () => {
    let requestURL = DB_PREFIX + 'recipe/qa/first/' + this.state.recipeID;

    axios.get(requestURL)
      .then(res => {
        console.log(res);
        let latestQandA = res.data;
        this.setState({firstQandA: latestQandA});
      })
      .catch(error => {
        alert(error);
      })
  }

  fetchFirstReview = () => {
    let requestURL = DB_PREFIX + 'recipe/review/first/' + this.state.recipeID;

    axios.get(requestURL)
      .then(res => {
        console.log(res);
        let latestReview = res.data;
        this.setState({firstReview: latestReview});
      })
      .catch(error => {
        alert(error);
      });
  }

  addOrRemoveFavourite = (isSaved) => {
    var requestURL = null;
    if (isSaved) {
      requestURL = DB_PREFIX + 'user/remove-favourite/' + this.state.currentUser;
    } else {
      requestURL = DB_PREFIX + 'user/add-favourite/' + this.state.currentUser;
    }
    axios.put(requestURL, { recipeID: this.state.recipeID })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        alert(error);
      });

  }

  addOrRemoveFromCart = (isInCart) => {
    var requestURL = DB_PREFIX;
    let currentUserID = this.state.currentUser;
    if (isInCart) {
      requestURL = requestURL + 'user/remove-list/' + currentUserID;
    } else {
      requestURL = requestURL + 'user/add-list/' + currentUserID;
    }

    axios.put(requestURL, { recipeID: this.state.recipeID })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        alert(error);
      });
  }

  fetchSavedAndCartStatus = () => {
    this.props.navigation.setParams({ saved: this.state.isRecipeSaved });
    this.props.navigation.setParams({ addedToList: this.state.isRecipeAddedToCart });
  }

  setSaveAndCartFunction = () => {
    this.props.navigation.setParams({ favouriteFun: this.addOrRemoveFavourite });
    this.props.navigation.setParams({ addToCartFun: this.addOrRemoveFromCart });
  }

  fetchStatus = () => {
    AccessToken.getCurrentAccessToken().then((data) => {
      this.setState({
        currentUser: data.userID
      });

      this.props.navigation.setParams({ currentUser: data.userID });

      let requestURL = DB_PREFIX + 'user/' + this.state.currentUser;

      axios.get(requestURL)
        .then(res => {
          const userInfo = res.data;
          const currentRecipeID = this.state.recipeID;
          if (userInfo.favoriteRecipeIDs.includes(currentRecipeID)) {
            this.setState({ isRecipeSaved: true });
          }
          if (userInfo.shoppingListRecipeIDs.includes(currentRecipeID)) {
            this.setState({ isRecipeAddedToCart: true });
          }

          this.fetchSavedAndCartStatus();
          this.setSaveAndCartFunction();
        })
        .catch(error => {
          alert(error);
        });
    });
  }

  // Recipe image, name, rating
  renderRecipeSection1() {

    const {recipeObj} = this.state;

    if (!recipeObj) {
      return (
        <View style={styles.loadingContainer}>
          <SingleColorSpinner strokeColor="#F56862" />
        </View>
      );
    }

    return (
      <View style={recipeStyles.section1Container}>
        {(recipeObj.recipeImageURL != 'null') ? (
          <Image
          resizeMode={"cover"}
          style={recipeStyles.recipeImg}
          source={{uri: recipeObj.recipeImageURL}}
        />) : null}
        <View style={recipeStyles.recipeNameWrapper}>
          <Text style={recipeStyles.recipeName}>
            {recipeObj ? recipeObj.title : null}
          </Text>
        </View>

        <View style={recipeStyles.ratingWrapper}>
          <Text style={recipeStyles.ratingText}>Difficulty Rating: </Text>

          <Rating
            imageSize={18}
            readonly
            // type={'custom'}
            // ratingColor={'#F56862'}
            startingValue={recipeObj.difficulty}
            ratingCount={5}
            style={styles.rating}
          />
        </View>

      </View>
    );
  }

  // Q & A
  renderRecipeSection2() {

    const {recipeObj, firstQandA} = this.state;

    if (!recipeObj || !firstQandA) {
      return (
        <View style={styles.loadingContainer}>
          <SingleColorSpinner strokeColor="#F56862" />
        </View>
      );
    }

    return (
      <View style={recipeStyles.section2Container}>
        <View style={recipeStyles.qnaFirstLine}>
          <Text style={recipeStyles.qnaText}>Q & A</Text>

          <TouchableOpacity
            style={recipeStyles.addQContainer}
            onPress={() => {
              this.props.navigation.navigate('PostNewQuestion', {recipeID: recipeObj._id, onNavigateBack: this.handleNavigateBackQnA});
            }}
          >
            <Text style={recipeStyles.addQText}>Post a Question</Text>
          </TouchableOpacity>
        </View>

        {(firstQandA.length) ? (
          <View style={recipeStyles.qnaSingleContainer}>
            <Text style={recipeStyles.qnaContentText}>
              Q: {firstQandA[0].qContent}
            </Text>
            <Text style={recipeStyles.qnaContentText}>
              A: {firstQandA[0].aContent || 'No answer yet'}
            </Text>

            <TouchableOpacity
              style={recipeStyles.moreQnaButtonContainer}
              onPress={() => {
                this.props.navigation.navigate('QandA', {recipeID: recipeObj._id, recipeOwnerID: recipeObj.ownerID, onNavigateBack: this.handleNavigateBackQnA});
              }}
            >
              <Text style={recipeStyles.moreQnaText}>Read All Q & As</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }

  // Reviews
  renderRecipeSection3() {
    const tempComment = "I tried out this recipe and it is super delicious!";
    const tempUserName = "Ryan Fan";

    const {recipeObj, firstReview} = this.state;
    if (!recipeObj || !firstReview) {
      return (
        <View style={styles.loadingContainer}>
          <SingleColorSpinner strokeColor="#F56862" />
        </View>
      );
    }

    return (
      <View style={recipeStyles.section3Container}>
        <View style={recipeStyles.qnaFirstLine}>
          <Text style={recipeStyles.qnaText}>Reviews</Text>

          <TouchableOpacity
            style={recipeStyles.addQContainer}
            onPress={() => {
              this.props.navigation.navigate('PostNewReview', {recipeID: recipeObj._id, onNavigateBack: this.handleNavigateBackReview});
            }}
          >
            <Text style={recipeStyles.addQText}>Post a Review</Text>
          </TouchableOpacity>
        </View>

        {(firstReview.length) ? (
          <View style={recipeStyles.qnaSingleContainer}>
          <Text style={recipeStyles.reviewsUserNameText}>
            {tempUserName}:
          </Text>
          <Text style={recipeStyles.qnaContentText}>
            {firstReview[0].content}
          </Text>

          <TouchableOpacity
            style={recipeStyles.moreQnaButtonContainer}
            onPress={() => {
              this.props.navigation.navigate('Reviews', {recipeID: recipeObj._id});
            }}
          >
            <Text style={recipeStyles.moreQnaText}>Read All Reviews</Text>
          </TouchableOpacity>
        </View>
        ) : null}
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
    const {recipeObj} = this.state;

    if (!recipeObj) {
      return (
        <View style={styles.loadingContainer}>
          <SingleColorSpinner strokeColor="#F56862" />
        </View>
      );
    }

    return (
      <View style={styles.bottomBarContainer}>
        <View style={styles.bottomBarSafeArea}>
          <TouchableOpacity
            style={bottomBarstyles.ingredientsButtonContainer}
            onPress={() => {
              this.props.navigation.navigate('IngAndDir', {ingredients: recipeObj.ingredients, content: recipeObj.content});
            }}
          >
            <View style={bottomBarstyles.textWrapper}>
              <Text style={bottomBarstyles.buttonText}>ingredients & directions</Text>
            </View>
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

    // backgroundColor: '#3C3C3C',
    backgroundColor: '#F56862',
  },
  bottomBarSafeArea: {
    height: 49,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    // backgroundColor: 'yellow',
  },
  divider: {
    marginTop: 20,
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 20,
    height: 0.8,
    width: sectionSize,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    width: 35,
    height: 35,
  },
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
  qnaFirstLine: {
    width: sectionSize,
    flexDirection: 'row',
    alignItems: 'center',

    // backgroundColor: 'rgba(0, 255, 0, 0.4)',
  },
  addQContainer: {
    position: 'absolute',
    right: 0,
  },
  addQText: {
    fontSize: 13,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#F56862',
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
    width: '100%',
    height: '100%',
  },
  textWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#3C3C3C',
    backgroundColor: '#F56862',
  },
  buttonText: {
    textTransform: 'uppercase',
    color: '#FFF',
    fontSize: 15,
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
});

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build();
