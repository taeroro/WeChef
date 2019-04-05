import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const DB_PREFIX = 'https://wechef-server-dev.herokuapp.com/';
const sectionSize = Dimensions.get('window').width - 40;

class PostNewReviewScreen extends Component {
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
      <View style={styles.container}>
        <Text>PostNewReviewScreen</Text>
      </View>
    );
  }
}

export default PostNewReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingBottom: getBottomSpace(),
  },
});
