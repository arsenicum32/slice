/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import Button from 'react-native-button';
export default class AwesomeProject extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Button
              style={styles.btn}
              containerStyle={{padding:10, height:45, backgroundColor: 'red'}}
              onPress={onButtonPress}>
              Press Me!
            </Button>
      </View>
    );
  }
}

const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  btn:{
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
