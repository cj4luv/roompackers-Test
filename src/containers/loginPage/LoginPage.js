import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  StatusBar,
  Platform
} from 'react-native';

import Button from '../../components/buttons/Button';

import FBSDK, { LoginManager, AccessToken} from 'react-native-fbsdk';

import * as firebase from 'firebase';
import Config from './constants';

const firebaseApp = firebase.initializeApp(Config.cfg_firebase_cho);
const auth = firebaseApp.auth();

import LoginToken from './LoginToken';
const loginToken = new LoginToken;

import { Actions } from 'react-native-router-flux';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const PIXEL_X = WINDOW_WIDTH/375;
const PIXEL_Y = WINDOW_HEIGHT/667;

const FONT_SC = Platform.OS === 'android' ? PIXEL_X * 0.9:1;

class LoginPage extends Component {

  constructor(props) {
    super(props);

  }

  //페이스북 연동 로그인
  _fbLogin() {
    //페이스북 SDK Login Manager 요청 할 권한과 함께 호출
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      (result) => {
        if(result.isCancelled) {
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              //console.log("AccessToken: " + data.accessToken.toString());
              //페이스북 토큰
              let accessToken = data.accessToken.toString();
              //파이베이스와 페이스북 연동 관찰자 선언
              let credential = firebase.auth.FacebookAuthProvider.credential(accessToken);

              //페이스북 엑세스토큰으로 인증 과정 부분
              auth.signInWithCredential(credential).then((result) => {
                //로그인 성공 시
                //result{diplayName, uid, email, photoURL}
                if(loginToken.createUserToken(result.displayName, result.uid))
                Actions.searchPage();

              }).catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;

                let email = error.email;

                let credential = error.credential;
                if (errorCode === 'auth/account-exists-with-different-credential') {
                  alert('You have already signed up with a different auth provider for that email.');
                  // If you are using multiple auth providers on your app you should handle linking
                  // the user's accounts here.
                } else {
                  console.error(error);
                }
              });
            }
          ).catch((error) => this.onError && this.onError(error));
        }
      },
      (error) => {
        console.log('Login failed with error ' + error);
      }
    );
  }

  renderNotLogged(){
    return(
      <Image style={styles.container} source={require('../../../public/img/loading@2x.jpg')}>
        <View style={styles.layer}>
          <View style={styles.productArea}>
            <Text style={styles.corporate}></Text>
            <Text style={styles.intro}></Text>
          </View>
          <View>
            <View style={styles.fbView}>
              <Button style={styles.fbBtn}
                onPress={() => {
                  this._fbLogin()
                }}>
                페이스북으로 로그인
                <View style={styles.arrow}></View>
              </Button>
            </View>
            <View style={styles.tourView}>
              <Button
                style={styles.tourBtn}
                onPress={() => Actions.searchPage()}>
                셀프인테리어 구경하기
                <View style={styles.arrow}></View>
              </Button>
            </View>
          </View>
        </View>
      </Image>
    );
  }

  componentWillMount() {
    if(loginToken.getUser()){
      Actions.searchPage();
    }
    if(Platform.OS === 'android') {
      StatusBar.setHidden(true)
    } else {
      StatusBar.setHidden(false)
    }

  }

  render(){
    return this.renderNotLogged();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: null,
    height: null,
    backgroundColor: 'rgba(0,0,0,0)',
    resizeMode: 'cover',
  },
  layer: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
  },
  productArea:{
    justifyContent: 'center',
    alignItems:'center',
    width: WINDOW_WIDTH,
    height: PIXEL_Y * 556,
  },
  corporate: {
    fontSize: PIXEL_X * 18 * FONT_SC,
    textAlign: 'center',
    margin: PIXEL_X * 4,
    color: '#ffffff',
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
  intro: {
    fontSize: PIXEL_X * 14 * FONT_SC,
    color: '#ffffff',
  },
  tourBtn: {
    fontSize: PIXEL_X * 16 * FONT_SC,
    color: '#ffffff',
    fontWeight: 'normal'
  },
  logo: {
    width:PIXEL_X * 100,
    height:PIXEL_Y * 100,
  },
  fbView: {
    width:PIXEL_X * 335,
    borderBottomWidth: 1.0,
    borderColor: '#ffffff',
    paddingBottom:PIXEL_X * 13.5,
  },
  arrow: {
    width:PIXEL_X * 10,
    height: PIXEL_Y * 10,
    borderRightWidth:PIXEL_X * 2,
    borderStyle: 'solid',
    borderRightColor: '#ffffff',
    borderBottomWidth: PIXEL_X * 2,
    borderBottomColor: '#ffffff',
    transform:[
      {translateX:0 },
      {rotate:'-45deg'}
    ],
  },
  fbBtn:{
    color: '#ffffff',
    fontSize: PIXEL_X * 16 * FONT_SC,
    fontWeight: 'normal'
  },
  tourView:{
    marginTop: PIXEL_X * 25,
    width:PIXEL_X * 335,
    borderBottomWidth: 1.0,
    borderColor: '#ffffff',
    paddingBottom: PIXEL_X * 13.5,
    marginBottom: PIXEL_X * 22,
  }
});

module.exports = LoginPage;
