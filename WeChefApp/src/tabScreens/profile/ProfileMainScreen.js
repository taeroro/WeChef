import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { MKButton, MKColor } from 'react-native-material-kit';
import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import ImagePicker from 'react-native-image-picker';

class ProfileMainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatarSource: null,
      username: 'username',
    };
  }

  openSettings() {
    this.props.navigation.navigate('ProfileSettings');
  }

  changeAvatar() {
    // TODO
    alert("change profile pic");
  }

  changeUsername() {
    // TODO
    alert("change username");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleHeaderContainer}>
          <Text style={styles.headerTitle}>Profile</Text>
          <MKButton
            backgroundColor={MKColor.Transparent}
            rippleColor="rgba(0,0,0,0.12)"
            maskBorderRadius={45}
            width={45}
            height={45}
            onPress={() => this.openSettings()}
            style={styles.mkBt}
            testID='profile_page_setting_button'
          >
            <Image
              source={require('../../../assets/img/notForTabIcons/icons8-settings.png')}
              style={styles.btIcon}
            />
          </MKButton>
        </View>

        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={()=>this.changeAvatar()}>
            <Image
              source={this.state.avatarSource}
              style={styles.avatarStyle}
            />
          </TouchableOpacity>
          <Text
            style={styles.nameStyle}
            onPress={() => this.changeUsername()}
          >
            {this.state.username}
          </Text>
        </View>

      </View>
    );
  }

}

export default ProfileMainScreen;

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
    fontSize: 40,
    fontWeight: 'bold',
  },
  mkBt: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btIcon: {
    width: 32,
    height: 32,
    tintColor: '#F56862',
  },
  profileContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatarStyle: {
    marginTop: 40,
    borderRadius: 100,
    width: 200,
    height: 200,
    backgroundColor: '#d2d2d2',
  },
  nameStyle: {
    marginTop: 20,
    fontFamily: 'Poppins',
    fontSize: 30,
    fontWeight: '600',
    color: '#3C3C3C',
  },
});
