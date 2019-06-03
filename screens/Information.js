import React from 'react';
import { ScrollView, StyleSheet, View, Image, TouchableHighlight, } from 'react-native';
import { Text, Textarea, Form, Content, Container, Button, } from 'native-base';
import { ExpoConfigView } from '@expo/samples';

import Feedback from '../Feedback';

import { firebaseApp } from '../firebase';
import colors from '../constants/Colors';

export default class Information extends React.Component {
  static navigationOptions = {
    title: 'Informacion',
    headerTintColor: colors.white,
    headerStyle: {
      backgroundColor: colors.light,
      elevation: 0,
      shadowOpacity: 0
    },
    headerTitleStyle: {
      fontSize: 18,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      infos: [],
      feedbackVisible: false,
    }
    this.infosRef = firebaseApp.database().ref().child('infos');
    this.loggedUser = this.props.screenProps.loggedUser;
  }

  componentDidMount() {
    this.listenForInfos(this.infosRef);
  }

  listenForInfos(infosRef) {
    infosRef.on('value', (snap) => {
      // get children as an array
      var infos = [];
      snap.forEach((child) => {
        infos.push({
          body: child.val().body,
          title: child.val().title,
          _key: child.key,
        });
      });

      this.setState({
        infos: infos,
      });
    });
  }

  getObjectOfArray(array, index) {
    return array[index] = array[index] || {};
  }

  showOrHideFeedback() {
    this.setState({feedbackVisible: !this.state.feedbackVisible});
  }

  render() {
    let infos = this.state.infos;
    let showOrHideFeedback = this.showOrHideFeedback;

    if(!this.state.feedbackVisible) {
      return(
        <ScrollView style={styles.container}>
          <View style={styles.getStartedContainer}>
            <Text style={styles.infoTitle}> { this.getObjectOfArray(infos, 0).title } </Text>
          </View>
          <View style={styles.infoImageContainer}>
            <Image
              source={require('../assets/images/decano.png')}
              style={styles.infoImage}
            />
          </View>
          <View style={styles.getStartedContainer}>
            <Text style={styles.infoBody}> { this.getObjectOfArray(infos, 0).body } </Text>
          </View>
          <View style={styles.feedbackButtonContainer}>
            <Button full style={{backgroundColor: colors.light}} onPress={() => this.showOrHideFeedback()} >
              <Text>
                comentarios y sugerencias
              </Text>
            </Button>
          </View>
        </ScrollView>
      );
    } else {
      return(
        <Feedback showOrHideFeedback={this.showOrHideFeedback.bind(this)}
                  loggedUser={this.props.screenProps.loggedUser} />
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: colors.dark,
    paddingLeft: 10,
    paddingRight: 10,
  },
  feedbackText: {
    fontSize: 30,
    color: colors.white,
    margin: 10,
  },
  infoTitle: {
    fontSize: 20,
    color: colors.light,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  infoImageContainer: {
    justifyContent:'center',
    alignItems:'center',
    margin: 10,
  },
  infoImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  infoBody: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  getStartedContainer: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  feedbackButtonContainer: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    marginTop: 30,
    marginBottom: 20,
  },
  feedbackButton: {
    color: colors.light,
  },
});
