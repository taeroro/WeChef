import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation';

// non-packages
import RecipeMainScreen from './../tabScreens/recipe/RecipeMainScreen';
import SavedMainScreen from './../tabScreens/saved/SavedMainScreen';
import ListMainScreen from './../tabScreens/list/ListMainScreen';
import ToolsMainScreen from './../tabScreens/tools/ToolsMainScreen';
import ProfileMainScreen from './../tabScreens/profile/ProfileMainScreen';

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
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        // const { routeName } = navigation.state;

        // switch(routeName) {
        //   case 'Recipe':
        //     return (
        //       <Image
        //         source={require('../images/YintechLabsCrop.png')}
        //         style={[ styles.iconStyles, { tintColor: tintColor } ]}
        //       />
        //     )
        //   case 'Saved':
        //     return (
        //       <Image
        //         source={require('../images/icons8-google_news.png')}
        //         style={[ styles.iconStyles, { tintColor: tintColor } ]}
        //       />
        //     )
        //   case 'List':
        //     return (
        //       <Image
        //         source={require('../images/icons8-user-96.png')}
        //         style={[ styles.iconStyles, { tintColor: tintColor } ]}
        //       />
        //     )
        //   case 'Tools':
        //     return (
        //       <Image
        //         source={require('../images/icons8-user-96.png')}
        //         style={[ styles.iconStyles, { tintColor: tintColor } ]}
        //       />
        //     )
        //   case 'Profile':
        //     return (
        //       <Image
        //         source={require('../images/icons8-user-96.png')}
        //         style={[ styles.iconStyles, { tintColor: tintColor } ]}
        //       />
        //     )
        // }

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
