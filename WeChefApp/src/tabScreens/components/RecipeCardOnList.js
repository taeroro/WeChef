import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import {
  MKButton,
  MKColor,
  MKIconToggle,
  getTheme,
} from 'react-native-material-kit';

const theme = getTheme();
const base64Icon = 'http://www.getmdl.io/assets/demos/welcome_card.jpg';
const action = <Text> My action</Text>;
// const menu = (
//     <MKIconToggle
//         checked={true}
//         onCheckedChange={this._onIconChecked}
//         onPress={this._onIconClicked}
//     >
//       <Text pointerEvents="none"
//             style={styles.toggleTextOff}>Off</Text>
//       <Text state_checked={true}
//             pointerEvents="none"
//             style={[styles.toggleText, styles.toggleTextOn]}>On</Text>
//     </MKIconToggle>
// );

class RecipeCardOnList extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <View style={[theme.cardStyle, styles.cardContainer]}>
        <Image source={{uri: base64Icon}} style={[theme.cardImageStyle, styles.cardImage]}/>
        <Text style={theme.cardContentStyle}>
          Healthy Granola Bowl
        </Text>
      </View>
    );
  }
}

export default RecipeCardOnList;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 7,
    shadowColor: 'transparent',
  },
  cardImage: {

  },
});
