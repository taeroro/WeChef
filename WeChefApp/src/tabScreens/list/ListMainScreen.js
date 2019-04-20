import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  SectionList,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import {
  MKColor,
  setTheme,
  MKCheckbox
} from 'react-native-material-kit';

var tempCheckValues = [];

class ListMainScreen extends Component {
  constructor(props) {
    super(props);

    this.animatedValue = new Animated.Value(0);

    this.state = {
      listData: null,
      checkBoxChecked: [],
      displayPopup: false,
      isSelectAll: false,
    };
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });

    tempData = [
      {
        id: "a0",
        recipeName: "Buttermilk Pancakes",
        ingredients: [
          { name: "Eggs", quantity: "2" },
          { name: "Buttermilk", quantity: "2 cups" },
          { name: "Flour", quantity: "2 cups" },
        ]
      },
      {
        id: "a1",
        recipeName: "Lamb Burger",
        ingredients: [
          { name: "Lamb", quantity: "2 lbs" },
          { name: "Blue cheese", quantity: "2 cups" },
          { name: "Onion", quantity: "1" },
        ]
      },
    ];

    // store data to this.state.listData and update checkbox array
    this.setState({ listData: tempData }, () => {
      let tempCheck = [];
      this.state.listData.map((item, index) => {
        tempCheck[index] = {id: item.id, checked: false};
      });
      this.setState({ checkBoxChecked: tempCheck });
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  checkBoxChanged(id, value) {
    this.setState({
      checkBoxChecked: tempCheckValues
    })

    var tempCheckBoxChecked = this.state.checkBoxChecked;
    tempCheckBoxChecked[id].checked = !value;

    this.setState({
      checkBoxChecked: tempCheckBoxChecked
    }, () => {
      // check if popup should display or not
      let trueIndex = this.state.checkBoxChecked.findIndex(obj => obj.checked === true);
      if (trueIndex === -1) {
        this.setState({ displayPopup: false });
        this.animatedValue.setValue(1);
        Animated.timing(
          this.animatedValue,
          {
            toValue: 0,
            duration: 100,
          }
        ).start();
      }
      else if (trueIndex !== -1 && this.state.displayPopup === false) {
        this.setState({ displayPopup: true });
        this.animatedValue.setValue(0);
        Animated.timing(
          this.animatedValue,
          {
            toValue: 1,
            duration: 100,
          }
        ).start();
      }

    });

    console.log(JSON.stringify(this.state.checkBoxChecked));
  }

  selectAll() {
    this.setState({isSelectAll: !this.state.isSelectAll}, () => {
      console.log(this.state.isSelectAll)
    });

    let tempCheck = [];
    this.state.listData.map((item, index) => {
      tempCheck[index] = {id: item.id, checked: true};
    });
    this.setState({ checkBoxChecked: tempCheck });
  }

  unselectAll() {
    this.setState({isSelectAll: !this.state.isSelectAll}, () => {
      console.log(this.state.isSelectAll)
    });

    let tempCheck = [];
    this.state.listData.map((item, index) => {
      tempCheck[index] = {id: item.id, checked: false};
    });
    this.setState({ checkBoxChecked: tempCheck });

    // hide button bar
    this.setState({ displayPopup: false });
    this.animatedValue.setValue(1);
    Animated.timing(
      this.animatedValue,
      {
        toValue: 0,
        duration: 100,
      }
    ).start();
  }

  renderIngredients(recipe) {
    let recipeIndex = this.state.checkBoxChecked.findIndex(obj => obj.id === recipe.id);

    if (recipeIndex !== -1) {
      return (
        <View style={styles.recipeContainer}>
          <MKCheckbox
            checked={this.state.checkBoxChecked[recipeIndex].checked}
            onCheckedChange={() => this.checkBoxChanged(recipeIndex, this.state.checkBoxChecked[recipeIndex].checked)}
          />
          <Text>{recipe.recipeName}</Text>

          <FlatList
            data={recipe.ingredients}
            renderItem={({item}) => (
              <View style={styles.singleIngredient}>
                <Text>{item.name}</Text>
                <Text>{item.quantity}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
            // contentContainerStyle={styles.listContentStyle}
          />

        </View>
      );
    }
  }

  renderShoppingList() {
    return (
      <FlatList
        data={this.state.listData}
        renderItem={({item}) => (
          this.renderIngredients(item)
        )}
        extraData={this.state}
        keyExtractor={item => item.id}
        numColumns={1}
        contentContainerStyle={styles.listContentStyle}
      />
    );
  }

  renderButtonPopupView() {
    // const startY = getStatusBarHeight() + 40 + 45;
    const startY = 49;
    const animatedY = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [startY, 0]
    });

    return (
      <Animated.View style={[buttonPopupStyle.container, {
         transform: [{ translateY: animatedY }]
      }]}>

      <View style={buttonPopupStyle.selectAllBt}>
        <TouchableOpacity
          style={buttonPopupStyle.touchable}
          onPress={() => {
            if (this.state.isSelectAll === false) {
              this.selectAll();
            }
            else {
              this.unselectAll();
            }
        }}>
          <Text style={buttonPopupStyle.buttonText}>
            {this.state.isSelectAll === true
              ? "UNSELECT ALL"
              : "SELECT ALL"
            }
          </Text>
        </TouchableOpacity>
      </View>

      <View style={buttonPopupStyle.deleteBt}>
        <Text style={buttonPopupStyle.buttonText}>
          DELETE
        </Text>
      </View>

      </Animated.View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderButtonPopupView()}

        <View style={styles.titleHeaderContainer}>
          <Text style={styles.headerTitle}>Shopping List</Text>
        </View>

        <View style={styles.contentContainer}>
          {this.renderShoppingList()}
        </View>
      </View>
    );
  }
}

export default ListMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  titleHeaderContainer: {
    marginTop: getStatusBarHeight() + 40,
    marginLeft: 25,
    marginRight: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#3C3C3C',
    fontSize: 37,
    fontWeight: 'bold',
  },
  contentContainer: {
    // zIndex: 7,
    flex: 1,
  },
  listContentStyle: {
    width: '100%',
    justifyContent: 'center',

    backgroundColor: 'lightblue',
  },
  recipeContainer: {

  },
  singleIngredient: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 0, 0, 0.2)'
  },
});
const buttonPopupStyle = StyleSheet.create({
  container: {
    // height: getStatusBarHeight() + 40 + 45,
    zIndex: 5,
    height: 49,
    bottom: 0,
    width: "100%",
    position: "absolute",
    flexDirection: 'row',
  },
  selectAllBt: {
    width: '50%',
    backgroundColor: '#3c3c3c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBt: {
    width: '50%',
    backgroundColor: '#F93822',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textTransform: 'uppercase',
    color: '#FFF',
    fontSize: 15,
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
  touchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
