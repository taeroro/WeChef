import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, ScrollView, Dimensions, Image, } from 'react-native';
import axios from 'axios';
import { AirbnbRating } from 'react-native-elements';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import FBSDK from 'react-native-fbsdk';

const DB_PREFIX = 'https://wechef-server-dev.herokuapp.com/';
const sectionSize = Dimensions.get('window').width - 40;

const image = 'http://www.getmdl.io/assets/demos/welcome_card.jpg';
const tempReview = [
  {rating: 5, comment: 'good', imageSource: image}, 
  {rating: 3, comment: 'its okay.. i followed all the steps but i cannot make it look as pretty as yours', imageSource: image}, 
  {rating: 4, comment: 'good', imageSource: image}, 
  {rating: 4, comment: 'good', imageSource: image}, 
];

class ReviewsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allReviews: null,
    };
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });

    this.fetchAllReviews();
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  fetchAllReviews = () => {
    this.setState({allReviews: tempReview});

    // TODO: load data to this.state.allReviews
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.titleHeaderContainer}>
            <Text style={styles.headerTitle}>Reviews</Text>
          </View>

          {(this.state.allReviews != null) ? (
            <View>
              {this.state.allReviews.map((review, idx) => (
                <View key={idx} >
                
                  <View style={styles.qnaContainer}>
                    {review.imageSource != null ? 
                      <Image
                        resizeMode={"cover"}
                        style={styles.reviewImage}
                        source={{uri: review.imageSource}}
                      /> : null
                    }

                    <Text style = {styles.ratingText}>
                      Rating:
                    </Text>
                    <AirbnbRating
                      reviews = {[]}
                      count={5}
                      defaultRating={review.rating}
                      size={20}
                      isDisabled='true'
                    />

                    <Text style = {styles.qnaContentText}>
                      Comment: 
                    </Text>
                    <Text style = {styles.commentContentText}>
                      {review.comment}
                    </Text>


                  </View>

                  <View style={styles.divider} />

                </View>

              ))}
            </View>
          ):null}

        </ScrollView>
      </View>
    );
  }
}

export default ReviewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#FFF',
    paddingBottom: getBottomSpace(),
  },
  scrollContainer: {
    flex: 0,

    paddingBottom: 25,
    // backgroundColor: 'rgba(0, 255, 0, 0.2)',
  },
  titleHeaderContainer: {
    marginTop: 10,
    paddingLeft: 25,
    paddingRight: 25,
    marginBottom: 10
  },
  headerTitle: {
    color: '#3C3C3C',
    fontSize: 32,
    fontWeight: 'bold',
  },
  reviewImage: {
    flex: 1,
    width: Dimensions.get('window').width-40,
    height: Dimensions.get('window').width-40,
  },
  qnaContainer: {
    marginTop: 5,
    marginBottom: 5,
    marginRight: 20,
    marginLeft: 20,
    width: sectionSize,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

    // backgroundColor: 'rgba(100, 0, 0, 0.4)',
  },
  qnaContentText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#3C3C3C',
    marginTop: 20,
  },
  commentContentText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#3C3C3C',
  },
  ratingText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#3C3C3C',
    flex: 1,
    marginTop: 5,
    marginBottom: -35
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 20,
    marginLeft: 20,
    height: 0.8,
    width: sectionSize,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});
