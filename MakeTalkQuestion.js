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

import { firebaseApp } from './firebase';

export default class MakeTalkQuestion extends Component {
  constructor(props){
    super(props);
    this.state = {
      body: '',
    }
    this.loggedUser = this.props.loggedUser;
    this.talk = this.props.talk;
  }

  sendTalkQuestion() {
    firebaseApp.database().ref().child('questions').push({
      body: this.state.body,
      user: this.props.loggedUser.uid,
      talk: this.props.talk.id,
    }).key;

    this.setState({ body: '' });
    this.props.hideMakeTalkQuestions();
  }

  getObjectOfArray(array, index) {
    return array[index] = array[index] || {};
  }

  render() {
    return(
      <Container>
        <Header style={{backgroundColor: '#BD005E'}}>
          <Left>
            <Button transparent onPress={() => this.props.hideMakeTalkQuestions()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title> Hacer una pregunta </Title>
          </Body>
        </Header>
        <View style={styles.container}>
          <Text style={[styles.centerText, { fontSize: 20, marginBottom: 10, marginTop: 7 }]}>{ this.props.talk.title } </Text>
          <Text style={styles.centerText}>
            Estás por escribir una pregunta que aparecerá en pantalla gigante <Text style={styles.boldText}>junto a tu nombre de usuario</Text>, queremos escucharte:
          </Text>

          <Content padder>
            <Form>
              <TextInput
                multiline={true}
                numberOfLines={4}
                placeholder="pregunta para el disertarte"
                value={ this.state.body }
                onChangeText={(text) => this.setState({body: text})} />
            </Form>
          </Content>

          <View style={styles.feedbackButtonContainer}>
            <Button full style={{backgroundColor: '#BD005E'}} onPress={() => this.sendTalkQuestion()} >
              <Text>
                Enviar pregunta
              </Text>
            </Button>
          </View>
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
