import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { ListItem, Icon } from 'react-native-elements';

class ToolsMainScreen extends Component {
  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleHeaderContainer}>
          <Text style={styles.headerTitle}>Conversion Tools</Text>
        </View>

        <View style={styles.listConatiner}>
          <ListItem
            key={1}
            containerStyle={styles.toolsContainerStyle}
            title={"Temperature"}
            titleStyle={styles.toolsTitleStyle}
            fontFamily="Poppins"
            rightIcon={<Icon name='thermometer-lines' type='material-community' size={20} color='#3C3C3C' containerStyle={{marginRight: 15}} />}
            bottomDivider
            bottomDividerProps={{style: {paddingLeft: 15}}}
            onPress={() => {
              this.props.navigation.navigate('ToolsTemp');
            }}
          />
          <ListItem
            key={2}
            containerStyle={styles.toolsContainerStyle}
            title={"Weight"}
            titleStyle={styles.toolsTitleStyle}
            fontFamily="Poppins"
            rightIcon={<Icon name='scale' type='material-community' size={20} color='#3C3C3C' containerStyle={{marginRight: 15}} />}
            bottomDivider
            bottomDividerProps={{style: {paddingLeft: 15}}}
            onPress={() => {
              this.props.navigation.navigate('ToolsWeight');
            }}
          />
          <ListItem
            key={3}
            containerStyle={styles.toolsContainerStyle}
            title={"Volume"}
            titleStyle={styles.toolsTitleStyle}
            fontFamily="Poppins"
            rightIcon={<Icon name='cup' type='material-community' size={20} color='#3C3C3C' containerStyle={{marginRight: 15}} />}
            bottomDivider
            bottomDividerProps={{style: {paddingLeft: 15}}}
            onPress={() => {
              this.props.navigation.navigate('ToolsVolume');
            }}
          />
        </View>

      </View>
    );
  }
}

export default ToolsMainScreen;

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
  listConatiner: {
    marginTop: 20,
    backgroundColor: '#FFF',
  },
  toolsContainerStyle: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: '#D2D2D2',
  },
  toolsTitleStyle: {
    marginLeft: 15,
    fontWeight: '400',
    fontSize: 16,
    color: '#3C3C3C',
    letterSpacing: 0.5,
  },
});
