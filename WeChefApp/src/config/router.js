import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation';

// non-packages
import RecipeMainScreen from './../tabScreens/recipe/RecipeMainScreen';
import SavedMainScreen from './../tabScreens/saved/SavedMainScreen';
import ListMainScreen from './../tabScreens/list/ListMainScreen';
import ToolsMainScreen from './../tabScreens/tools/ToolsMainScreen';
import ProfileMainScreen from './../tabScreens/profile/ProfileMainScreen';
import ProfileSettingsScreen from './../tabScreens/profile/ProfileSettingsScreen';

// =============================================================================
// Individual Tab's Stack for Screens
// =============================================================================
// 1. Recipe Stack
export const RecipeStack = createStackNavigator(
  {
    RecipeMain: {
      screen: RecipeMainScreen,
      navigationOptions: () => ({
        // headerBackTitle: strings('header_back_title.toolbox'),
      }),
    },
  }
);

// 2. Saved Stack
export const SavedStack = createStackNavigator(
  {
    SavedMain: {
      screen: SavedMainScreen,
      navigationOptions: () => ({
        // headerBackTitle: strings('header_back_title.toolbox'),
      }),
    },
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
        // headerBackTitle: strings('header_back_title.toolbox'),
      }),
    },
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
          // borderBottomWidth: 0,
        }

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

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  iconStyles: {
    width: 27,
    height: 27,
    resizeMode: 'contain',
  },
});
