import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

class IngredientsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
    };
  }

  componentDidMount() {
    this.setState({ ingredients: this.props.navigation.state.params.ingredients })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          style={{width: "100%"}}
        >
          {this.state.ingredients.map((item, i) => {
            return (
              <View style={styles.singleIngredient} key={i}>
                <Text style={[styles.ingredientText, styles.textBackground]}>{item.name}</Text>
                <Text style={[styles.ingredientText, styles.dots]} numberOfLines={1}>
                  ....................................................................................................................
                </Text>
                <Text style={[styles.ingredientText, styles.textRight, styles.textBackground]}>{item.amount}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default IngredientsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    paddingRight: 25,
    paddingLeft: 25,
    marginBottom: getBottomSpace(),
  },
  scrollContainer: {
    flex: 0,
    paddingBottom: 25,
  },
  singleIngredient: {
    flexDirection: 'row',
    marginBottom: 12,

    // backgroundColor: 'rgba(0, 255, 0, 0.2)',
  },
  ingredientText: {
    fontSize: 17,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#3C3C3C',
  },
  textRight: {
    paddingLeft: 7,
    right: 0,
    position: 'absolute',
  },
  textBackground: {
    backgroundColor: '#FFF',
  },
  dots: {
    paddingLeft: 7,
    overflow: 'hidden',
    letterSpacing: 3,
  },
});
