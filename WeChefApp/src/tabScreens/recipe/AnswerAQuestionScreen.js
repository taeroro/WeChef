import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, Dimensions, TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native-paper';
import FBSDK from 'react-native-fbsdk';
import axios from 'axios';

const { AccessToken } = FBSDK;
// TODO: after deployment, change localhost to heroku url
const DB_PREFIX = 'http://localhost:8080/';

const sectionSize = Dimensions.get('window').width - 40;

class AnswerAQuestionScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      recipeID: this.props.navigation.state.params.recipeID,
      qOwnerID: null,
      answer: '',
    };
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });

    AccessToken.getCurrentAccessToken().then((data) => {
      this.setState({
        qOwnerID: data.userID
      });
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  handleSubmit = () => {
    console.log(this.state.answer);

    //this.uploadQuestion(this.state);
  }

  backToQnA = () => {
    this.props.navigation.navigate('QandA', {recipeID: this.state.recipeID});
  }

  // uploadQuestion = (state) => {
  //   let requestURL = DB_PREFIX + 'recipe/qa/create/' + state.recipeID;
  //
  //   axios.post(requestURL, { qContent: state.question, qOwnerID: state.qOwnerID })
  //     .then(res => {
  //       console.log(res);
  //       if (res.status == 201) {
  //         this.backToQnA();
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  // }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          label = 'Type your answer here'
          value = {this.state.answer}
          onChangeText= {answer => this.setState({answer})}
          multiline
          scrollEnabled
          style = {styles.textInput}
          underlineColor = '#F56862'
        />

        <TouchableOpacity
          onPress={() => this.handleSubmit()}
          style={styles.submitContainer}
        >
          <Text style={styles.submitText} >Submit Answer</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

export default AnswerAQuestionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  textInput: {
    width: '80%',
    position: 'absolute',
    top: 10,
    bottom: 500
  },
  submitContainer: {
    marginTop: -100,
    width: sectionSize,
    alignItems: 'center',
  },
  submitText: {
    fontSize: 15,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#F56862',
  }
});
