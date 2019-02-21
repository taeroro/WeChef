import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActionSheetIOS, ImagePickerIOS } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { MKButton, MKColor,  MKSpinner } from 'react-native-material-kit';
import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const DB_PREFIX = 'https://wechef-server-dev.herokuapp.com/';
const BUTTONS = [
  'Choose from Library',
  'Use Facebook Profile Picture',
  'Cancel',
];
const CANCEL_INDEX = 2;

class ProfileMainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: null,
      avatarSource: null,
      username: '',
      // clicked: 'none',
      updateAvatarSource: null,
      updateUsername: '',
    };

    this.fetchUserData = this.fetchUserData.bind(this);
  }

  openSettings() {
    this.props.navigation.navigate('ProfileSettings');
  }

  changeAvatar() {
    ActionSheetIOS.showActionSheetWithOptions({
      title: 'Change Profile Picture',
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
    },
    (buttonIndex) => {
      // this.setState({ clicked: BUTTONS[buttonIndex] });
      if (buttonIndex === 0) {
        ImagePickerIOS.openSelectDialog({}, imageUri => {
          this.setState({ updateAvatarSource: imageUri });
        }, error => console.error(error));
      }

    });
  }

  changeUsername() {
    // TODO
    alert("change username");
  }

  fetchUserData() {
    let requestURL = DB_PREFIX + 'user/' + this.state.userID;

    axios.get(requestURL)
      .then(res => {
        let userData = res.data;
        this.setState({
          username: userData.userName,
          avatarSource: { uri: userData.userImageURL }
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    AccessToken.getCurrentAccessToken().then((data) => {

      this.setState({
        userID: data.userID
      }, () => {
        this.fetchUserData();
      });
    });

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

        {this.state.avatarSource === null && this.state.username === ''
          ? (
            <View style={styles.loadingContainer}>
              <SingleColorSpinner strokeColor="#F56862" />
            </View>
          )
          : (
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
          )
        }
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
    backgroundColor: '#D2D2D2',
  },
  nameStyle: {
    marginTop: 20,
    fontFamily: 'Poppins',
    fontSize: 30,
    fontWeight: '600',
    color: '#3C3C3C',
  },
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    width: 35,
    height: 35,
  },
});

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build();
