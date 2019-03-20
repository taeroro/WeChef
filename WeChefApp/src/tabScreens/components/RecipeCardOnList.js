import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import {
  MKButton,
  MKColor,
  MKIconToggle,
  getTheme,
} from 'react-native-material-kit';
import { Rating } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

const theme = getTheme();
const image = 'http://www.getmdl.io/assets/demos/welcome_card.jpg';

class RecipeCardOnList extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity onPress={() => {
        this.props.navigation.navigate('RecipeSingle',
          {id: this.props.item.id}
        );
      }}>
        <View style={[theme.cardStyle, styles.cardContainer]}>
          <Image
            source={{uri: image}}
            style={[theme.cardImageStyle, {
              height: this.props.size - 16
            }]}
          />
          <Text style={styles.titleStyle} numberOfLines={1}>
            {this.props.item.name}
          </Text>
          <View style={styles.ratingContainer}>
            <Rating
              imageSize={8}
              readonly
              type={'custom'}
              ratingColor={'#F56862'}
              startingValue={this.props.item.difficultyRating}
              ratingCount={this.props.item.difficultyRating}
              style={styles.rating}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(RecipeCardOnList);

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 7,
    // backgroundColor: 'lightblue',
    shadowColor: 'transparent',
  },
  titleStyle: {
    marginTop: 5,
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '500',
    color: '#3C3C3C',
  },
  ratingContainer: {
    width: '100%',
    // backgroundColor: 'red',
    alignItems: 'flex-start',
  },
  rating: {
    backgroundColor: 'transparent',
  },
});
