import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

// components
import SearchBar from '../components/SearchBar';

class RecipeMainScreen extends Component {
  constructor(props) {
    super(props);

    this.animatedValue = new Animated.Value(0);

    this.state = {
      isFocusedOnTouchBar: false,
    };

    this.searchBarExpand = this.searchBarExpand.bind(this);
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  searchBarExpand(focused) {
    if (!focused && this.state.isFocusedOnTouchBar === true) {
      this.animatedValue.setValue(1);

      Animated.timing(
        this.animatedValue,
        {
          toValue: 0,
          duration: 200,
        }
      ).start();

      this.setState({ isFocusedOnTouchBar: false });
    }
    else if (focused && this.state.isFocusedOnTouchBar === false) {
      this.animatedValue.setValue(0);

      Animated.timing(
        this.animatedValue,
        {
          toValue: 1,
          duration: 200,
        }
      ).start();

      this.setState({ isFocusedOnTouchBar: true });
    }
  }


  searchBarFocusCallback = focused => {
    this.searchBarExpand(focused);
  }

  renderCancelButton() {
    return (
      <TouchableOpacity
        style={styles.cancelButtonContainer}
        onPress={() => {
          this.searchBarExpand(false);
          this.refs.childrenSearchBarRef.refs.searchBarRef.blur();
          this.refs.childrenSearchBarRef.focusedAnimation(false);
        }}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const endHeight = Dimensions.get('window').height;
    const animatedHeight = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [getStatusBarHeight() + 124, endHeight]
    });

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Animated.View
            style={{
              width: '100%',
              height: animatedHeight,
            }}
          >
            <LinearGradient
              start={{x: 0, y: 0}} end={{x: 1, y: 1}}
              colors={['#FA967B', '#F56862']}
              style={styles.searchBarContainer}
            >
              {/* <TouchableWithoutFeedback
                onPressIn={() => this.searchBarExpand(!this.state.isFocusedOnTouchBar)}
              > */}
                <View style={styles.touchContainer}>
                  <SearchBar
                    callbackFromParent={this.searchBarFocusCallback}
                    ref="childrenSearchBarRef"
                  />
                  {
                    this.state.isFocusedOnTouchBar
                    ? this.renderCancelButton()
                    : <View></View>
                  }

                </View>
              {/* </TouchableWithoutFeedback> */}
            </LinearGradient>
          </Animated.View>

          <View>
            <Text>Content</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default RecipeMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  searchBarContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 80,

    width: '100%',
    // height: getStatusBarHeight() + 124,
  },
  touchContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  cancelButtonContainer: {
    width: '13%',
    height: 48,
    // backgroundColor: '#000',
    right: '6%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    color: '#FFF',
    fontSize: 13,
  }
});
