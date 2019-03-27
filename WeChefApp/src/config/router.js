import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import { Button } from 'react-native-elements';

// non-packages
import RecipeMainScreen from './../tabScreens/recipe/RecipeMainScreen';
import RecipeSingleScreen from './../tabScreens/recipe/RecipeSingleScreen';
import RecipePostingScreen from './../tabScreens/recipe/RecipePostingScreen';
import RecipeEditScreen from './../tabScreens/recipe/RecipeEditScreen';
import QandAScreen from './../tabScreens/recipe/QandAScreen';
import PostNewQuestionScreen from './../tabScreens/recipe/PostNewQuestionScreen';
import AnswerAQuestionScreen from './../tabScreens/recipe/AnswerAQuestionScreen';
import IngredientsScreen from './../tabScreens/recipe/topTabBar/IngredientsScreen';
import DirectionsScreen from './../tabScreens/recipe/topTabBar/DirectionsScreen';
import SavedMainScreen from './../tabScreens/saved/SavedMainScreen';
import ListMainScreen from './../tabScreens/list/ListMainScreen';
import ToolsMainScreen from './../tabScreens/tools/ToolsMainScreen';
import ToolsAppTemp from './../tabScreens/tools/ToolsAppTemp';
import ToolsAppWeight from './../tabScreens/tools/ToolsAppWeight';
import ToolsAppVolume from './../tabScreens/tools/ToolsAppVolume';
import ProfileMainScreen from './../tabScreens/profile/ProfileMainScreen';
import ProfileSettingsScreen from './../tabScreens/profile/ProfileSettingsScreen';
import ProfileRecipesScreen from './../tabScreens/profile/ProfileRecipesScreen';
import LoginScreen from './../login/LoginScreen';

// =============================================================================
// Individual Tab's Stack for Screens
// =============================================================================
const tabbarVisible = (navigation) => {
  const { routes } = navigation.state;

  let showTabbar = true;
  routes.forEach((route) => {
    if (route.routeName === 'RecipeSingle') {
      showTabbar = false;
    }
  });

  return showTabbar;
};

// 1. Recipe Stack
const IngAndDirTab = createMaterialTopTabNavigator({
  ingredients: IngredientsScreen,
  directions: DirectionsScreen,
}, {
  tabBarOptions: {
    scrollEnabled: true,
    labelStyle: {
      fontSize: 13,
      color: '#3C3C3C',
    },
    tabStyle: {
      width: Dimensions.get('window').width / 2,
    },
    style: {
      backgroundColor: '#fff',
    },
    indicatorStyle: {
      backgroundColor: '#3C3C3C'
    }
  },
});

export const RecipeStack = createStackNavigator(
  {
    RecipeMain: {
      screen: RecipeMainScreen,
      navigationOptions: () => ({
        header: null,
        headerBackTitle: null,
      }),
    },
    RecipeSingle: {
      screen: RecipeSingleScreen,
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#fff',
          marginHorizontal: 10,
          marginVertical: 5,
          borderBottomWidth: 0,
        },
        headerTintColor: '#3C3C3C',
        headerRight: (
          <View style={{
            flexDirection: 'row'
          }}>
            <Button
              icon={{
                name: "square-edit-outline",
                type:'material-community',
                size: 26,
                color: '#3C3C3C'
              }}
              buttonStyle={{
                backgroundColor: 'transparent'
              }}
              onPress={() => {
                navigation.navigate('RecipeEdit', {recipeObj: navigation.getParam('recipeObj')});
              }}
            />

            <Button
              icon={{
                name: "bookmark",
                type:'material-community',
                size: 26,
                color: navigation.getParam('saved') ? '#FE444D' : '#A0A2A5'
              }}
              buttonStyle={{
                backgroundColor: 'transparent'
              }}
              onPress={() => {
                // TODO: connect to backend, upload whether this recipe is
                // saved or not.

                // But don't touch the one below. It's for UI. But you can
                // put this line of code after upload the new saving status
                // to the backend (e.g. inside of .then())
                let isSaved = navigation.getParam('saved');
                navigation.setParams({ saved: !isSaved });
              }}
            />
          </View>

        ),
      }),
    },
    IngAndDir: {
      screen: IngAndDirTab,
      navigationOptions: () => ({
        headerStyle: {
          backgroundColor: '#fff',
          marginHorizontal: 10,
          marginVertical: 5,
          borderBottomWidth: 0,
        },
        headerTintColor: '#3C3C3C',
        // headerBackImage: <Image source={require('./../../assets/img/icons8-multiply.png')} />,
        headerBackTitleStyle: {
          color: '#fff'
        },
      }),
    },
    QandA: {
      screen: QandAScreen,
      navigationOptions: () => ({
        headerStyle: {
          backgroundColor: '#fff',
          marginHorizontal: 10,
          marginVertical: 5,
          borderBottomWidth: 0,
        },
        headerTintColor: '#3C3C3C',
        // headerBackImage: <Image source={require('./../../assets/img/icons8-multiply.png')} />,
        headerBackTitleStyle: {
          color: '#fff'
        },
      }),
    },
    AnswerAQuestion: {
      screen: AnswerAQuestionScreen,
      navigationOptions: () => ({
        headerStyle: {
          backgroundColor: '#fff',
          marginHorizontal: 10,
          marginVertical: 5,
          borderBottomWidth: 0,
        },
        headerTintColor: '#3C3C3C',
        // headerBackImage: <Image source={require('./../../assets/img/icons8-multiply.png')} />,
        headerBackTitleStyle: {
          color: '#fff'
        },
      }),
    },
    PostNewQuestion: {
      screen: PostNewQuestionScreen,
      navigationOptions: () => ({
        headerStyle: {
          backgroundColor: '#fff',
          marginHorizontal: 10,
          marginVertical: 5,
          borderBottomWidth: 0,
        },
        headerTintColor: '#3C3C3C',
        // headerBackImage: <Image source={require('./../../assets/img/icons8-multiply.png')} />,
        headerBackTitleStyle: {
          color: '#fff'
        },
      }),
    },
    RecipePosting: {
      screen: RecipePostingScreen,
      navigationOptions: () => ({
        headerStyle: {
          backgroundColor: '#fff',
          marginHorizontal: 10,
          marginVertical: 5,
          borderBottomWidth: 0,
        },
        headerTintColor: '#3C3C3C',
      }),
    },
    RecipeEdit: {
      screen: RecipeEditScreen,
      navigationOptions: () => ({
        headerStyle: {
          backgroundColor: '#fff',
          marginHorizontal: 10,
          marginVertical: 5,
          borderBottomWidth: 0,
        },
        headerTintColor: '#3C3C3C',
      }),
    },
  },
  {
    headerMode: "screen",
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: tabbarVisible(navigation),
    }),
    transitionConfig: () => ({
      screenInterpolator: props => {
        // Basically you need to create a condition for individual scenes
       if (props.scene.route.routeName === 'IngAndDir'
          || props.scene.route.routeName === 'QandA'
          || props.scene.route.routeName === 'PostNewQuestion'
        ) {

         // forVertical makes the scene transition for Top to Bottom
         return StackViewStyleInterpolator.forVertical(props);
       }

       const last = props.scenes[props.scenes.length - 1];

       // This controls the transition when navigation back to a specific scene
       if (last.route.routeName === 'IngAndDir'
          || last.route.routeName === 'QandA'
          || last.route.routeName === 'PostNewQuestion'
        ) {

         // Here, forVertical flows from Top to Bottom
         return StackViewStyleInterpolator.forVertical(props);
       }

       return StackViewStyleInterpolator.forHorizontal(props);
      }
    }),
  },
);

// 2. Saved Stack
export const SavedStack = createStackNavigator(
  {
    SavedMain: {
      screen: SavedMainScreen,
      navigationOptions: () => ({
        // headerBackTitle: strings('header_back_title.toolbox'),
        header: null,
        headerBackTitle: null,
      }),
    },
    RecipeSingle: {
      screen: RecipeSingleScreen,
      navigationOptions: () => ({
        headerStyle: {
          backgroundColor: '#fff',
          marginHorizontal: 10,
          marginVertical: 5,
          borderBottomWidth: 0,
        },
        headerTintColor: '#3C3C3C',
      }),
    },
    IngAndDir: {
      screen: IngAndDirTab,
      navigationOptions: () => ({
        // header: null,
        headerStyle: {
          backgroundColor: '#fff',
          marginHorizontal: 10,
          marginVertical: 5,
          borderBottomWidth: 0,
        },
        headerTintColor: '#3C3C3C',
      }),
    }
  },
  {
    headerMode: "screen",
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: tabbarVisible(navigation),
    }),
  }
);

// 3. List Stack
export const ListStack = createStackNavigator(
  {
    ListMain: {
      screen: ListMainScreen,
      navigationOptions: () => ({
        // headerBackTitle: strings('header_back_title.toolbox'),
      }),
    },
  }
);

// 4. List Stack
export const ToolsStack = createStackNavigator(
  {
    ToolsMain: {
      screen: ToolsMainScreen,
      navigationOptions: () => ({
        header: null,
        headerBackTitle: null,
      }),
    },
    ToolsTemp: {
      screen: ToolsAppTemp,
      navigationOptions: () => ({
        headerTitle: "Temperature",
        headerStyle: {
          backgroundColor: '#fff',
          marginHorizontal: 10,
          marginVertical: 5,
          borderBottomWidth: 0,
        },
        headerTintColor: '#3C3C3C'
      }),
    },
    ToolsWeight: {
      screen: ToolsAppWeight,
      navigationOptions: () => ({
        headerTitle: "Weight",
        headerStyle: {
          backgroundColor: '#fff',
          marginHorizontal: 10,
          marginVertical: 5,
          borderBottomWidth: 0,
        },
        headerTintColor: '#3C3C3C'
      }),
    },
    ToolsVolume: {
      screen: ToolsAppVolume,
      navigationOptions: () => ({
        headerTitle: "Volume",
        headerStyle: {
          backgroundColor: '#fff',
          marginHorizontal: 10,
          marginVertical: 5,
          borderBottomWidth: 0,
        },
        headerTintColor: '#3C3C3C'
      }),
    },
  },
  {
    headerMode: "screen",
  }
);

// 5. Profile Stack
export const ProfileStack = createStackNavigator(
  {
    ProfileMain: {
      screen: ProfileMainScreen,
      navigationOptions: () => ({
        header: null,
        headerBackTitle: null,
      }),
    },
    ProfileSettings: {
      screen: ProfileSettingsScreen,
      navigationOptions: () => ({
        headerStyle: {
          backgroundColor: '#fff',
          marginHorizontal: 10,
          marginVertical: 5,
          borderBottomWidth: 0,
        },
        headerTintColor: '#3C3C3C'

      }),
    },
    ProfileRecipes: {
      screen: ProfileRecipesScreen,
      navigationOptions: () => ({
        headerStyle: {
          backgroundColor: '#fff',
          marginHorizontal: 10,
          marginVertical: 5,
          borderBottomWidth: 0,
        },
        headerTintColor: '#3C3C3C'

      }),
    },
    RecipeSingle: {
      screen: RecipeSingleScreen,
      navigationOptions: () => ({
        headerStyle: {
          backgroundColor: '#fff',
          marginHorizontal: 10,
          marginVertical: 5,
          borderBottomWidth: 0,
        },
        headerTintColor: '#3C3C3C',
      }),
    },
    IngAndDir: {
      screen: IngAndDirTab,
      navigationOptions: () => ({
        // header: null,
        headerStyle: {
          backgroundColor: '#fff',
          marginHorizontal: 10,
          marginVertical: 5,
          borderBottomWidth: 0,
        },
        headerTintColor: '#3C3C3C',
      }),
    }
  },
  {
    headerMode: "screen",
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: tabbarVisible(navigation),
    }),
  }
);

// 6. Login Stack
export const LoginStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: () => ({
        // headerBackTitle: strings('header_back_title.toolbox'),
      }),
    },
  }
);

// =============================================================================
// Bottom Tab
// =============================================================================
const TabNavigator = createBottomTabNavigator(
  {
    // Tab 1 Recipe
    Recipe: {
      screen: RecipeStack,
      navigationOptions: {
        tabBarLabel: "Recipe",
      },
    },

    // Tab 2 Saved (Favorite)
    Saved: {
      screen: SavedStack,
      navigationOptions: {
        tabBarLabel: "Saved",
      }
    },

    // Tab 3 List (Shopping List)
    List: {
      screen: ListStack,
      navigationOptions: {
        tabBarLabel: "List",
      }
    },

    // Tab 4 Tools (Conversion tools)
    Tools: {
      screen: ToolsStack,
      navigationOptions: {
        tabBarLabel: "Tools",
      }
    },

    // Tab 5 Profile
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: "Profile",
      }
    }
  },

  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;

        switch(routeName) {
          case 'Recipe':
            return (
              focused
              ? (
                <Image
                  source={require('../../assets/img/icons/icons8-kitchen.png')}
                  style={[ styles.iconStyles, { tintColor: tintColor } ]}
                />
              )
              : (
                <Image
                  source={require('../../assets/img/icons/icons8-cooking_pot.png')}
                  style={[ styles.iconStyles, { tintColor: tintColor } ]}
                />
              )
            );
          case 'Saved':
            return (
              focused
              ? (
                <Image
                  source={require('../../assets/img/icons/icons8-bookmark.png')}
                  style={[ styles.iconStyles, { tintColor: tintColor } ]}
                />
              )
              : (
                <Image
                  source={require('../../assets/img/icons/icons8-bookmark_outline.png')}
                  style={[ styles.iconStyles, { tintColor: tintColor } ]}
                />
              )
            );
          case 'List':
            return (
              focused
              ? (
                <Image
                  source={require('../../assets/img/icons/icons8-shopping_cart.png')}
                  style={[ styles.iconStyles, { tintColor: tintColor } ]}
                />
              )
              : (
                <Image
                  source={require('../../assets/img/icons/icons8-shopping_cart_outline.png')}
                  style={[ styles.iconStyles, { tintColor: tintColor } ]}
                />
              )
            );
          case 'Tools':
            return (
              focused
              ? (
                <Image
                  source={require('../../assets/img/icons/icons8-wrench.png')}
                  style={[ styles.iconStyles, { tintColor: tintColor } ]}
                />
              )
              : (
                <Image
                  source={require('../../assets/img/icons/icons8-wrench_outline.png')}
                  style={[ styles.iconStyles, { tintColor: tintColor } ]}
                />
              )
            );
          case 'Profile':
            return (
              focused
              ? (
                <Image
                  source={require('../../assets/img/icons/icons8-user_male_circle.png')}
                  style={[ styles.iconStyles, { tintColor: tintColor } ]}
                />
              )
              : (
                <Image
                  source={require('../../assets/img/icons/icons8-user_male_circle_outline.png')}
                  style={[ styles.iconStyles, { tintColor: tintColor } ]}
                />
              )
            );
        }

      },
    }),
    tabBarOptions: {
      activeTintColor: '#F56862',
      inactiveTintColor: '#A0A2A5',
    },
  }
);

export default TabNavigator;

const styles = StyleSheet.create({
  iconStyles: {
    width: 27,
    height: 27,
    resizeMode: 'contain',
  },
});
