import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, ActionSheetIOS } from 'react-native';
import { ListItem } from 'react-native-elements';
import FBSDK from 'react-native-fbsdk';

const { LoginButton, LoginManager } = FBSDK;
const BUTTONS = [
  'Log Out',
  'Cancel',
];
const DESTRUCTIVE_INDEX = 0
const CANCEL_INDEX = 1;

class ProfileSettingsScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      clicked: 'none',
    }

    this.logout = this.logout.bind(this);
    this.showActionSheet = this.showActionSheet.bind(this);
  }

  showActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
    },
    (buttonIndex) => {
      if (buttonIndex === DESTRUCTIVE_INDEX) {
        /* destructive action */
        LoginManager.logOut();
        this.logout();
      }
      this.setState({ clicked: BUTTONS[buttonIndex] });
    });
  }

  logout() {
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleHeaderContainer}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        <View style={styles.listConatiner}>
          <ListItem
            key={1}
            containerStyle={styles.settingContainerStyle}
            title={"Log Out"}
            titleStyle={styles.settingTitleStyle}
            fontFamily="Poppins"
            bottomDivider
            bottomDividerProps={{style: {paddingLeft: 15}}}
            onPress={() => {
              this.showActionSheet();
            }}
          />

        </View>

      {/* <LoginButton onLogoutFinished={() => this.logout()}/> */}

      </View>
    );
  }
}

export default ProfileSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
  listConatiner: {
    marginTop: 20,
    backgroundColor: '#FFF',
  },
  settingContainerStyle: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: '#D2D2D2',
  },
  settingTitleStyle: {
    marginLeft: 15,
    fontWeight: '400',
    fontSize: 16,
    color: '#3C3C3C',
    letterSpacing: 0.5,
  },
});
