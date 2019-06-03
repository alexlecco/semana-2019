'use strict'

import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Alert, } from 'react-native';

import colors from './constants/Colors';

export default class TalkQuestion extends Component {
	constructor(props) {
		super(props);
		this.state = {
      user: ''
    }
	}

	componentWillMount() {
		this.getUserName(this.props.users);
	}

	getUserName(users) {
		let localUser = '';

		this.props.users.forEach((user) => {
			for(let i = users.length; i > 0; i--) {
				if(user._key === this.props.talkQuestion.user) {
					localUser = user.name
				}
			}
		});

		this.setState({ user: localUser });
	}

	render() {
		return(
			<View style={styles.questionWrapper}>
					<View style={styles.questionContainer}>

						<View style={styles.questionBodyContainer}>
              <Text style={styles.questionBody}>
								{this.props.talkQuestion.body}
							</Text>
            </View>

						<View style={styles.questionUserNameContainer}>
							<Text style={styles.questionUserName}>
								{ this.state.user }
							</Text>
						</View>

					</View>
				</View>
		);
	}
}

const styles = StyleSheet.create({
  questionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
	questionContainer: {
		flexDirection: 'column',
		marginTop: 20,
		marginBottom: 30,
	},
	questionUserNameContainer: {
		flexWrap: 'wrap',
		textAlign: 'right',
		paddingBottom: 10,
		flexDirection: 'row',
		width: Dimensions.get('window').width - 82,
	},
	questionUserName: {
		fontSize: 13,
		textAlign: 'center',
		color: colors.text2,
		flexWrap: 'wrap',
	},
	questionBodyContainer: {
		flexWrap: 'wrap',
		textAlign: 'center',
	},
  questionBody: {
		textAlign: 'center',
		fontSize: 17,
    color: colors.text1,
	},
});
