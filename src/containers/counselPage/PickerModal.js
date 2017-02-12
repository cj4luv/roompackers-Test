
import React, { Component } from 'react';
import {
  View,
  Modal,
  PickerIOS,
  TouchableHighlight,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard,
  Platform
} from 'react-native';

//화면 크기 얻기
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
//화면 크기에 따른 1픽셀 비율
const PIXEL_X = WINDOW_WIDTH/375;
const PIXEL_Y = WINDOW_HEIGHT/667;

import PickerAndroid from './PickerAndroid';

let Picker = Platform.OS === 'ios' ? PickerIOS : PickerAndroid;

class PickerModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      itemList: this.props.item,
      pickerList: [],
      index: 0
    };
  }
  componentDidMount(){
    this._pushPickerItem();
  }
  _pushPickerItem(){
    var list = [];
    //PickerIOS에 넣을 리스트 생성
    this.state.itemList.map((data, key)=>{
      list.push(<Picker.Item key={key} label={data} value={key} Style={{fontSize: 25, borderWidth:5}}/>)
    })
    this.setState({
      pickerList: list,
    });
  }

  render() {
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {alert("Modal has been closed.")}}
        >
        <TouchableOpacity  onPress={()=>{this.props.setModalVisible(false);}} activeOpacity={0}>
          <View style={styles.modalOpecity} />
        </TouchableOpacity>

        <View style={styles.modalContainer}>
          <TouchableHighlight style={styles.doneBtn}
            onPress={()=>{
              this.props.setModalVisible(false);
              //선택되는 아이템으로 SearchPage 값변경
              this.props.setValue(this.state.index);
            }} underlayColor='#fff'>
            <Text style={styles.doneBtnText}>Done</Text>
          </TouchableHighlight>
          <Picker
            style={{paddingHorizontal:PIXEL_X * 30}}
            selectedValue={this.state.index}
            onValueChange={(value)=>{
              //피커 index값 저장
              this.setState({index:value})
              Keyboard.dismiss();
            }}
          >
            {this.state.pickerList}
          </Picker>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  //모달관련 스타일 시트
  modalOpecity: {
    height: 450 * PIXEL_Y,
    backgroundColor: 'transparent',
  },
  modalContainer: {
    height: 217 * PIXEL_Y,
    backgroundColor: '#fff',
    opacity: 0.9
  },
  doneBtn: {
    height: PIXEL_Y * 40,
    alignItems:'flex-end',
    paddingRight:PIXEL_X * 15,
    borderBottomWidth: PIXEL_X * 2,
    borderBottomColor:'#efeff4',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  doneBtnText:{
    color: '#1a8793',
    fontSize: PIXEL_X * 18,
    backgroundColor: 'transparent'
  }
});


module.exports = PickerModal;
