import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, TextInput, TouchableOpacity, Image } from 'react-native';
import { Input, Rating, AirbnbRating } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

const image = 'http://www.getmdl.io/assets/demos/welcome_card.jpg';
const options = {
  title: 'Change Recipe Picture',
  // customButtons: [{ name: 'fb', title: 'Use Facebook Profile Picture' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class RecipePostingScreen extends Component {

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
        quantity: ""
      }],
      imageSource: image,
    };

    this.handleRatingChange = this.handleRatingChange.bind(this);
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
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

  handleSubmitForm = () => {
    console.log(this.state)

    //TODO: upload all data in this.state to db

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
              <View>
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
              <View>
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
            onPress={() => {
              this.handleSubmitForm();
            }}> 
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
