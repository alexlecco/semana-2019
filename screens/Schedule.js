import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Button,
  Alert,
  ListView,
  ListItem,
} from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, Content, } from 'native-base';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import TalkCard from '../TalkCard';

import { firebaseApp } from '../firebase';
import colors from '../constants/Colors';

export default class Schedule extends React.Component {
  static navigationOptions = {
    title: 'Cronograma',
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
      currentTalkTime: 'perrito',
      homeLink: "Home",
      homeMounted: true,
      talks: [],
    };
    this.showOrHideTalkInfo = this.props.screenProps.showOrHideTalkInfo;
    this.sites              = this.props.screenProps.sites;
    this.talks              = this.props.screenProps.talks;
    this.dataSourceTalksMon = this.props.screenProps.dataSourceTalksMon;
    this.dataSourceTalksTue = this.props.screenProps.dataSourceTalksTue;
    this.dataSourceTalksWed = this.props.screenProps.dataSourceTalksWed;
    this.dataSourceTalksThu = this.props.screenProps.dataSourceTalksThu;
    this.dataSourceTalksFri = this.props.screenProps.dataSourceTalksFri;
    this.dataSourceTalksSat = this.props.screenProps.dataSourceTalksSat;

    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.readTalks(this.props.screenProps.talks);
  }

  readTalks(talks) {
    this.setState({ talks: talks });
  }

  changeCurrentTalkTime(time) {
    this.setState({currentTalkTime: time})
  }

  renderTimeYesOrNo(talk) {
    if(talk.time == this.state.currentTalkTime) {
      return(
        <TalkCard talk={talk}
                  sites={this.props.screenProps.sites}
                  showOrHideTalkInfo={this.props.screenProps.showOrHideTalkInfo}
                  renderTime={false}
                  backTo={'Schedule'} />
      )
    }
    else {
      return(
        <TalkCard talk={talk}
                  sites={this.props.screenProps.sites}
                  showOrHideTalkInfo={this.props.screenProps.showOrHideTalkInfo}
                  renderTime={true}
                  backTo={'Schedule'} />
      )
    }
  }

  render() {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] ;
    let showOrHideTalkInfo = this.props.screenProps.showOrHideTalkInfo;
    let sites = this.props.screenProps.sites;
    let talks = this.props.screenProps.talks;

    return (
      <Container style={styles.dark}>
          <Tabs>
            <Tab heading={ <TabHeading style={{backgroundColor: colors.light}}><Text>lun</Text></TabHeading> }>
              <ListView
                dataSource={this.props.screenProps.dataSourceTalksMon}
                renderRow={(talk) => this.renderTimeYesOrNo(talk) }
                enableEmptySections={true}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />} />
            </Tab>

            <Tab heading={ <TabHeading style={{backgroundColor: colors.light}}><Text>mar</Text></TabHeading> }>
              <ListView
                dataSource={this.props.screenProps.dataSourceTalksTue}
                renderRow={(talk) => this.renderTimeYesOrNo(talk) }
                enableEmptySections={true}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />} />
            </Tab>

            <Tab heading={ <TabHeading style={{backgroundColor: colors.light}}><Text>mie</Text></TabHeading> }>
              <ListView
                dataSource={this.props.screenProps.dataSourceTalksWed}
                renderRow={(talk) => this.renderTimeYesOrNo(talk) }
                enableEmptySections={true}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />} />
            </Tab>

            <Tab heading={ <TabHeading style={{backgroundColor: colors.light}}><Text>jue</Text></TabHeading> }>
              <ListView
                dataSource={this.props.screenProps.dataSourceTalksThu}
                renderRow={(talk) => this.renderTimeYesOrNo(talk) }
                enableEmptySections={true}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />} />
            </Tab>

            <Tab heading={ <TabHeading style={{backgroundColor: colors.light}}><Text>vie</Text></TabHeading> }>
              <ListView
                dataSource={this.props.screenProps.dataSourceTalksFri}
                renderRow={(talk) => this.renderTimeYesOrNo(talk) }
                enableEmptySections={true}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />} />
            </Tab>
          </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  weekDays: {
    color: colors.white,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.text2,
  },
  dark: {
    backgroundColor: colors.dark,
  }
});
