import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform
} from 'react-native';

import Util from '../../components/functions/Util';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const PIXEL_X = WINDOW_WIDTH/375;
const PIXEL_Y = WINDOW_HEIGHT/667;

import CheckButton from '../../components/buttons/CheckButton';
import Button from '../../components/buttons/Button';

import PickerModal from './PickerModal';

//정규식 변수 한글만 검사, 주소검사, 숫자만 검사, 연락처검사
const hangulValidChecked = /^[가-힣]{2,16}$/;
const hangulAdressValidChecked = /^[가-힣]|[가-힣\s]+$/;
const numValidChecked = /^[0-9]+$/;
const phoneNumberValidChecked = /^[0-9]{2,3}-?[0-9]{3,4}-?[0-9]{4}$/;

import { Actions,  ActionConst } from 'react-native-router-flux';

import * as actions from '../app/actions';
import { connect } from 'react-redux';

const FONT_SC = Platform.OS === 'android' ? PIXEL_X * 0.9:1;

class CounselPage extends Component {

  constructor(props){
    super(props);

    //픽커 아이템 종류 추가 부분
    this.homeType = ['아파트', '오피스텔','원룸','빌라', '기타'];
    this.roomType = ['전체','원룸','거실','방','주방','기타'];

    //작품 정보 입력 부분
    this.portfolio = {
      title_1: this.props.productTitle,
      interiorName: this.props.name,
      port_id:this.props.port_id,
    }

    this.state = {
      //신청자 정보 각 TextInput의 Value를 담는 부분.
      custemerName:'',
      homeType:'',
      location: '',
      size:'',
      roomType:'',
      phone: '',

      //건물유형 픽커 모달
      homeTypeVisible: false,
      homeTypeNum: 0,

      //의뢰분야 픽커 모달
      roomTypeVisible: false,
      roomTypeNum:0,

      //상담 신청 버튼 활성 & 비활성화
      //isOpacity 상담 신청 버튼 영역의 투명도
      //isCounselBtn 버튼이 터치가 되지 않도록 온 오프
      isOpacity: false,
      isCounselBtn: true,

      //TextInput의 Placeholder Text 초기값
      //유효성 검사 통과 못 할시 경고 메세지로 변경
      custemerNameMessage: '이름을 입력하세요',
      homeTypeMessage: '건물유형을 선택하세요',
      locationMessage: '시와 구를 입력하세요',
      sizeMessage: '평수를 입력하세요.',
      roomTypeMessge: '의뢰분야를 선택하세요',
      phoneMessage: '연락처를 입력하세요',

      //각 TextInput의 Value 유효성 검사
      isCustemerName: true,
      ishomeType: true,
      islocation: true,
      issize: true,
      isroomType: true,
      isphone: true,

      //체크박스 버튼 ON OFF
      checked: false,
    }
  }

  //체크박스 버튼 활성 & 비활성 상담 버튼 활성 비활성 설정
  _isCheckBoxToggle() {
    if(this.state.checked === false) {
      this.setState({checked: true});
      this._changeCounselBtnColor();
    } else {
      this.setState({checked: false, isOpacity: false , isCounselBtn: true});
    }
  }

  //TextInput영역과 _isCheckBoxToggle에서 유효성 검사 후 상담 버튼 활성 & 비활성
  _changeCounselBtnColor() {
    if(hangulValidChecked.test(this.state.custemerName) && hangulValidChecked.test(this.state.homeType) &&
      hangulAdressValidChecked.test(this.state.location) && numValidChecked.test(this.state.size) &&
      hangulValidChecked.test(this.state.roomType) && phoneNumberValidChecked.test(this.state.phone) ) {
      this.setState({isOpacity: true, isCounselBtn: false});
    } else {
      this.setState({isOpacity: false, isCounselBtn: true});
    }
  }

  //TextInput의 Value 유효성 검사 후 각 TextInput Value 영역에 잘못 됨을 표시
  _checkCustmerNameValidation() {
    if(!hangulValidChecked.test(this.state.custemerName)) {
      this.setState({
        custemerName:'',
        custemerNameMessage: '유효한 성함을 입력하세요.',
        isCustemerName: false,
      });
    }
  } _checkhomeTypeValidation() {
    if(!hangulValidChecked.test(this.state.homeType)) {
      this.setState({
        homeType:'',
        homeTypeMessage: '유효한 건물유형을 선택하세요',
        ishomeType: false,
      });
    }
  } _checklocationValidation() {
    if(!hangulAdressValidChecked.test(this.state.location)) {
      this.setState({
        location:'',
        locationMessage: '유효한 시와 구를 입력하세요',
        islocation: false,
      });
    }
  } _checksizeValidation() {
    if(!numValidChecked.test(this.state.size)) {
      this.setState({
        size:'',
        sizeMessage: '평수를 입력하세요.',
        issize: false
      });
    }
  } _checkroomTypeValidation() {
    if(!hangulValidChecked.test(this.state.roomType)) {
      this.setState({
        roomType:'',
        roomTypeMessge: '유효한 의뢰 분야를 선택해주세요',
        isroomType: false,
      });
    }
  } _checkContackValidation() {
    if(!phoneNumberValidChecked.test(this.state.phone)) {
      this.setState({
        phone:'',
        phoneMessage: '올바른 전화번호를 입력해주세요.',
        isphone: false
      });
    }
  }

  //TextInput 영역에서 바로 픽커를 실행 시 텍스트인풋 영역유효성 검사 실행
  _whenTouchModalCheckedValidation() {
    if(this.state.custemerName != '' ) {
      this._checkCustmerNameValidation();
    }
    if(this.state.location != '') {
      this._checklocationValidation();
    }
    if(this.state.size != '') {
      this._checksizeValidation();
    }
    if(this.state.phone != '') {
      this._checkContackValidation();
    }
  }

  //모달 온오프 스위치
  _sethomeTypeVisible(visible) {
    this.setState({homeTypeVisible: visible});
  }
  _setroomTypeVisible(visible) {
    this.setState({roomTypeVisible: visible});
  }

  //피커 값 전달
  _sethomeTypeValue(value){
    this.setState({
      homeTypeNum: value,
      homeType: this.homeType[value]
    });
  }
  _setroomTypeValue(value) {
    this.setState({
      roomTypeNum: value,
      roomType: this.roomType[value]
    });
  }

  //상담 버튼 터치 후 푸쉬 알람(미구현)
  _checkCustmerInfo() {
    //this.props.changeModalSwich(true);
    data = {
      portfolio: this.portfolio.title_1,
      provider: this.props.name,
      name:this.state.custemerName,
      hometype:this.state.homeType,
      location:this.state.location,
      size:this.state.size,
      roomtype:this.state.roomType,
      phone:this.state.phone,
    }
    this._PostCounsel(data);
  }

  _PostCounsel(data){
      fetch('http://www.roompackers.com/db/counsel/post', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            portfolio: data.portfolio,
            provider: data.provider,
            name: data.name,
            hometype: data.hometype,
            location: data.location,
            size: data.size,
            roomtype: data.roomtype,
            phone: data.phone,
          })
      }).then((response) => response.json()).
      then((responseData) => {
        // Actions.detailPage({
        //   modalVisible: true,
        //   type:ActionConst.REPLACE,
        //   id: this.props.port_id,
        //   title: this.props.productTitle,
        //   data: this.props.data,
        //   // isCounselBtn: true,
        //   // isOpacity: false,
        //   //popNum: 2
        // });
        //console.log(this.props.changeModalSwich(true));
        Actions.pop();
      })
      .done();
  }

  /*=========================================================================================================

                                  Render Part

  =========================================================================================================*/

  /* 상담자 유저 정보 입력란 */
  _renderCustemersize() {
    return(
      <View style={styles.custemersize}>
        <Text style={styles.secondTitle}>신청자 정보</Text>

        <View style={styles.custemerInfo}>
          <Text style={styles.category}>신청자</Text>
          <TextInput style={styles.textInput}
            underlineColorAndroid='transparent'
            onBlur={() => {
              if(this.state.checked === true ) {
                //상담신청 완료 버튼 ON-OFF
                this._changeCounselBtnColor();
              }
              //TextInput value 값이 유효 한지 검사
              this._checkCustmerNameValidation();
            }}
            returnKeyType="done" onChangeText={(text) => this.setState({custemerName: text})}
            placeholder={this.state.custemerNameMessage} placeholderTextColor={this.state.isCustemerName ? "#9b9b9b":'red'}
            value={this.state.custemerName}/>
        </View>

        <View style={styles.custemerInfo}>
          <Text style={styles.category}>건물유형</Text>
          <TouchableOpacity style={styles.pickerBtnsize}
            onPress={() => {
              this._sethomeTypeVisible(true);
              if(this.state.checked === true ) {
                this._changeCounselBtnColor();
              }
              //TextInput 객체에서 done버튼을 종료하지 않고 바로 피커 실행시 TextInput Value값이 유효한지 검사
              this._whenTouchModalCheckedValidation();
              this._checkhomeTypeValidation();}}
            >
            <TextInput
              style={ Platform.OS === 'android' ? {paddingLeft: PIXEL_X * 10, width: PIXEL_X * 275, color:'black'}:styles.textInput }
              editable={false}
              onChangeText={(text) => this.setState({homeType: text})}
              placeholder={this.state.homeTypeMessage} placeholderTextColor={this.state.ishomeType ? "#9b9b9b":'red'}
              value={this.state.homeType}/>
          </TouchableOpacity>
        </View>

        <View style={styles.custemerInfo}>
          <Text style={styles.category}>거주지역</Text>
          <TextInput style={styles.textInput}
            onBlur={() => {
              if(this.state.checked === true ) {
                this._changeCounselBtnColor();
              }
              this._checklocationValidation();
            }}
            returnKeyType="done" onChangeText={(text) => this.setState({location: text})}
            placeholder={this.state.locationMessage} placeholderTextColor={this.state.islocation ? "#9b9b9b":'red'}
            value={this.state.location}/>
        </View>

        <View style={styles.custemerInfo}>
          <Text style={styles.category}>면적 (평)</Text>
          <TextInput style={styles.textInput}
            onBlur={() => {
              if(this.state.checked === true ) {
                this._changeCounselBtnColor();
              }
              this._checksizeValidation();
            }}
            keyboardType='number-pad' returnKeyType="done" onChangeText={(text) => this.setState({size: text})}
            placeholder={this.state.sizeMessage} placeholderTextColor={this.state.issize ? "#9b9b9b":'red'}
            value={this.state.size} />
        </View>

        <View style={styles.custemerInfo}>
          <Text style={styles.category}>의뢰분야</Text>
          <TouchableOpacity style={styles.pickerBtnsize}
            onPress={() => {
              this._setroomTypeVisible(true);
              if(this.state.checked === true ) {
                this._changeCounselBtnColor();
              }
              this._whenTouchModalCheckedValidation();
              this._checkroomTypeValidation();}}
            >
            <TextInput
              style={ Platform.OS === 'android' ? {paddingLeft: PIXEL_X * 10, width: PIXEL_X * 275, color:'black'}:styles.textInput }
              editable={false}
              onChangeText={(text) => this.setState({roomType: text})}
              placeholder={this.state.roomTypeMessge} placeholderTextColor={this.state.isroomType ? "#9b9b9b":'red'}
              value={this.state.roomType}/>
          </TouchableOpacity>
        </View>

        <View style={styles.custemerInfo}>
          <Text style={styles.category}>연락처</Text>
          <TextInput style={styles.textInput}
            onBlur={() => {
              if(this.state.checked === true ) {
                this._changeCounselBtnColor();
              }
                this._checkContackValidation();
            }}
             keyboardType='number-pad' returnKeyType="done" onChangeText={(text) => this.setState({phone: text})}
             placeholder={this.state.phoneMessage} placeholderTextColor={this.state.isphone ? "#9b9b9b":'red'}
             value={this.state.phone}/>
        </View>

      </View>
    );
  }

  //피커 랜더 부분
  _rederModalPicker() {
    return(
      <View>
        <PickerModal
           item={this.homeType}
           modalVisible={this.state.homeTypeVisible}
           setValue={this._sethomeTypeValue.bind(this)}
           setModalVisible={this._sethomeTypeVisible.bind(this)}
         />
         <PickerModal
           item={this.roomType}
           modalVisible={this.state.roomTypeVisible}
           setValue={this._setroomTypeValue.bind(this)}
           setModalVisible={this._setroomTypeVisible.bind(this)}
         />
      </View>
    );
  }

  /* 작품 정보 영역 */
  _renderPostInfo() {
    return(
      <View style={styles.productionsize}>
        <Text style={styles.title}>작품 정보</Text>
        <View style={styles.productionInfo}>
          <Text style={styles.category}>작품</Text>
          <Text style={styles.subject}>{this.portfolio.title_1}</Text>
        </View>
        <View style={styles.productionInfo}>
          <Text style={styles.category}>능력자</Text>
          <Text style={styles.subject}>{this.portfolio.interiorName}</Text>
        </View>
      </View>
    );
  }

  /* 체크박스 버튼 영역 */
  _renderCheckBoxBtn() {
    return(
      <View style={styles.checkButtonsize}>
        <CheckButton onChange={()=>this._isCheckBoxToggle()} checked={this.state.checked} text='개인정보취급방침에 동의합니다' textStyle={styles.footerText} />
      </View>
    );
  }

  /* 상담 버튼 영역  disabled 값을 false로 주면 텍스트 인풋에 값입력 안하고 바로 버튼 활성됩니다. disabled={this.state.isCounselBtn} */
  _renderCounselBtn() {
    return(
      <Button onPress={()=>{this._checkCustmerInfo(); this.props.changeModalSwich(true); }} disabled={this.state.isCounselBtn} >
        <View style={{opacity: this.state.isOpacity ? 1 : 0.6 }}>
          <View style={styles.circleBottomBtn}>
            <Text style={styles.circleBottomBtnText}>상담신청 완료</Text>
          </View>
        </View>
      </Button>
    );
  }

  render() {
    return(
      <View style={styles.mainTopView}>
        { /* KeyboardAvoidingView는 키패드 생성시 하위 객체들이 키패드 만큼 y축으로 이동 */ }
        <KeyboardAvoidingView behavior='position'>
          <TouchableOpacity  onPress={()=>{Keyboard.dismiss()}} activeOpacity={1} >
          {this._rederModalPicker()}
          <View style={styles.subView}>
            { /* 작품 정보 영역 */
              this._renderPostInfo() }
            { /* 상담자 유저 정보 입력란 */
              this._renderCustemersize() }
            { /* 체크박스 버튼 영역 */
              this._renderCheckBoxBtn() }
            { /* 상담 버튼 영역 */
              this._renderCounselBtn() }
          </View>
        </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>

    );
  }

}

/*=========================================================================================================

                                Style Sheet

=========================================================================================================*/


const styles = StyleSheet.create({
  mainTopView: {
    flex: 1,
    backgroundColor:'#f8f8fc',
  },
  title: {
    fontSize:PIXEL_X * 15 * FONT_SC,
    color: '#4a4a4a',
    fontWeight: 'bold',
    width: PIXEL_X * 70
  },
  subView: {
    marginTop: PIXEL_X * 20,
    marginLeft: PIXEL_X * 15,
    marginRight: PIXEL_X * 15,
  },
  productionInfo: {
    marginTop: PIXEL_X * 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-start'
  },
  category:{
    fontSize:PIXEL_X * 15 * FONT_SC,
    color: '#4a4a4a',
    fontWeight: 'normal',
    width: PIXEL_X * 70
  },
  subject: {
    width: PIXEL_X * 260,
    fontSize:PIXEL_X * 15 * FONT_SC,
    color: '#4a4a4a',
    fontWeight: 'normal',
  },
  productionsize: {
    marginBottom: PIXEL_X * 30,
  },
  custemersize: {

  },
  secondTitle: {
    fontSize:PIXEL_X * 15 * FONT_SC,
    color: '#4a4a4a',
    fontWeight: 'bold',
    width: PIXEL_X * 70,
    marginBottom: PIXEL_X * 10,
  },
  custemerInfo: {
    height: PIXEL_Y * 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-start',
    marginBottom: PIXEL_X * 5
  },
  textInput: {
    flex: 1,
    backgroundColor:'#efeff4',
    fontSize: PIXEL_X * 14 * FONT_SC,
    paddingLeft: PIXEL_X * 10,
    fontWeight: 'normal'
  },
  checkButtonsize: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-start',
    marginTop: PIXEL_X * 26,
  },
  footerText: {
    width:PIXEL_X * 318,
    marginLeft: PIXEL_X * 10,
    fontSize: PIXEL_X * 15 * FONT_SC,
    fontWeight: 'normal',
  },
  circleBottomBtnText:{
    fontSize: PIXEL_X * 15 * FONT_SC,
    textAlign: 'center',
    color: '#fff'
  },
  pickertext: {
    fontSize: PIXEL_X * 14 * FONT_SC,
    color:'#9b9b9b',
    fontWeight: 'normal',
  },
  pickerBtnsize: {
    flex: 1,
    backgroundColor:'#efeff4',
    height: PIXEL_Y * 40,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  //상담 완료 버튼
  circleBottomBtn : {
    marginTop: PIXEL_X * 31,
    width: PIXEL_X * 345,
    height: PIXEL_Y * 44,
    borderRadius: PIXEL_X * 22,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#1a8793',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a8793',
  }
})

//module.exports = CounselPage;
export default connect(
  (state) => ({

  }),
  (dispatch) => ( {
    changeModalSwich:(visible) => dispatch(actions.changeModalSwich(visible))
  })
)(CounselPage)
