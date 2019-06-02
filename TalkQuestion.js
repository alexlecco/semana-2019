'use strict'

import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Alert, } from 'react-native';

export default class TalkQuestion extends Component {
	constructor(props) {
		super(props);
	}

	getObjectOfArray(array, index) {
    return array[index] = array[index] || {};
	}

	render() {
    let showOrHideTalkInfo = this.props.showOrHideTalkInfo;
    let space = '             ';

		return(
			<TouchableWithoutFeedback onPress={() => {}} >

				<View><Text>Holis</Text></View>

			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
  TalkCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
	TalCardColumn: {
    flexDirection: 'column',
	},
	TalkTimeContainer: {
		margin: 10,
  },
	TalkTitleContainer: {
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 10,
		marginTop: 10,
		marginRight: 10,
		flexWrap: 'wrap',
		flexDirection: 'row',
		width: Dimensions.get('window').width - 82,
	},
	TalkSiteContainer: {
		flexWrap: 'wrap',
		paddingBottom: 10,
		flexDirection: 'row',
		width: Dimensions.get('window').width - 82,
	},
	TalkSiteText: {
		fontSize: 13,
	},
	TalkText: {
		fontSize: 17,
    color: '#4f4f4f',
	},
});