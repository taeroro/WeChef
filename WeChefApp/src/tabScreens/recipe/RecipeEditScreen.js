import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, TextInput, TouchableOpacity, Image, ScrollView, Dimensions,KeyboardAvoidingView } from 'react-native';
import { Input, Rating, AirbnbRating } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const sectionSize = Dimensions.get('window').width - 40;
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


class RecipeEditScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      difficultyRating: 3,
      directions: [{
        step: ""
      }],
      ingredients: [{
        name: "",
        amount: ""
      }],
      imageSource: image,
    };

    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.backToRecipe = this.backToRecipe.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);

  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });

    const recipeObj = this.props.navigation.state.params.recipeObj;
    this.setState({
      title: recipeObj.title,
      difficultyRating: recipeObj.difficulty,
      directions: recipeObj.content.map((content, sidx) => {
        if (recipeObj.content.length !== sidx) return {step: content};
        return {... content, step: content };
      }),
      ingredients: recipeObj.ingredients,
      imageSource: (recipeObj.recipeImageURL==='null')?(image):(recipeObj.recipeImageURL)
    });

    // const newDirection = recipeObj.content.map((content, sidx) => {
    //   if (recipeObj.content.length !== sidx) return {step: content};
    //   return {... content, step: content };
    // });
    // this.setState({directions: newDirection});
  }

  componentWillUnmount() {
    this._navListener.remove();
  }


  backToRecipe() {
    this.props.navigation.state.params.onNavigateBack();
    this.props.navigation.navigate('RecipeSingle', {id: this.props.navigation.state.params.recipeID});
  }

  createAndUploadForm (state) {
    let requestURL = DB_PREFIX + 'recipe/edit/' + this.props.navigation.state.params.recipeID;

    let formdata = new FormData();
    formdata.append('title', state.title);
    formdata.append('difficulty', state.difficultyRating);
    const isDummyImage = this.state.imageSource == image ? true : false;
    // do not upload the dummy image
    if (!isDummyImage) {
      formdata.append('image', { uri: this.state.imageSource, name: 'new_recipe_image.jpg', type: 'image/jpg' });
    }
    state.ingredients.forEach((ing, idx) => {
      const cnt_name = ing.name;
      const cnt_amount = ing.amount;
      formdata.append('ingredients['+idx+'][name]', cnt_name);
      formdata.append('ingredients['+idx+'][amount]', cnt_amount);
    });
    state.directions.map((dir) => {
      formdata.append('content[]', dir.step);
    });

    axios.put(requestURL, formdata, { headers: {
          'Content-Type': 'multipart/form-data',
        }})
      .then(res => {
        console.log(res);
        if (res.status == 200) {
          this.backToRecipe();
        }
      })
      .catch(error => {
        alert(error);
      });
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
      return {... ingredient, name: text, amount: ingredient.amount };
    });

    this.setState({ ingredients: newIngredients });
  };

  handleIngredientQuantityChange = (text, idx) => {

    const newIngredients = this.state.ingredients.map((ingredient, sidx) => {
      if (idx !== sidx) return {...ingredient};
      return {... ingredient, name: ingredient.name, amount: text };
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
      ingredients: this.state.ingredients.concat([{ name: "", amount: "" }])
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

    this.createAndUploadForm(this.state);
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
        <View style={styles.titleHeaderContainer}>
          <Text style={styles.headerTitle}>Edit the Recipe</Text>
        </View>


        <View style={styles.sectionContainer}>
          <Text style = {styles.questionText}> Recipe Title </Text>
          <TextInput
            placeholder = "Recipe Title"
            value = {this.state.title}
            onChangeText={(text) => this.handleTitleChange(text)}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.sectionContainer}>
        <Text style = {styles.questionText}> Recipe Image </Text>
          <TouchableOpacity onPress={() => this.changeImage()}>
            <Image source={{url: this.state.imageSource}} style={{width: 50, height: 50}}/>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.sectionContainer}>
          <Text style = {styles.questionText}> Difficulty Level </Text>
          <AirbnbRating
            reviews = {[]}
            count={5}
            defaultRating={this.state.difficultyRating}
            size={20}
            onFinishRating={this.handleRatingChange}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.sectionContainer}>
          <Text style = {styles.questionText}> Ingredients </Text>
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
                  value={ingredient.amount}
                  onChangeText={(text) => this.handleIngredientQuantityChange(text, idx)}
                />

                <TouchableOpacity
                  style={styles.removeButtonContainer}
                  onPress={() => {
                    this.handleRemoveIngredient(idx);
                  }}>
                    <Text style = {styles.removeButtonText}> delete </Text>
                  </TouchableOpacity>
              </View>

            ))}
          </View>

          <TouchableOpacity
            style = {styles.addButtonContainer}
            onPress={() => {
              this.handleAddIngredient();
            }}>
            <Text style = {styles.addButtonText}> Add an ingredient </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.divider} />

        <View style={styles.sectionContainer}>
          <Text style = {styles.questionText}> Directions </Text>
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
                    <Text style = {styles.removeButtonText}> delete </Text>
                  </TouchableOpacity>
              </View>

            ))}
          </View>


          <TouchableOpacity
            style = {styles.addButtonContainer}
            onPress={() => {
              this.handleAddDirection();
            }}>
            <Text style = {styles.addButtonText}> Add a step </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.divider} />

        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style = {styles.submitButtonContainer}
            onPress={this.handleSubmitForm}>
            <Text style = {styles.submitButtonText}> Submit </Text>
          </TouchableOpacity>
        </View>


      </ScrollView>
      </KeyboardAvoidingView>

      </View>
    );
  }
}

export default RecipeEditScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#FFF',
    paddingBottom: getBottomSpace(),
  },
  keyboardContainer:{

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
  sectionContainer: {
    marginTop: 5,
    marginBottom: 5,
    marginRight: 20,
    marginLeft: 20,
    width: sectionSize,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  removeButtonContainer: {
    marginTop: 10,
    width: sectionSize,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  removeButtonText:{
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#F56862',
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
  submitButtonContainer:{
    marginTop: 20,
    width: sectionSize,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#F56862',
  },
  addButtonContainer:{
    marginTop: 10,
    width: sectionSize,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#F56862',
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
