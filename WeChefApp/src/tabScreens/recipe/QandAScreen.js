import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { getBottomSpace } from 'react-native-iphone-x-helper';

// TODO: after deployment, change localhost to heroku url
const DB_PREFIX = 'http://localhost:8080/';
const sectionSize = Dimensions.get('window').width - 40;

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

 handleAnswerQuestion = () => {

 }

  render() {
    console.log(this.state.displayQandAs);
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.titleHeaderContainer}>
            <Text style={styles.headerTitle}>Q & A</Text>
          </View>

          {(this.state.displayQandAs != null) ? (
            <View>
              {this.state.displayQandAs.map((qna, idx) => (
                <View key={idx} >
                  <View style={styles.qnaContainer}>

                    <Text style = {styles.qnaContentText}>
                      Q: {qna.qContent}
                    </Text>

                    {(qna.aContent != undefined) ? (
                      <Text style = {styles.qnaContentText}>
                        A: {qna.aContent}
                      </Text>
                    ) : (
                      <TouchableOpacity
                        style={styles.answerButtonContainer}
                        onPress={() => {this.props.navigation.navigate('AnswerAQuestion', {questionId: qna._id});
                      }}>
                        <Text style = {styles.answerButtonText}> Answer this question </Text>
                      </TouchableOpacity>
                    )}
                  
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

export default QandAScreen;

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
  },
  headerTitle: {
    color: '#3C3C3C',
    fontSize: 32,
    fontWeight: 'bold',
  },
  answerButtonContainer: {
    marginTop: 10,
    width: sectionSize,
    //alignItems: 'center',

    // backgroundColor: 'rgba(100, 0, 0, 0.4)',
  },
  answerButtonText: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#F56862',
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
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#3C3C3C',
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
