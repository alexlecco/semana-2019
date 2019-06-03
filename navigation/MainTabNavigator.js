import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Schedule from '../screens/Schedule';
import MyTalks from '../screens/MyTalks';
import Sponsors from '../screens/Sponsors';
import colors from '../constants/Colors';

const HomeStack = createStackNavigator({
  Home: Schedule,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Calendario',
  tabBarOptions: {
    activeTintColor: colors.medium,
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-calendar'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: MyTalks,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Mis charlas',
  tabBarOptions: {
    activeTintColor: colors.medium,
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-heart'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: Sponsors,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Sponsors',
  tabBarOptions: {
    activeTintColor: colors.medium,
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-people'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
