import React, { Component } from 'react';
import { Alert, TextInput, StyleSheet, View, Text, StatusBar, Dimensions, TouchableOpacity, ScrollView, KeyboardAvoidingView, Image} from 'react-native';
//mport { TextInput } from 'react-native-paper';
import { AirbnbRating } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import FBSDK from 'react-native-fbsdk';
import axios from 'axios';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const { AccessToken } = FBSDK;
const DB_PREFIX = 'https://wechef-server-dev.herokuapp.com/';
const image = 'http://www.getmdl.io/assets/demos/welcome_card.jpg';
const options = {
  title: 'Change Recipe Picture',
  // customButtons: [{ name: 'fb', title: 'Use Facebook Profile Picture' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const sectionSize = Dimensions.get('window').width - 40;

class PostNewReviewScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeID: this.props.navigation.state.params.recipeID,
      comment: '',
      rating:5,
      imageSource: image,
      reviewOwnerID: null,

    };
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });

    AccessToken.getCurrentAccessToken().then((data) => {
      this.setState({
        reviewOwnerID: data.userID
      });
    });

  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  handleSubmit = () => {

    if (this.state.imageSource === image) {
      Alert.alert(
        'Please upload a picture',
        'Upload a picture before submission',
        [{test:'OK', }]
      );
      return;
    }
    this.uploadReview(this.state);
  }

  backToRecipe = () => {
    this.props.navigation.state.params.onNavigateBack();
    this.props.navigation.navigate('RecipeSingle', {id: this.state.recipeID});
  }

  uploadReview = (state) => {
    let requestURL = DB_PREFIX + 'recipe/review/create/' + state.recipeID;

    let formdata = new FormData();

    formdata.append('content', state.comment);
    formdata.append('reviewRecipeIDs', state.recipeID);
    formdata.append('reviewOwnerID', state.reviewOwnerID);
    formdata.append('quality', state.rating);
    formdata.append('image', {uri: state.imageSource, name: 'new_review_image.jpg', type: 'image/jpg'});

    axios.post(requestURL, formdata, { headers: {'Content-Type': 'multipart/form-data',} })
      .then(res => {
        console.log(res);
        if (res.status == 201) {
          this.backToRecipe();
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  changeImage = () => {
    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        const source = response.uri;

        console.log(source);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({ imageSource: source, });
      }
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
        contentContainerStyle={styles.keyboardContainer}
        behavior="padding"
        enabled
        >
        <ScrollView>

        <View style={styles.sectionContainer}>
          <Text style = {styles.ratingText}> Rating </Text>
          <AirbnbRating
            reviews = {[]}
            count={5}
            defaultRating={this.state.rating}
            size={20}
            onFinishRating={rating => this.setState({rating})}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.sectionContainer}>
          <Text style = {styles.questionText}> Comment </Text>

          <TextInput
            placeholder = 'What do you think of this recipe?'
            value = {this.state.comment}
            onChangeText= {comment => this.setState({comment})}
            multiline
            scrollEnabled
            style = {styles.textInput}
            underlineColor = '#F56862'
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.sectionContainer}>
        <Text style = {styles.questionText}> Picture of Your Dish </Text>
          <TouchableOpacity onPress={() => this.changeImage()}>
            <Image source={{uri: this.state.imageSource}} style={{width: 100, height: 100}}/>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />


        <View style={styles.sectionContainer}>
          <TouchableOpacity
            onPress={() => this.handleSubmit()}
            style={styles.submitContainer}
          >
            <Text style={styles.submitText} >Submit</Text>
          </TouchableOpacity>
        </View>

        </ScrollView>
        </KeyboardAvoidingView>

      </View>
    );
  }
}

export default PostNewReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingBottom: getBottomSpace(),
  },
  sectionContainer: {
    marginTop: 5,
    marginBottom: 5,
    marginRight: 20,
    marginLeft: 20,
    width: sectionSize,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  ratingText: {
    fontSize: 17,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#3C3C3C',
    flex: 1,
    marginTop: 5,
    marginBottom: -30
  },
  questionText: {
    fontSize: 17,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#3C3C3C',
    flex: 1,
    marginTop: 5,
    marginBottom: 5
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
  textInput: {
    width: '100%',
    //position: 'absolute',
    //top: 10,
    //bottom: 500
  },
  submitContainer: {
    marginTop: 20,
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
