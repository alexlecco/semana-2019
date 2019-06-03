'use strict'

import React, { Component } from 'react';
import { View, StyleSheet, TextInput, } from 'react-native';
import { Container, Text, Content, Form, Textarea, Button, Input,  } from 'native-base';

import StarRating from 'react-native-star-rating';

import { firebaseApp } from './firebase';

export default class Feedback extends Component {
  constructor(props){
    super(props);
    this.state = {
      body: '',
      starCounts: 2.5,
    }
    this.loggedUser = this.props.loggedUser;
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  sendFeedback() {
    firebaseApp.database().ref().child('feedbacks').push({
      body: this.state.body,
      user: this.props.loggedUser.uid,
      starCount: this.state.starCount,
    }).key;

    this.setState({ body: '' });
    this.props.showOrHideFeedback();
  }

  render() {
    return(
      <Container>
        <View style={styles.container}>
          <Text style={[styles.centerText, { fontSize: 20, marginBottom: 10, marginTop: 7 }]}>Gracias por colaborar</Text>
          <Text style={styles.centerText}>
            ¿Que te parece la app de la Semana de la Ingeniería 2019? Dejanos alguna sugerencia que se te ocurra para mejorarla.
          </Text>

          <Content padder>
            <Form>
              <TextInput
                multiline={true}
                numberOfLines={4}
                placeholder="opinión, comentarios y sugerencias"
                value={ this.state.body }
                onChangeText={(text) => this.setState({body: text})} />

              <View><Text style={styles.centerText}> Calificación: </Text></View>

              <StarRating
                disabled={false}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                maxStars={5}
                rating={this.state.starCount}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
                fullStarColor={'#BD005E'}
              />
            </Form>
          </Content>

          <View style={styles.feedbackButtonContainer}>
            <Button full style={{backgroundColor: '#BD005E'}} onPress={() => this.sendFeedback()} >
              <Text>
                Enviar
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
  }
})
