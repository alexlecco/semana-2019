'use strict'

import React, { Component } from 'react';
import { View, StyleSheet, TextInput, ListView, } from 'react-native';
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
      talkQuestions: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2,}),
    }
    this.loggedUser = this.props.loggedUser;
    this.talk = this.props.talk;
    this.talkQuestionsRef = firebaseApp.database().ref().child('questions');
  }

  componentDidMount() {
    this.listenForTalkQuestions(this.talkQuestionsRef, this.props.talk);
  }

  listenForTalkQuestions(talkQuestionsRef, talk) {
    talkQuestionsRef.on('value', (snap) => {
      let talkQuestions = [];

      snap.forEach((child) => {
        if(child.val().talk === talk.id) {
          talkQuestions.push({
            body: child.val().body,
            talk: child.val().talk,
            user: child.val().user,
            _key: child.key,
          });
        }
      });

      this.setState({
        talkQuestions: this.state.talkQuestions.cloneWithRows(talkQuestions),
      });
    });
  }

  getObjectOfArray(array, index) {
    return array[index] = array[index] || {};
  }

  render() {
    const message = 'Aún no hay preguntas registradas en esta charla';

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
          <Text style={[styles.centerText, { fontSize: 20, marginBottom: 10, marginTop: 7 }]}> { this.props.talk.title } </Text>

          <Content padder>
          {
            this.state.talkQuestions.getRowCount() !== 0 ?
            <ListView
              dataSource={this.state.talkQuestions}
              renderRow={(talkQuestion) => (<TalkQuestion talkQuestion={talkQuestion} />) }
              enableEmptySections={true}
              renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
            /> :
            <View style={styles.empty}>
              <Text style={styles.emptyText}> { message } </Text>
            </View>
          }
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
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 50,
    marginLeft: 50,
    marginRight: 50,
  },
  emptyText: {
    textAlign: 'center',
    color: '#575757',
  },
})
