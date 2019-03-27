import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, TextInput, TouchableOpacity, Image } from 'react-native';
import { Input, Rating, AirbnbRating } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import FBSDK from 'react-native-fbsdk';
import axios from 'axios';

const { AccessToken } = FBSDK;

const image = 'http://www.getmdl.io/assets/demos/welcome_card.jpg';
const options = {
  title: 'Change Recipe Picture',
  // customButtons: [{ name: 'fb', title: 'Use Facebook Profile Picture' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

// TODO: after deployment, change localhost to heroku url
const DB_PREFIX = 'http://localhost:8080/';

class RecipePostingScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ownerID: null,
      title: "",
      difficultyRating: 3,
      directions: [{
        step: ""
      }],
      ingredients: [{
        name: "",
        quantity: ""
      }],
      imageSource: image,
    };

    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.backToMain = this.backToMain.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.createAndUploadForm = this.createAndUploadForm.bind(this);
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });

    AccessToken.getCurrentAccessToken().then((data) => {
      this.setState({
        ownerID: data.userID
      });
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  backToMain() {
    this.props.navigation.state.params.onNavigateBack();
    this.props.navigation.navigate('RecipeMain');
  }

  handleTitleChange = text => {
    this.setState({ title: text });
  };

  changeImage() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

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

  handleRatingChange (rating) {
    this.setState({difficultyRating: rating});
  };

  handleIngredientChange = (text, idx) => {

    const newIngredients = this.state.ingredients.map((ingredient, sidx) => {
      if (idx !== sidx) return ingredient;
      return {... ingredient, name: text, quantity: ingredient.quantity };
    });

    this.setState({ ingredients: newIngredients });
  };

  handleIngredientQuantityChange = (text, idx) => {

    const newIngredients = this.state.ingredients.map((ingredient, sidx) => {
      if (idx !== sidx) return {...ingredient};
      return {... ingredient, name: ingredient.name, quantity: text };
    });

    this.setState({ ingredients: newIngredients });

  };

  handleRemoveIngredient = idx => {

    this.setState({
      ingredients: this.state.ingredients.filter((s, sidx) => idx !== sidx)
    });
  };

  handleAddIngredient = () => {
    this.setState({
      ingredients: this.state.ingredients.concat([{ name: "", quantity: "" }])
    });
  };


  handleDirectionChange = (text, idx) => {

    const newDirection = this.state.directions.map((direction, sidx) => {
      if (idx !== sidx) return {...direction};
      return {... direction, step: text };
    });

    this.setState({ directions: newDirection });

  };

  handleRemoveDirection = idx => {

    this.setState({
      directions: this.state.directions.filter((s, sidx) => idx !== sidx)
    });
  };

  handleAddDirection = () => {
    this.setState({
      directions: this.state.directions.concat([{ step: "" }])
    });
  };

  handleSubmitForm () {
    console.log(this.state)

    // upload all data in this.state to db, if success navigate to main page
    this.createAndUploadForm(this.state);
  }

  createAndUploadForm (state) {
    let requestURL = DB_PREFIX + 'recipe/create/';
    let formdata = new FormData();
    formdata.append('title', state.title);
    formdata.append('ownerID', state.ownerID);
    formdata.append('difficulty', state.difficultyRating);
    const isDummyImage = this.state.imageSource == image ? true : false;
    // do not upload the dummy image
    if (!isDummyImage) {
      formdata.append('image', { uri: this.state.imageSource, name: 'new_recipe_image.jpg', type: 'image/jpg' });
    }
    state.ingredients.forEach((ing, idx) => {
      const cnt_name = ing.name;
      const cnt_amount = ing.quantity;
      formdata.append('ingredients['+idx+'][name]', cnt_name);
      formdata.append('ingredients['+idx+'][amount]', cnt_amount);
    });
    state.directions.map((dir) => {
      formdata.append('content[]', dir.step);
    });

    axios.post(requestURL, formdata, { headers: {
          'Content-Type': 'multipart/form-data',
        }})
      .then(res => {
        console.log(res);
        if (res.status == 201) {
          this.backToMain();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.sectionContainer}>
          <Text> Recipe Title </Text>
          <TextInput
            placeholder = "Recipe Title"
            value = {this.state.title}
            onChangeText={(text) => this.handleTitleChange(text)}
          />
        </View>

        <View style={styles.sectionContainer}>
          <TouchableOpacity onPress={() => this.changeImage()}>
            <Image source={{uri: this.state.imageSource}} style={{width: 50, height: 50}}/>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainer}>
          <Text> Difficulty Level </Text>
          <AirbnbRating
            reviews
            count={5}
            defaultRating={this.state.difficultyRating}
            size={20}
            onFinishRating={this.handleRatingChange}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text> Ingredients </Text>
          <View>
            {this.state.ingredients.map((ingredient, idx) => (
              <View key = {idx}>
                <TextInput
                  placeholder={`Ingredient #${idx + 1} Name`}
                  value={ingredient.name}
                  onChangeText={(text) => this.handleIngredientChange(text, idx)}
                />
                <TextInput
                  placeholder={`Ingredient #${idx + 1} Quantity`}
                  value={ingredient.quantity}
                  onChangeText={(text) => this.handleIngredientQuantityChange(text, idx)}
                  keyboardType='numeric'
                />

                <TouchableOpacity
                  style={styles.removeButtonContainer}
                  onPress={() => {
                    this.handleRemoveIngredient(idx);
                  }}>
                    <Text> delete </Text>
                  </TouchableOpacity>
              </View>

            ))}
          </View>

          <TouchableOpacity
            onPress={() => {
              this.handleAddIngredient();
            }}>
            <Text> Add an ingredient </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.sectionContainer}>
          <Text> Directions </Text>
          <View>
            {this.state.directions.map((direction, idx) => (
              <View key={idx}>
                <TextInput
                  placeholder={`Direction #${idx + 1}`}
                  value={direction.step}
                  onChangeText={(text) => this.handleDirectionChange(text, idx)}
                />

                <TouchableOpacity
                  style={styles.removeButtonContainer}
                  onPress={() => {
                    this.handleRemoveDirection(idx);
                  }}>
                    <Text> delete </Text>
                  </TouchableOpacity>
              </View>

            ))}
          </View>

          <TouchableOpacity
            onPress={() => {
              this.handleAddDirection();
            }}>
            <Text> Add a step </Text>
          </TouchableOpacity>

        </View>


        <TouchableOpacity
            onPress={this.handleSubmitForm}>
            <Text> Submit </Text>
        </TouchableOpacity>


      </View>
    );
  }
}

export default RecipePostingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  sectionContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  removeButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    //justifyContent:'flex-start',
    alignItems:'center'
  },

});
