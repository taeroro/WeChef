import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Animated,
  Easing,
} from 'react-native';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  CardStackStyleInterpolator
} from 'react-navigation';

// non-packages
import RecipeMainScreen from './../tabScreens/recipe/RecipeMainScreen';
import SavedMainScreen from './../tabScreens/saved/SavedMainScreen';
import ListMainScreen from './../tabScreens/list/ListMainScreen';
import ToolsMainScreen from './../tabScreens/tools/ToolsMainScreen';
import ToolsAppTemp from './../tabScreens/tools/ToolsAppTemp';
import ToolsAppWeight from './../tabScreens/tools/ToolsAppWeight';
import ToolsAppVolume from './../tabScreens/tools/ToolsAppVolume';
import ProfileMainScreen from './../tabScreens/profile/ProfileMainScreen';
import ProfileSettingsScreen from './../tabScreens/profile/ProfileSettingsScreen';
import LoginScreen from './../login/LoginScreen';

// =============================================================================
// Individual Tab's Stack for Screens
// =============================================================================
// const tabbarVisible = (navigation) => {
//   const { routes } = navigation.state;
//
//   let showTabbar = true;
//   routes.forEach((route) => {
//     if (route.routeName === 'SearchBarView') {
//       showTabbar = false;
//     }
//   });
//
//   return showTabbar;
// };

// const TransitionConfiguration = () => {
//   return {
//     transitionSpec: {
//       duration: 400,
//       easing: Easing.out(Easing.poly(4)),
//       timing: Animated.timing,
//       useNativeDriver: true,
//     },
//     screenInterpolator: (sceneProps) => {
//       const { layout, position, scene } = sceneProps;
//       const height = layout.initHeight;
//       const { index, route } = scene
//       const params = route.params || {};
//       const transition = params.transition || 'default';
//       return {
//         default: slideFromBottom(index, position, height),
//       }[transition];
//     },
//   }
// }
//
// let slideFromBottom = (index, position, height) => {
//   const inputRange = [index - 1, index, index + 1];
//   const translateY = position.interpolate({
//     inputRange: [index - 1, index, index + 1],
//     outputRange: [-height, 0, 0]
//   })
//   // const opacity = position.interpolate({
//   //   inputRange,
//   //   outputRange: [0, 1, 1],
//   // });
//   const slideFromBottom = { transform: [{ translateY }] }
//   return slideFromBottom;
// };

// 1. Recipe Stack
let showBottomBar = true;

export const RecipeStack = createStackNavigator(
  {
    RecipeMain: {
      screen: RecipeMainScreen,
      navigationOptions: () => ({
        header: null,
        headerBackTitle: null,
      }),
    },
  },
  {
    // navigationOptions: ({ navigation }) => {
      // tabBarVisible: tabbarVisible(navigation),
    // },
    headerMode: "screen",
  //   mode: "modal",
    // transitionConfig: TransitionConfiguration,
  },
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
  },
  {
    headerMode: "screen",
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
