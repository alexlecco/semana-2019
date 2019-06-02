'use strict'

import React, { Component } from 'react';
import { View, StyleSheet, TextInput, } from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Icon,
  Title,
  Right,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
  Card,
  CardItem,
  Thumbnail,
  Form,
  Textarea,
  Input
} from 'native-base';

import TalkQuestion from './TalkQuestion';

import { firebaseApp } from './firebase';

export default class TalkQuestionsContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      talkQuestions: [],
    }
    this.loggedUser = this.props.loggedUser;
    this.talk = this.props.talk;
  }

  readQuestions(talks, userTalks) {
    var arrayQuestions = [];

    for (var i = 0; i < talks.length ; i++) {
      for (var j = 0; j < userTalks.length; j++) {
        if(talks[i]._key == userTalks[j].talk) {
          switch(talks[i].day) {
            case 'monday':
              arrayUserTalksMon.push(talks[i]);
              break;
            case 'tuesday':
              arrayUserTalksTue.push(talks[i]);
              break;
            case 'wednesday':
              arrayUserTalksWed.push(talks[i]);
              break;
            case 'thursday':
              arrayUserTalksThu.push(talks[i]);
              break;
            case 'friday':
              arrayUserTalksFri.push(talks[i]);
              break;
            case 'saturday':
              arrayUserTalksSat.push(talks[i]);
          }
        }
      }
      this.setState({
        userTalksMon: arrayUserTalksMon,
        userTalksTue: arrayUserTalksTue,
        userTalksWed: arrayUserTalksWed,
        userTalksThu: arrayUserTalksThu,
        userTalksFri: arrayUserTalksFri,
        userTalksSat: arrayUserTalksSat,
      });
    }
  }

  getObjectOfArray(array, index) {
    return array[index] = array[index] || {};
  }

  render() {
    return(
      <Container>
        <Header style={{backgroundColor: '#BD005E'}}>
          <Left>
            <Button transparent onPress={() => this.props.hideTalkQuestionsContainer()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title> Preguntas de la charla </Title>
          </Body>
        </Header>
        <View style={styles.container}>
          <Text style={[styles.centerText, { fontSize: 20, marginBottom: 10, marginTop: 7 }]}> No se </Text>

          <Content padder>
            <TalkQuestion />
          </Content>
        </View>
      </Container>
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
  boldText: {
    fontWeight: 'bold',
  }
})
