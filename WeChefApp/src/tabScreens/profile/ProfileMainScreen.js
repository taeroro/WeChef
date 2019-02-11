import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { MKButton, MKColor } from 'react-native-material-kit';
import { AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';

class ProfileMainScreen extends Component {
  openSettings() {
    this.props.navigation.navigate('ProfileSettings');
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
              source={require('../../../img/notForTabIcons/icons8-settings.png')}
              style={styles.btIcon}
            />
          </MKButton>
        </View>

        <View style={styles.profileContainer}>
        <Button
          onPress={() => this.userInfo()}
          title="User Information"
          color="#841584"
        />
        </View>

      </View>
    );
  }

  userInfo() {
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        const infoRequest = new GraphRequest(
          '/me?fields=name,id,picture',
          null,
          this._responseInfoCallback
        );
        new GraphRequestManager().addRequest(infoRequest).start();
      }
    )
  }

  _responseInfoCallback = (error, result) => {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      console.log('name is ' + result.name + ', id is ' + result.id);
      console.log('picture is ' + result.picture.data.url);
    }
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
    color: '#000',
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
});
