import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, ActionSheetIOS, StatusBar } from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';

import RecipeList from '../components/RecipeList';

// TODO: after deployment, change localhost to heroku url
const DB_PREFIX = 'http://localhost:8080/';

class ProfileRecipesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayData: null,
      userID: this.props.navigation.state.params.userID,
    };
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });

    this.fetchMyRecipes();
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  fetchMyRecipes = () => {
    let requestURL = DB_PREFIX + 'recipe/by-owner/' + this.state.userID;

    axios.get(requestURL)
      .then(res => {
        console.log(res);
        this.setState({ displayData: res.data });
      })
      .catch(error => {
        alert(error);
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleHeaderContainer}>
          <Text style={styles.headerTitle}>My Recipes</Text>
        </View>

        <View style={styles.listContainer}>
          <RecipeList queryData={this.state.displayData} />
        </View>

      </View>
    );
  }
}

export default ProfileRecipesScreen;

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
    marginTop: 10,
    paddingLeft: 25,
    paddingRight: 25,
  },
  headerTitle: {
    color: '#3C3C3C',
    fontSize: 32,
    fontWeight: 'bold',
  },
  listConatiner: {
    marginTop: 20,
    backgroundColor: '#FFF',
  },
  settingContainerStyle: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: '#D2D2D2',
  },
  settingTitleStyle: {
    marginLeft: 15,
    fontWeight: '400',
    fontSize: 16,
    color: '#3C3C3C',
    letterSpacing: 0.5,
  },
});
