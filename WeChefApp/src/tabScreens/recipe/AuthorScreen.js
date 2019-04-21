import React, { Component } from 'react';
import { StyleSheet,View,Text,StatusBar,TouchableOpacity,Image,Dimensions} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const image = 'http://www.getmdl.io/assets/demos/welcome_card.jpg';

class AuthorScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageSource: this.props.navigation.state.params.authorImage,
      author: this.props.navigation.state.params.authorName,
    };
  }

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
      <View style={StyleSheet.container}>
        <View style={styles.titleHeaderContainer}>
          <Text style={styles.headerTitle}>Author Profile</Text>
        </View>

        <View style={styles.profileContainer}>
          <TouchableOpacity disabled>
            <Image
              source={{uri: this.state.imageSource}}
              style={styles.avatarStyle}
            />
          </TouchableOpacity>

          <Text
            style={styles.nameStyle}
            onPress={() => this.changeUsername()}
          >
            {this.state.author}
          </Text>
        </View>

      </View>
    );
  }
}

export default AuthorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  titleHeaderContainer: {
    marginTop: getStatusBarHeight() - 20,
    marginLeft: 25,
    marginRight: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#3C3C3C',
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileContainer: {
    justifyContent: 'flex-start',
    //flexDirection: 'column',
    alignItems: 'center',
  },
  avatarStyle: {
    marginTop: 20,
    borderRadius: 150,
    width: 300,
    height: 300,
    backgroundColor: '#D2D2D2',
  },

  nameStyle: {
    marginTop: 20,
    fontFamily: 'Poppins',
    fontSize: 30,
    fontWeight: '600',
    color: '#3C3C3C',
  },

});
