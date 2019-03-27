import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import FBSDK from 'react-native-fbsdk';
import axios from 'axios';

// components
import RecipeList from '../components/RecipeList';

const { AccessToken } = FBSDK;

const DB_PREFIX = 'https://wechef-server-dev.herokuapp.com/';

class SavedMainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayData: null,
      currentUserID: null,
    };
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });

    this.fetchSavedRecipes();
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  fetchSavedRecipes = () => {
    AccessToken.getCurrentAccessToken().then((data) => {
      this.setState({
        currentUserID: data.userID
      });

      let requestURL = DB_PREFIX + 'recipe/' + this.state.currentUserID + '/favourite';
      axios.get(requestURL)
        .then(res => {
          console.log(res);
          this.setState({ displayData: res.data });
        })
        .catch(error => {
          alert(error);
        });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleHeaderContainer}>
          <Text style={styles.headerTitle}>Saved Recipes</Text>
        </View>
        <View style={styles.listContainer}>
          <RecipeList queryData={this.state.displayData} />
        </View>
      </View>
    );
  }
}

export default SavedMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  listContainer:{
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
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
});
