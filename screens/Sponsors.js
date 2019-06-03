import React from 'react';
import { ScrollView, StyleSheet, View, Image, TouchableHighlight, Dimensions, } from 'react-native';
import { Text, Textarea, Form, Content, Container, Button, } from 'native-base';
import { ExpoConfigView } from '@expo/samples';

import Feedback from '../Feedback';

import { firebaseApp } from '../firebase';
import colors from '../constants/Colors';

export default class Sponsors extends React.Component {
  static navigationOptions = {
    title: 'Sponsors',
    headerTintColor: colors.white,
    headerStyle: {
      backgroundColor: colors.light,
      elevation: 0,
      shadowOpacity: 0
    },
    headerTitleStyle: {
      fontSize: 18,
      fontWeight: 'normal',
    },
    headerRight: <View style={{paddingRight: 15}}><Image style={{width: 100,height: 100}} source={require('../assets/images/logo-blanco.png')}/></View>,
  };

  constructor(props) {
    super(props);
    this.state = {
      infos: [],
      feedbackVisible: false,
      imgWidth: 0,
      imgHeight: 0,
    }
    this.infosRef = firebaseApp.database().ref().child('infos');
    this.loggedUser = this.props.screenProps.loggedUser;
  }

  componentDidMount() {
    this.listenForInfos(this.infosRef);
    this.calculateImgSize(300, 300);
  }

  calculateImgSize() {
    Image.getSize(this.getSponsors(), (width, height) => {
      // calculate image width and height 
      const screenWidth = Dimensions.get('window').width
      const scaleFactor = width / screenWidth
      const imageHeight = height / scaleFactor
      this.setState({imgWidth: screenWidth, imgHeight: imageHeight})
    })
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

  getSponsors() {
    return 'https://firebasestorage.googleapis.com/v0/b/semana-utn-c9f91.appspot.com/o/sponsors.png?alt=media&token=3088ac7b-fa63-4f05-a60a-eca28682c9ff';
  }

  render() {
    let infos = this.state.infos;
    let showOrHideFeedback = this.showOrHideFeedback;

    if(!this.state.feedbackVisible) {
      return(
        <ScrollView style={styles.container}>
          <View style={styles.infoImageContainer}>
            <Image
              source={{uri: this.getSponsors()}}
              style={{width: this.state.imgWidth, height: this.state.imgHeight}}
            />
          </View>
        </ScrollView>
      );
    } else {
      return(
        <Feedback
          showOrHideFeedback={this.showOrHideFeedback.bind(this)}
          loggedUser={this.props.screenProps.loggedUser} />
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    backgroundColor: colors.dark,
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
  },
  feedbackButton: {
    color: colors.light,
  },
});
