import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { NavigationEvents } from "react-navigation";
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import axios from 'axios';

// components
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';

const data = [
  {id: '1', name: 'Healthy Granola Bowl', difficultyRating: 4},
  {id: '2', name: 'Butternut Squash Soup', difficultyRating: 3},
  {id: '3', name: 'Buttermilk Pancakes', difficultyRating: 2},
  {id: '4', name: 'Shrimp Dumplings', difficultyRating: 4},
  {id: '5', name: 'Lamb Burger', difficultyRating: 5},
  {id: '6', name: 'Pesto Pasta with sliced Tomato', difficultyRating: 4},
  {id: '7', name: 'Cinnamon Rolls', difficultyRating: 1},
];

const DB_PREFIX = 'https://wechef-server-dev.herokuapp.com/';

class RecipeMainScreen extends Component {
  constructor(props) {
    super(props);

    this.animatedValue = new Animated.Value(0);

    this.state = {
      isFocusedOnTouchBar: false,
      displayData: null,
      refreshing: false,
      searchBy: 'name',
      isInSearch: false,
    };

    this.searchBarExpand = this.searchBarExpand.bind(this);
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    if (this.state.isInSearch) {
      this.refs.childrenSearchBarRef.searchInDB();
      this.setState({refreshing: false});
    } else {
      this.fetchRecipes();
    }
  }


  handleOnNavigateBack = () => {
    this.fetchRecipes();
  }

  fetchRecipes = () => {
    let requestURL = DB_PREFIX + 'recipe/homepage/';

    axios.get(requestURL)
      .then(res => {
        console.log(res);
        this.setState({ displayData: res.data });
        this.setState({refreshing: false});
      })
      .catch(error => {
        alert(error);
      })
  }

  searchBarExpand(focused) {
    if (!focused && this.state.isFocusedOnTouchBar === true) {
      this.animatedValue.setValue(1);

      Animated.timing(
        this.animatedValue,
        {
          toValue: 0,
          duration: 200,
        }
      ).start();

      this.setState({ isFocusedOnTouchBar: false });
    }
    else if (focused && this.state.isFocusedOnTouchBar === false) {
      this.animatedValue.setValue(0);

      Animated.timing(
        this.animatedValue,
        {
          toValue: 1,
          duration: 200,
        }
      ).start();

      this.setState({ isFocusedOnTouchBar: true });
    }
  }

  searchBarFocusCallback = focused => {
    this.searchBarExpand(focused);
  }

  searchBarSubmitCallback = results => {
    this.setState({ displayData: results });
    this.setState({ isInSearch: true });
  }

  searchBarShowAllCallback = () => {
    this.setState({ isInSearch: false });
    this.fetchRecipes();
  }

  renderCancelButton() {
    return (
      <TouchableOpacity
        style={styles.cancelButtonContainer}
        onPress={() => {
          this.searchBarExpand(false);
          this.refs.childrenSearchBarRef.refs.searchBarRef.blur();
          this.refs.childrenSearchBarRef.focusedAnimation(false);
        }}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    );
  }

  renderAddButton() {
    return (
      <TouchableOpacity
        style={styles.addButtonContainer}
        onPress={() => {
          this.props.navigation.navigate('RecipePosting', {onNavigateBack: this.handleOnNavigateBack});
        }}
      >
        <LinearGradient
          start={{x: 0, y: 0}} end={{x: 1, y: 1}}
          colors={['#FA967B', '#F56862']}
          style={styles.addButtonBackground}
        >
          <Text style={styles.addButtonText}>+</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  renderSearchOptions(){
    return (
      <View style={searchBarButtonStyles.container}>
        <Text style={searchBarButtonStyles.title}>Search By:</Text>

        <View style={searchBarButtonStyles.buttoncontainer}>
          <TouchableOpacity
            style={[searchBarButtonStyles.nameButtonContainer, {
              backgroundColor: this.state.searchBy === 'name' ? '#FFF' : 'rgba(160,162,165,0.5)',
            }]}
            onPress={() => {
              this.setState({ searchBy: 'name' });
            }}
          >
            <Text style={[searchBarButtonStyles.textName, {
              color: this.state.searchBy === 'name' ? '#3C3C3C' : 'rgba(255,255,255,0.5)',
            }]}>
              NAME
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[searchBarButtonStyles.ingrButtonContainer, {
              backgroundColor: this.state.searchBy === 'ingr' ? '#FFF' : 'rgba(160,162,165,0.5)',
            }]}
            onPress={() => {
              this.setState({ searchBy: 'ingr' });
            }}
          >
            <Text style={[searchBarButtonStyles.textIngr, {
              color: this.state.searchBy === 'ingr' ? '#3C3C3C' : 'rgba(255,255,255,0.5)',
            }]}>
              INGREDIENTS
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const endHeight = Dimensions.get('window').height;
    const animatedHeight = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [getStatusBarHeight() + 124, endHeight]
    });
    const isInSearch = this.state.isInSearch;

    return (
      // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {!isInSearch ? (
            <NavigationEvents
            onWillFocus={this.fetchRecipes}
          />) :
          (
            <NavigationEvents
            onWillFocus={this.refs.childrenSearchBarRef.searchInDB}
          />)}
          <Animated.View
            style={{
              width: '100%',
              height: animatedHeight,
            }}
          >
            <LinearGradient
              start={{x: 0, y: 0}} end={{x: 1, y: 1}}
              colors={['#FA967B', '#F56862']}
              style={styles.searchBarContainer}
            >
              <View style={styles.touchContainer}>
                <SearchBar
                  callbackFromParent={this.searchBarFocusCallback}
                  submitCallback={this.searchBarSubmitCallback}
                  showAllCallback={this.searchBarShowAllCallback}
                  ref="childrenSearchBarRef"
                />
                {
                  this.state.isFocusedOnTouchBar
                  ? this.renderCancelButton()
                  : <View></View>
                }

              </View>
               {this.renderSearchOptions()}
            </LinearGradient>
          </Animated.View>

          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
          }>
            <RecipeList queryData={this.state.displayData}/>
          </ScrollView>

          {this.renderAddButton()}
        </View>
      // </TouchableWithoutFeedback>
    );
  }
}

export default RecipeMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  searchBarContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 80,

    width: '100%',
    // height: getStatusBarHeight() + 124,
  },
  touchContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  cancelButtonContainer: {
    width: '13%',
    height: 48,
    // backgroundColor: '#000',
    right: '6%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    color: '#FFF',
    fontSize: 13,
  },
  addButtonContainer: {
    position: 'absolute',
    right: 18,
    bottom: 20,
  },
  addButtonBackground: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 32,
    marginTop: -4,
    marginLeft: 1,
  },
});

const searchBarButtonStyles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 26,

    paddingRight: 25,
    paddingLeft: 25,
  },
  buttoncontainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 7,
  },
  nameButtonContainer: {
    width: '47%',
    alignItems: 'center',
    paddingTop: 8,
    paddingRight: 10,
    paddingBottom: 8,
    paddingLeft: 10,
    borderRadius: 99,
  },
  ingrButtonContainer: {
    width: '47%',
    alignItems: 'center',
    right: 0,
    position: 'absolute',
    paddingTop: 8,
    paddingRight: 10,
    paddingBottom: 8,
    paddingLeft: 10,
    borderRadius: 99,
  },
  title: {
    fontSize: 17,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#FFF',
  },
  textName: {
    fontSize: 13,
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
  textIngr: {
    fontSize: 13,
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
});
