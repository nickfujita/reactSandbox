/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
// 'use strict';

import React from 'react-native';
import Main from './App/Components/main';

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS
} = React;

var ghnt = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute = {{
          title: "githubNotes",
          component: Main
        }}
      />
    );
  }
});

var styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#111111'
  },
});

AppRegistry.registerComponent('ghnt', () => ghnt);
