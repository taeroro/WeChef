import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { MKButton, MKColor,  MKSpinner } from 'react-native-material-kit';
import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import ImagePicker from 'react-native-image-picker';
import Dialog from "react-native-dialog";
import axios from 'axios';

const DB_PREFIX = 'https://wechef-server-dev.herokuapp.com/';
const options = {
  title: 'Change Profile Picture',
  // customButtons: [{ name: 'fb', title: 'Use Facebook Profile Picture' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class ProfileMainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: null,
      avatarSource: null,
      username: '',
      updateAvatarSource: null,
      updateUsername: '',
      dialogVisible: false,
    };

    this.fetchUserData = this.fetchUserData.bind(this);
    this.changeAvatar = this.changeAvatar.bind(this);
    this.uploadPictureRequest = this.uploadPictureRequest.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  openSettings() {
    this.props.navigation.navigate('ProfileSettings');
  }

  handleCancel() {
    this.setState({ dialogVisible: false });
  };

  handleSave() {
    let requestURL = DB_PREFIX + 'user/profile/' + this.state.userID;

    this.setState({ dialogVisible: false });

    axios.put(requestURL, { userName: this.state.updateUsername })
      .then(res => {
        console.log(res);
        this.setState({ updateUsername: '' });
        this.fetchUserData();
      })
      .catch(error => {
        console.log(error);
      })
  };

  uploadPictureRequest() {
    let requestURL = DB_PREFIX + 'user/photo/' + this.state.userID;
    let formdata = new FormData();
    formdata.append('image', { uri: this.state.updateAvatarSource, name: 'new_profile_image.jpg', type: 'image/jpg' });

    // axios.interceptors.request.use(request => {
    //   console.log('Starting Request', JSON.stringify(request))
    //   return request;
    // })

    axios.put(requestURL, formdata, { headers: {
          'Content-Type': 'multipart/form-data',
        }})
      .then(res => {
        console.log(res);
        this.setState({ updateAvatarSource: null });
        this.fetchUserData();
      })
      .catch(error => {
        console.log(error);
      })
  }

  changeAvatar() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        const source = response.uri;

        console.log(source);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({ updateAvatarSource: source, }, () => {
          this.uploadPictureRequest(source);
        });
      }
    });
  }

  changeUsername() {
    this.setState({ dialogVisible: true });
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
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });

    AccessToken.getCurrentAccessToken().then((data) => {
      this.setState({
        userID: data.userID
      }, () => {
        this.fetchUserData();
      });
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Update user name</Dialog.Title>
          <Dialog.Description>
            Enter the new user name below:
          </Dialog.Description>
          <Dialog.Input
            onChangeText={(updateUsername) => this.setState({updateUsername})}
            value={this.state.updateUsername}
          />
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="Save" onPress={this.handleSave} />
        </Dialog.Container>

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
              <TouchableOpacity onPress={() => this.changeAvatar()}>
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
