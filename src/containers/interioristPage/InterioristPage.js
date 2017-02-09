import React, {Component} from 'react';
import {
  TouchableHighlight,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';

import { Actions } from 'react-native-router-flux';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const PIXEL_X = WINDOW_WIDTH/375;
const PIXEL_Y = WINDOW_HEIGHT/667;

class InterioristPage extends Component {
  componentWillMount(){
    Actions.refresh({title: this.props.title});
  }

  render() {
    return(
      <ScrollView style={styles.mainTopView}>
        <View style={styles.subView}>
          <View style= {styles.header}>
            <View style={styles.circlePhotoArea}>
              <Image source={{uri: 'http://www.roompackers.com/img/react/avatar/'+this.props.id+'.jpg'}} style={styles.circlePhoto}></Image>
            </View>
            <View style={styles.masterInfo}>
              <Text style={styles.portpolio}>포트폴리오 보유 개수 {this.props.data.port_len}개</Text>
              <Text style={styles.hashTag}>{this.props.data.speciality}</Text>
            </View>
          </View>

          <Text style={styles.title}>셀프인테리어를 시작하게 된 계기는 무엇인가요?</Text>
          <Text style={styles.subject}>{this.props.data.desc_1}</Text>
          <Text style={styles.title}>인테리어를 할때 중점을 두는 부분은 무엇인가요?</Text>
          <Text style={styles.subject}>{this.props.data.desc_2}</Text>
          <Text style={styles.title}>자신이 느끼는 셀프인테리어의 매력은 무엇인가요?</Text>
          <Text style={styles.subject}>{this.props.data.desc_4}</Text>
        </View>     
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainTopView: {
    flex: 1,
    backgroundColor:'#f8f8fc',
  },
  header: {
    flexDirection: 'row',
    marginBottom: PIXEL_X * 14.8
  },
  title: {
    fontSize:PIXEL_X * 15,
    color: '#4a4a4a',
    fontWeight: 'bold',
    marginBottom: PIXEL_X * 10
  },
  subView: {
    marginTop: PIXEL_X * 20,
    marginLeft: PIXEL_X * 15,
    marginRight: PIXEL_X * 15,
  },
  subject: {
    fontSize:PIXEL_X * 15,
    color: '#4a4a4a',
    marginBottom: PIXEL_X * 15
  },
  circlePhotoArea:{
    width:PIXEL_X * 63,
    height:PIXEL_Y * 63,
    borderRadius:PIXEL_X * 50,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent:'center',
    alignItems: 'center'
  },
  circlePhoto: {
    width:PIXEL_X * 63,
    height:PIXEL_Y * 63,
    borderRadius:PIXEL_X * 30,
  },
  masterInfo: {
    flex: 1,
    marginLeft: PIXEL_X * 20,
    justifyContent: 'center',
  },
  portpolio: {
    fontSize: PIXEL_X * 15,
    fontWeight: 'normal',
    color: '#4a4a4a',
  },
  hashTag: {
    fontSize: PIXEL_X * 15,
    fontWeight: 'normal',
    color: '#1a8793',
  },
})

module.exports = InterioristPage;
