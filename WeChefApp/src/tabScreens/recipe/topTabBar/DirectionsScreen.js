import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

class DirectionsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    console.log('test = '+this.props.navigation.state.params.test);
    return (
      <View style={styles.container}>
        <Text>DirectionsScreen</Text>
      </View>
    );
  }
}

export default DirectionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
