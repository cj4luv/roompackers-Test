'use strict';

import React, {Component} from 'react';
import {
  StyleSheet
} from 'react-native';

import realm from './realm';


export default class LoginToken extends Component{
	//create user Token

	createUserToken(name, token){
		var user = realm.objects('User');
		if(user.length < 1){
			realm.write(() =>{
				realm.create('User', {id: 0, done:true, name: name, token: token})
			});
			user = realm.objects('User');
			return true;
		}else{
			return false;
		}
	}
	getUser(){
		var user = realm.objects('User');
		if(user.length>0) return user[0];
		else return false;
	}

	//update user token
	updateUserToken(name, token){
		realm.write(() =>{
			realm.create('User', {id: 0, done:true, name: name, token: token}, true);
		});
		let user = realm.objects('User');
	}

	//read user toeken
	readUserToken(){
		let user = realm.objects('User');
	}
	//delete user Token
	deleteUserToken(){
		realm.write(()=>{
			let data = realm.objects('User');
			realm.delete(data);
		});
		let user = realm.objects('User');
	}
}
