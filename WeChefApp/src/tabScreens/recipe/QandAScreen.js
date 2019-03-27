import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import axios from 'axios';

// TODO: after deployment, change localhost to heroku url
const DB_PREFIX = 'http://localhost:8080/';

class QandAScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeID: this.props.navigation.state.params.recipeID,
      displayQandAs: null,
    };
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });

    this.fetchQandAs();
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  fetchQandAs = () => {
    let requestURL = DB_PREFIX + 'recipe/qa/' + this.state.recipeID;

    axios.get(requestURL)
      .then(res => {
        console.log(res);
        this.setState({ displayQandAs: res.data });
      })
      .catch(error => {
        alert(error);
      })
  }

  /* TODO: display Q and As
  *  backend data in this.state.displayQandAs as an array
  *  e.g. [{_id: "5c9a6869c5df2d2355892920", qContent: "What is the doneness of your lamb?", aContent: "It is medium."}]
  *  NOTE: aContent will be undefined if no one answered yet.
  */

  render() {
    console.log(this.state.displayQandAs);
    return (
      <View style={styles.container}>
        <Text>QandAScreen</Text>
      </View>
    );
  }
}

export default QandAScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});
