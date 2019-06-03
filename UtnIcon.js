'use strict'

import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Image, } from 'react-native';
import { Container, Text, Content, Form, Textarea, Button, Input,  } from 'native-base';

export default class UtnIcon extends Component {
  render() {
    return(
      <View>
        <Image
          source={require('./assets/images/logo-blanco.png')}
          style={styles.icon}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
  },
  feedbackButtonContainer: {
    margin: 25,
  },
  feedbackButtonText: {
    flex: 1,
    textAlign: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  icon: {
    height: 50,
    width: 50,
  }
})
