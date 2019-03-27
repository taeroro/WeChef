import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const sectionSize = Dimensions.get('window').width - 40;

class DirectionsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      directions: [],
    };
  }

  componentDidMount() {
    this.setState({ directions: this.props.navigation.state.params.content });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          style={{width: "100%"}}
        >
          {this.state.directions.map((item, i) => {
            return (
              <View style={styles.singleStep} key={i}>
                <View style={styles.stepNumContainer}>
                  <Text style={[styles.stepText, styles.stepN]}>N° </Text>
                  <Text style={[styles.stepText, styles.stepNum]}>{i+1}</Text>
                </View>
                <Text style={[styles.stepText, styles.stepContent]}>{item}</Text>

                <View style={styles.divider} />
              </View>
            );
          })}
        </ScrollView>
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
    paddingTop: 20,
    paddingRight: 25,
    paddingLeft: 25,
    marginBottom: getBottomSpace(),
  },
  scrollContainer: {
    flex: 0,
    paddingBottom: 25,
  },
  singleStep: {

  },
  stepText: {
    fontFamily: 'Poppins',
  },
  stepNumContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',

  },
  stepN: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F56862',
    paddingBottom: 8,
  },
  stepNum: {
    fontSize: 36,
    fontWeight: '600',
    color: '#F56862',
  },
  stepContent: {
    fontSize: 14,
    fontWeight: '400',
    color: '#3C3C3C',
  },
  divider: {
    marginTop: 20,
    marginBottom: 20,
    height: 0.8,
    width: sectionSize,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});
