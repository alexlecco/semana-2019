import React from 'react';
import { ScrollView, StyleSheet, View, ListView, ListItem, Dimensions, Image, } from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, Content, } from 'native-base';
import { ExpoLinksView } from '@expo/samples';

import TalkCard from '../TalkCard';

import { firebaseApp } from '../firebase';
import colors from '../constants/Colors';

export default class MyTalks extends React.Component {
  static navigationOptions = {
    title: 'Mis charlas',
    headerTintColor: colors.white,
    headerStyle: {
      backgroundColor: colors.light,
      elevation: 0,
      shadowOpacity: 0,
      fontWeight: 'normal',
    },
    headerRight: <View style={{paddingRight: 15}}><Image style={{width: 100,height: 100}} source={require('../assets/images/logo-blanco.png')}/></View>,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentTalkTime: 'perrito',
      userTalksMon: [],
      userTalksTue: [],
      userTalksWed: [],
      userTalksThu: [],
      userTalksFri: [],
      userTalksSat: [],
    };

    this.talksRef = firebaseApp.database().ref().child('talks').orderByChild('time');
    this.sitesRef = firebaseApp.database().ref().child('sites');
    this.showOrHideTalkInfo  = this.props.screenProps.showOrHideTalkInfo;
    this.sites               = this.props.screenProps.sites;
    this.talks               = this.props.screenProps.talks;
    this.userTalks           = this.props.screenProps.userTalks;
    this.loggedUser          = this.props.screenProps.loggedUser;
    this.dataSourceUserTalks = this.props.screenProps.dataSourceUserTalks;

    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
  }

  componentDidMount() {
    this.readUserTalksByDay(this.props.screenProps.talks, this.props.screenProps.userTalks);
  }

  readUserTalksByDay(talks, userTalks) {
    var arrayUserTalksMon = [];
    var arrayUserTalksTue = [];
    var arrayUserTalksWed = [];
    var arrayUserTalksThu = [];
    var arrayUserTalksFri = [];
    var arrayUserTalksSat = [];

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

  renderTimeYesOrNo(userTalk, talks, day) {
    let myTalk = talks.find(x => x._key == userTalk.talk);

    if(myTalk.day == day) {
      if(myTalk.time == this.state.currentTalkTime) {
        return(
          <TalkCard talk={myTalk}
                    sites={this.props.screenProps.sites}
                    showOrHideTalkInfo={this.props.screenProps.showOrHideTalkInfo}
                    renderTime={false}
                    backTo={'MyTalks'} />
        )
      }
      else {
        return(
          <TalkCard talk={myTalk}
                    sites={this.props.screenProps.sites}
                    showOrHideTalkInfo={this.props.screenProps.showOrHideTalkInfo}
                    renderTime={true}
                    backTo={'MyTalks'} />
        )
      }
    }
    else {
      return(
        <View />
      )
    }
  }

  render() {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] ;
    const message = 'Aún no tenés charlas/eventos agregados este día';
    let talks = this.props.screenProps.talks;

    return (
      <Container style={styles.dark}>
        <Tabs>
          <Tab heading={ <TabHeading style={{backgroundColor: colors.light}}><Text>lun</Text></TabHeading> }>
            {
              this.state.userTalksMon.length != 0 ?
                <ListView
                  dataSource={this.props.screenProps.dataSourceUserTalks}
                  renderRow={(userTalk) => this.renderTimeYesOrNo(userTalk, this.props.screenProps.talks, days[0]) }
                  enableEmptySections={true}
                  renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />} /> :
                <View style={styles.empty}>
                  <Text style={styles.emptyText}> { message } </Text>
                </View>
            }
          </Tab>
          <Tab heading={ <TabHeading style={{backgroundColor: colors.light}}><Text>mar</Text></TabHeading> }>
            {
              this.state.userTalksTue.length != 0 ?
                <ListView
                  dataSource={this.props.screenProps.dataSourceUserTalks}
                  renderRow={(userTalk) => this.renderTimeYesOrNo(userTalk, this.props.screenProps.talks, days[1]) }
                  enableEmptySections={true}
                  renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />} /> :
                <View style={styles.empty}><Text style={styles.emptyText}> { message } </Text></View>
            }
          </Tab>
          <Tab heading={ <TabHeading style={{backgroundColor: colors.light}}><Text>mie</Text></TabHeading> }>
            {
              this.state.userTalksWed.length != 0 ?
                <ListView
                  dataSource={this.props.screenProps.dataSourceUserTalks}
                  renderRow={(userTalk) => this.renderTimeYesOrNo(userTalk, this.props.screenProps.talks, days[2]) }
                  enableEmptySections={true}
                  renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />} /> :
                <View style={styles.empty}><Text style={styles.emptyText}> { message } </Text></View>
            }
          </Tab>
          <Tab heading={ <TabHeading style={{backgroundColor: colors.light}}><Text>jue</Text></TabHeading> }>
            {
              this.state.userTalksThu.length != 0 ?
                <ListView
                  dataSource={this.props.screenProps.dataSourceUserTalks}
                  renderRow={(userTalk) => this.renderTimeYesOrNo(userTalk, this.props.screenProps.talks, days[3]) }
                  enableEmptySections={true}
                  renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />} /> :
                <View style={styles.empty}><Text style={styles.emptyText}> { message } </Text></View>
            }
          </Tab>
          <Tab heading={ <TabHeading style={{backgroundColor: colors.light}}><Text>vie</Text></TabHeading> }>
            {
              this.state.userTalksFri.length != 0 ?
                <ListView
                  dataSource={this.props.screenProps.dataSourceUserTalks}
                  renderRow={(userTalk) => this.renderTimeYesOrNo(userTalk, this.props.screenProps.talks, days[4]) }
                  enableEmptySections={true}
                  renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />} /> :
                <View style={styles.empty}><Text style={styles.emptyText}> { message } </Text></View>
            }
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: colors.text2,
  },
  weekDays: {
    color: colors.white,
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
    color: colors.medium,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.text2,
  },
});
