'use strict';

import React, {Component} from 'react';

import {
  AlertIOS,
  StyleSheet,
  Dimensions,
  Text,
  TouchableHighlight,
  View,
  ActivityIndicator,
} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const PIXEL_X = WINDOW_WIDTH/375;
const PIXEL_Y = WINDOW_HEIGHT/667;


import realm from './realm';
import LoginToken from './LoginToken';
const loginToken = new LoginToken;

export default class TestPage extends Component {
	render(){
    var date = new Date();
		return(
			<View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={()=>{
          console.log(date.getTime());
        }} >
          <Text style={styles.buttonText}>지금 시간보기</Text>
        </TouchableHighlight>      
				<TouchableHighlight style={styles.button} onPress={()=>{
          loginToken.createUserToken('hanminsu','lkjaslkdfjlkasjdk;lfajs');
        }} >
					<Text style={styles.buttonText}>데이터 생성</Text>
				</TouchableHighlight>
				<TouchableHighlight style={styles.button} onPress={()=>{
          loginToken.updateUserToken('hanminsu2','vvvasfdvfvdfvvvfvdv;lfajs');
        }} >
					<Text style={styles.buttonText}>데이터 갱신</Text>
				</TouchableHighlight>
				<TouchableHighlight style={styles.button} onPress={()=>{
          loginToken.readUserToken();
        }} >
					<Text style={styles.buttonText}>데이터 보기</Text>
				</TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={()=>{
          loginToken.deleteUserToken();
        }} >
          <Text style={styles.buttonText}>데이터 삭제</Text>
        </TouchableHighlight>        												
			</View>	
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
	},
  //header
  header: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    width: 140 * PIXEL_X,
    height: 29 * PIXEL_Y,
    marginTop: 7 * PIXEL_Y,
    marginLeft: 20 * PIXEL_X,
    marginRight: 20 * PIXEL_X,
    marginBottom: 7 * PIXEL_Y,
    borderWidth: 1 * PIXEL_X,
    borderRadius: 14 * PIXEL_X,
    borderColor: '#ceced2',
  },
  buttonText: {
    textAlign: 'center',
    marginTop: 7 * PIXEL_Y,
    alignItems: 'flex-end',
    color: '#4a4a4a',
    fontSize: 15 * PIXEL_X,
    width: 140 * PIXEL_X,
    height: 29 * PIXEL_Y,
  },
})