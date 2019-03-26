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

  /*
  * TODO: display directions
  * Backend data stored in params.content.
  * e.g. ["Put sugar into milk", "Grind mix of ice and milk"]
  */

  render() {
    console.log(this.props.navigation.state.params.content);
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
