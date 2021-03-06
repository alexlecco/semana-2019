import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Image, ScrollView, BackHandler, Share, Platform, } from 'react-native';
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
} from 'native-base';

import { firebaseApp } from './firebase';
import colors from './constants/Colors';

import MakeTalkQuestion from './MakeTalkQuestion';
import TalkQuestionsContainer from './TalkQuestionsContainer';

export default class TalkInfo extends Component {
  static navigationOptions = {
    title: 'Informacion',
    headerTintColor: colors.text1,
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
      buttonText: '',
      backTo: '',
      makeTalkQuestionVisible: false,
      talkQuestionsContainerVisible: false,
      imgWidth: 0,
      imgHeight: 0,
    }
    this.loggedUser = this.props.loggedUser;
    this.sites = this.props.sites;
    this.speakers = this.props.speakers;
    this.userTalks = this.props.userTalks;
    this.backTo = this.props.backTo;
  }

  componentDidMount() {
    this.askButtonText(this.props.loggedUser, this.props.talk);
    this.calculateImgSize(300, 300);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  calculateImgSize() {
    Image.getSize(this.getMapPhoto(), (width, height) => {
      // calculate image width and height 
      const screenWidth = Dimensions.get('window').width
      const scaleFactor = width / screenWidth
      const imageHeight = height / scaleFactor
      this.setState({imgWidth: screenWidth, imgHeight: imageHeight})
    })
  }

  showMakeTalkQuestions() { this.setState({ makeTalkQuestionVisible: true }); }
  
  hideMakeTalkQuestions() { this.setState({ makeTalkQuestionVisible: false }); }

  showTalkQuestionsContainer() { this.setState({ talkQuestionsContainerVisible: true }); }

  hideTalkQuestionsContainer() { this.setState({ talkQuestionsContainerVisible: false }); }

  handleBackButton() { return true; }

  askButtonText(loggedUser, talk) {
    var text = 'Me interesa';

    firebaseApp.database().ref().child('userTalks')
      .orderByChild('user')
      .equalTo(loggedUser.uid)
      .on('child_added', (snap) => {
        userTalk = snap.val();
        if(userTalk.talk == talk.id) {
          text = 'Ya no me interesa';
        }
      });

    text == 'Ya no me interesa' ?
      this.setState({ buttonText: 'Ya no me interesa' }) :
      this.setState({ buttonText: 'Me interesa' })
  }

  getObjectOfArray(array, index) {
    return array[index] = array[index] || {};
  }

  addOrRemoveUserTalk(loggedUser, talk) {
    var text = 'Me interesa';

    if(this.state.buttonText == 'Ya no me interesa') {
      var databaseRef = firebaseApp.database().ref().child('userTalks')
        .orderByChild('user')
        .equalTo(loggedUser.uid)
        .once('value', (snap) => {

          var userTalks = [];
          snap.forEach((child) => {
            userTalks.push({
              user: child.val().user,
              talk: child.val().talk,
              _key: child.key,
            })
          });

          for(var i = userTalks.length; i >= 0 ; i-- ) {
            if( this.getObjectOfArray(userTalks, i).talk == talk.id) {
              userTalk = userTalks[i];
            }
          }

          if(userTalk.talk == talk.id) {
            text = 'Me interesa';
            keyToRemove = ''
            snap.forEach((child) => {
              if(child.child('talk').val() == userTalk.talk) {
                keyToRemove = child.key
              }
            });
          }

          snap.ref.child(keyToRemove).remove();
        })
    } else {
      text = 'Ya no me interesa';

      firebaseApp.database().ref().child('userTalks').push({
        user: loggedUser.uid,
        talk: talk.id,
      }).key;

      var userTalksSorted = this.props.userTalks;
      userTalksSorted.push({
        user: loggedUser.uid,
        talk: talk.id,
      });

      var talksSorted = [];
      this.props.talks.forEach((talk) => {
        for(var i = userTalksSorted.length; i > 0; i--) {
          if(talk._key == this.getObjectOfArray(userTalksSorted, i - 1).talk) {
            talksSorted.push({
              _key: talk._key,
            })
          }
        }
      });

      userTalksSorted = [];
      talksSorted.forEach((talk) => {
        userTalksSorted.push({
          user: loggedUser.uid,
          talk: talk._key,
        });
      });

      this.props.sortUserTalks(userTalksSorted);
    }

    text == 'Me interesa' ?
      this.setState({ buttonText: 'Me interesa' }) :
      this.setState({ buttonText: 'Ya no me interesa' })
  }

  getObjectOfArray(array, index) {
    return array[index] = array[index] || {};
  }

  getSpeakerPhoto(photo) {
    return `https://firebasestorage.googleapis.com/v0/b/semana-utn-c9f91.appspot.com/o/speakers%2F${photo}.png?alt=media`
  }

  getMapPhoto(photo) {
    return photo != undefined ?
      `https://firebasestorage.googleapis.com/v0/b/semana-utn-c9f91.appspot.com/o/maps%2F${photo}.png?alt=media` :
      "https://firebasestorage.googleapis.com/v0/b/semana-utn-c9f91.appspot.com/o/maps%2Fno-map.png?alt=media"
  }

  async onShare() {
    try {
      const result = await Share.share({
        message: `Semana de la Ingeniería 2019\nMe interesa asistir a: "${this.props.talk.title}"\n\n#SemanaUTNFRT #UTNFRT #Semana2019`,
        title: 'Semana de la Ingeniería 2019'
      })

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    sites = this.props.sites;
    speakers = this.props.speakers;
    userTalks = this.props.userTalks;
    loggedUser = this.props.loggedUser;
    talk = this.props.talk;
    speaker = this.getObjectOfArray(speakers, this.props.talk.speaker - 1);
    site = this.getObjectOfArray(sites, this.props.talk.site - 1);

    let day = this.props.talk.day;
    let dayToShow = 'perrito';
    switch(day) {
      case 'monday':
        dayToShow = 'lunes';
        break;
      case 'tuesday':
        dayToShow = 'martes';
        break;
      case 'wednesday':
        dayToShow = 'miercoles';
        break;
      case 'thursday':
        dayToShow = 'jueves';
        break;
      case 'friday':
        dayToShow = 'viernes';
        break;
      case 'saturday':
        dayToShow = 'sabado';
        break;
    }

    if(this.state.talkQuestionsContainerVisible) {
      return(
        <TalkQuestionsContainer hideTalkQuestionsContainer={this.hideTalkQuestionsContainer.bind(this)}
                                loggedUser={this.props.loggedUser}
                                talk={this.props.talk} />
      )
    }

    if(this.state.makeTalkQuestionVisible) {
      return(
        <MakeTalkQuestion hideMakeTalkQuestions={this.hideMakeTalkQuestions.bind(this)}
                          loggedUser={this.props.loggedUser}
                          talk={this.props.talk} />
      )
    }

    return(
      <Container>
        <Header style={{backgroundColor: colors.light}}>
          <Left>
            <Button transparent onPress={() => this.props.showOrHideTalkInfo(this.props.talk)}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title> { dayToShow } - { this.props.talk.time } </Title>
            <Text style={{marginLeft: 15, color: `${this.getObjectOfArray(sites, this.props.talk.site - 1).color || 'red'}`}}>
              { this.getObjectOfArray(this.props.sites, this.props.talk.site - 1 ).name }
            </Text>
          </Body>
        </Header>
        <Content style={styles.dark}>
          <View style={styles.TalkContainer}>
            <View style={styles.TalkTitleContainer}>
              <Text style={styles.TalkTitle}>{ this.props.talk.title }</Text>
            </View>
            <View style={styles.TalkBodyContainer}>
              <Text style={styles.TalkBody}>{ this.props.talk.description }</Text>
            </View>
            <View style={styles.speakerContainer}>
              <View style={styles.TalkSpeakerContainer}>
                <Text style={styles.TalkSpeaker}>
                {
                  this.props.talk.speaker ?
                    `${speaker.name}` : ""
                }
                </Text>
              </View>
              <View>
                {
                  speaker.photo ?
                    <Image
                      source={{uri: this.getSpeakerPhoto(speaker.photo)}}
                      style={{height: 200, width: null, flex: 1}}
                      style={styles.infoImage} /> : <Text />
                }
              </View>
              <View style={styles.TalkSpeakerBioContainer}>
                <Text style={styles.TalkSpeakerBio}>
                  {
                    speaker.bio ?
                      speaker.bio : ""
                  }
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.dark}>
            {
              site.photo ?
              <View>
                <View><Text style={{color: colors.white}}> Ubicación: </Text></View>
                <Card>
                  <CardItem cardBody>
                    <Image
                      source={{uri: this.getMapPhoto(site.photo)}}
                      style={{width: this.state.imgWidth, height: this.state.imgHeight}}
                    />
                  </CardItem>
                </Card>
              </View> : <Text />
            }
          </View>

          <View style={styles.dark}>
            <Button transparent full primary onPress={() => this.onShare()} >
              <Text style={{color: colors.text2}}>
                Compartir
              </Text>
            </Button>
            <Button transparent full primary onPress={() => this.showTalkQuestionsContainer()} >
              <Text style={{color: colors.text2}}>
                Ver las preguntas de la charla
              </Text>
            </Button>
          </View>
        </Content>

        {
          this.state.buttonText == 'Ya no me interesa' ?
          (
          <Button full style={styles.buttonColor}
                  onPress={() => this.showMakeTalkQuestions()} >
            <Text>
              Hacer una pregunta
            </Text>
          </Button>
          ) : <View />
        }
        
        <View style={styles.buttonsSeparator}></View>
        <Button full style={this.state.buttonText == 'Me interesa' ? styles.buttonColor : styles.buttonColor2}
                onPress={() => this.addOrRemoveUserTalk(this.props.loggedUser, this.props.talk)} >
          <Text style={this.state.buttonText == 'Ya no me interesa' ? styles.buttonText : false }>
            { `${this.state.buttonText}` }
          </Text>
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  TalkContainer: {
    flexDirection: 'column',
    backgroundColor: colors.dark,
    flex: 1,
  },
	TalkTitleContainer: {
		marginTop: 10,
		marginRight: 15,
		marginLeft: 15,
    marginTop: 10,
		flexWrap: 'wrap',
		flexDirection: 'row',
	},
	TalkBodyContainer: {
		marginTop: 10,
		marginRight: 15,
		marginLeft: 15,
    marginTop: 10,
		flexWrap: 'wrap',
		flexDirection: 'row',
	},
  TalkSpeakerContainer: {
		marginTop: 10,
		marginRight: 15,
		marginLeft: 15,
    marginTop: 10,
		flexWrap: 'wrap',
		flexDirection: 'row',
  },
  TalkMapContainer: {
    marginTop: 10,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 10,
  },
  TalkTitle: {
		fontSize: 20,
    color: colors.text2,
	},
  TalkBody: {
		fontSize: 17,
    color: colors.text1,
	},
  TalkSpeaker: {
    fontSize: 17,
    color: colors.text2,
    textAlign: 'center',
  },
  TalkSpeakerBio: {
    fontSize: 17,
    color: colors.text1,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  TalkSpeakerBioContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  infoImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  speakerContainer: {
    justifyContent:'center',
    alignItems:'center',
    margin: 10,
  },
  shareContainer: {
    justifyContent:'center',
    alignItems:'center',
    marginBottom: 25,
    marginTop: 10,
  },
  shareText: {
    color: colors.light,
  },
  buttonText: {
    color: colors.text2,
  },
  buttonColor: {
    backgroundColor: colors.light,
  },
  buttonColor2: {
    backgroundColor: colors.dark,
  },
  buttonsSeparator: {
    backgroundColor: colors.dark,
    height: 10,
  },
  dark: {
    backgroundColor: colors.dark,
  }
});
