'use strict'

import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Alert, } from 'react-native';

import colors from './constants/Colors';

export default class TalkCard extends Component {
	constructor(props) {
		super(props);
	}

	getObjectOfArray(array, index) {
    return array[index] = array[index] || {};
	}

	render() {
    let showOrHideTalkInfo = this.props.showOrHideTalkInfo;
    let sites = this.props.sites;
    let backTo = this.props.backTo;
    let space = '             ';

		return(
			<TouchableWithoutFeedback onPress={() => this.props.showOrHideTalkInfo(this.props.talk, this.props.backTo)} >

				<View style={styles.TalkCardContainer}>
					<View styke={styles.TalCardColumn}>
						<View style={styles.TalkTimeContainer}>
							<Text style={styles.TalkText}> {this.props.renderTime ? this.props.talk.time : space} </Text>
						</View>
					</View>

					<View style={styles.TalCardColumn}>
						<View style={styles.TalkTitleContainer}>
							<Text style={styles.TalkText}>{this.props.talk.title}</Text>
						</View>
						<View style={styles.TalkSiteContainer}>
							<Text style={[styles.TalkSiteText,
													 {color: `${this.getObjectOfArray(sites, this.props.talk.site - 1).color || 'red'}`}]}>
								{this.getObjectOfArray(sites, this.props.talk.site - 1).name}
							</Text>
						</View>
					</View>
				</View>

			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
  TalkCardContainer: {
    flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.dark,
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
    color: colors.text1,
	},
});
