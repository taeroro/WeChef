import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, Dimensions, TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native-paper';

const sectionSize = Dimensions.get('window').width - 40;

class PostNewQuestionScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      question: '',
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

  handleSubmit = () => {
    console.log(this.state.question);
    
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          label = 'Type your question here'
          value = {this.state.question}
          onChangeText= {question => this.setState({question})}
          multiline
          scrollEnabled
          style = {styles.textInput}
          underlineColor = '#F56862'
        />

        <TouchableOpacity
          onPress={() => this.handleSubmit()}
          style={styles.submitContainer}
        >
          <Text style={styles.submitText} >Submit</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

export default PostNewQuestionScreen;

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
