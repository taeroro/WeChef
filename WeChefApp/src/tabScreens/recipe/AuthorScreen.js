import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';

class AuthorScreen extends Component {
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
    return (
      <View>

      </View>
    );
  }
}

export default AuthorScreen;
