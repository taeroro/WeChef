import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

export default Root = createBottomTabNavigator(
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
        const { routeName } = navigation.state;

        switch(routeName) {
          case 'Recipe':
            return (
              <Image
                source={require('../images/YintechLabsCrop.png')}
                style={[ styles.iconStyles, { tintColor: tintColor } ]}
              />
            )
          case 'Saved':
            return (
              <Image
                source={require('../images/icons8-google_news.png')}
                style={[ styles.iconStyles, { tintColor: tintColor } ]}
              />
            )
          case 'List':
            return (
              <Image
                source={require('../images/icons8-user-96.png')}
                style={[ styles.iconStyles, { tintColor: tintColor } ]}
              />
            )
          case 'Tools':
            return (
              <Image
                source={require('../images/icons8-user-96.png')}
                style={[ styles.iconStyles, { tintColor: tintColor } ]}
              />
            )
          case 'Profile':
            return (
              <Image
                source={require('../images/icons8-user-96.png')}
                style={[ styles.iconStyles, { tintColor: tintColor } ]}
              />
            )
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: '#F56862',
      inactiveTintColor: '#A0A2A5',
    },
  }
);

const styles = StyleSheet.create({
  iconStyles: {
    width: 27,
    height: 27,
    resizeMode: 'contain',
  },
});
