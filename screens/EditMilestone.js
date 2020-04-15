import React, { useState } from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {Text, Container, Content, Button, Icon, Grid, Row, Col} from 'native-base';

import Head from '../components/header.js';// Nav bar displaying app's title, section title, and menu button
import Foot from '../components/Foot.js';// Footer displaying instructions

const EditMilestone = (props) => {
	const [currentTitle, setCurrentTitle] = useState("");
	const [currentDescr, setCurrentDescr] = useState("");
	const updateTitle = (text) => {setCurrentTitle(text)};
	const updateDescri = (text) => {setCurrentDescr(text)};

	return (
		<Container>
			<Head  /> 
			<Content>
				<Grid>
					<Row><Col><Text>Edit/Add Milestones</Text></Col></Row>
					<Row><Col><Text>Original Goal</Text></Col></Row>
					<Row>
						<Col>
							<TextInput placeholder="Original Milestone Title" />
						</Col>
					</Row>
					<Row>
						<Col>
							<TextInput placeholder="Original Milestone Description" />
						</Col>
					</Row>
					<Row>
						<Col>
							<Button text="Finish" />
						</Col>
					</Row>
				</Grid>
			</Content>

			<Foot title="*Check off a milestone when finished. View it on the Acheivement Timeline" />
		</Container>
	);
}

export default EditMilestone;