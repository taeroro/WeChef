import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import FBSDK from 'react-native-fbsdk';

const { LoginButton } = FBSDK;

class ProfileSettingsScreen extends Component {
  constructor(props) {
    super(props)

    this.logout = this.logout.bind(this)
  }

  logout() {
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <View style={styles.container}>
//         <View style={styles.titleHeaderContainer}>
//           <Text style={styles.headerTitle}>Settings</Text>
//         </View>

//         <View style={styles.listConatiner}>
//           <ListItem
//             key={10001}
//             containerStyle={styles.settingContainerStyle}
//             title={"Log Out"}
//             titleStyle={styles.settingTitleStyle}
//             fontFamily="Poppins"
//             bottomDivider
//             bottomDividerProps={{style: {paddingLeft: 15}}}
//             onPress={() => {
//               console.log("log out pressed");
//             }}
//           />
//         </View>

        <Text>ProfileSettingsScreen</Text>
        <LoginButton onLogoutFinished={() => this.logout()}/>

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
    marginTop: 20,
    paddingLeft: 25,
    paddingRight: 25,
  },
  headerTitle: {
    color: '#000',
    fontSize: 40,
    fontWeight: 'bold',
  },
  listConatiner: {
    marginTop: 20,
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
    letterSpacing: 0.7,
  },
});
