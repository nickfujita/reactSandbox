import React from 'react-native';
import api from '../Utils/api';
import Dashboard from './dashboard';
import Camera from './camera';
import VideoCam from './video';

var {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableHighlight,
	ActivityIndicatorIOS
} = React;

class Main extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			isLoading: false,
			error: false
		}
	}
	//user defined function to handle an event
	handleChange(event) {
		//input has the value nativeElement
		this.setState({
			username: event.nativeEvent.text
		});
	}
	handleSubmit(event) {
		//update the status spinner
		this.setState({
			isLoading: true
		})
		//get the data for the user from github
		api.getBio(this.state.username)
			.then((res) => {
				// console.log('this is the res from github',res);
				if(res.message === 'Not Found') {
					this.setState({
						error: 'User not found',
						isLoading: false
					})
				} else {
					// console.log('about to change to the bio dashboard');
					this.props.navigator.push({
						title: res.name || 'Select an Option',
						component: Dashboard,
						passProps: {userInfo: res}
					});

					this.setState({
						isLoading: false,
						error: false,
						username: ''
					})
				}
			})
			.catch((err) => console.err(err))
		//sent to next route  with output of github api
	}
	openCamera(event) {
		this.props.navigator.push({
			title: 'Camera',
			component: Camera
		});
	}
	openVideo(event) {
		this.props.navigator.push({
			title: 'videoCam',
			component: VideoCam
		});
	}
	render(){
		var showErr = (
			this.state.error ? <Text> {this.state.error} </Text> : <View />
		);
		return (
			<View style={styles.mainContainer}>
				<Text style={styles.title}>
					Search for a WORMIE~!!!
				</Text>
				<TextInput
					style = {styles.searchInput}
					value = {this.state.username}
					onChange = {this.handleChange.bind(this)}
				/>
				<TouchableHighlight
					style = {styles.button}
					onPress = {this.handleSubmit.bind(this)}
					underlayColor = 'white'
				>
					<Text style={styles.buttonText}> SEARCH </Text>
				</TouchableHighlight>
				<ActivityIndicatorIOS
					animating = {this.state.isLoading}
					color = '#111'
					size = 'large'
				></ActivityIndicatorIOS>
				{showErr}
				<TouchableHighlight
					style = {styles.button}
					onPress = {this.openCamera.bind(this)}
					underlayColor = 'white'
				>
					<Text style={styles.buttonText}> CAMERA </Text>
				</TouchableHighlight>
				<TouchableHighlight
					style = {styles.button}
					onPress = {this.openVideo.bind(this)}
					underlayColor = 'white'
				>
					<Text style={styles.buttonText}> SCRECORDER </Text>
				</TouchableHighlight>
			</View>
		)
	}
};

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

export default Main;