import React, { Component } from 'react';
import {
  ActivityIndicator,
  AlertIOS,
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  StatusBar
} from 'react-native';

import * as actions from '../app/actions';
import { connect } from 'react-redux';

import Util from '../../components/functions/Util';

import Button from '../../components/buttons/Button';
import Swiper from '../../components/swiper/Swiper';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const PIXEL_X = WINDOW_WIDTH/375
const PIXEL_Y = WINDOW_HEIGHT/667

var IMG_PATH = 'http://www.roompackers.com/img/react/';

import { Actions, ActionConst } from 'react-native-router-flux';

import * as Animatable from 'react-native-animatable';

class DetailPage extends Component {
  //상담 완료시 버튼 비활성  부분
  static defaultProps = {

    //버든 기능 온오프 및 버튼 스타일 변형
    isCounselBtn: false,
    isOpacity: true,
  }

  constructor(props){
    super(props);
    this.state = {
      indexNum: 0,
      numberOfLines: 3,

      //DB로부터 작품 데이터 로드
      portData: this.props.data,
      //작품데이터의
      imgData: {
        pv: '',
        pd: '',
        pvPath: '',
        ctg: [],
        imgCount: 0,
      },
      homeType: '',     //거주유형
      totalPeriod: 0,   //시공기간
      skillTag: '',     //스킬태그
      currentCtg: 0,

      isThumb: false,  //섬네일 레이어
      modalAnimation: true //푸시 모달 애니메이션
    }
  }

  //redux로 값이 변한 props 값으로
  // shouldComponentUpdate() {
  //   if(this.props.modalVisible === false) {
  //     return true;
  //   }
  //   if (this.props.modalVisible === true) {
  //     if(setTimeout(()=>{this.props.changeModalSwich(false), 3500}))
  //       return true;
  //   }
  //
  // }

  componentWillMount(){
    Actions.refresh({title: this.props.title});
    this._setDataFromFetching(this.props.data);
  }

  _setDataFromFetching(data){

    var pv_id = parseInt(this.props.id/100);
    var pd_id = parseInt(this.props.id%100);

    //카테고리별 사진 길이 얻기
    var ctg = [];
    ctg[0] = {      value: 0, name: '전체', length: 1,                };
    ctg[1] = {      value: 1, name: '원룸', length: data.c1_len       };
    ctg[2] = {      value: 2, name: '거실', length: data.c2_len       };
    ctg[3] = {      value: 3, name: '방',   length: data.c3_len      };
    ctg[4] = {      value: 4, name: '주방', length: data.c4_len       };
    ctg[5] = {      value: 5, name: '기타', length: data.c5_len       };
    ctg[6] = {      value: 6, name: '시공전', length: data.len_before  };

    //거주유형 얻기
    var homeType = '';
    switch(data.home_type){
      case 1: homeType="아파트";        break;
      case 2: homeType="오피스텔";      break;
      case 3: homeType="소형주택";      break;
      case 4: homeType="원룸";         break;
    }

    //카테고리별 시공기간 로드및 총 시공기간 계산
    var ctgPeriod = [];
    ctgPeriod[0] = 0;
    ctgPeriod[1] = data.c1_period;
    ctgPeriod[2] = data.c2_period;
    ctgPeriod[3] = data.c3_period;
    ctgPeriod[4] = data.c4_period;
    ctgPeriod[5] = data.c5_period;
    var totalPeriod = 0;
    for(var i=1; i<ctgPeriod.length; i++){
      totalPeriod+=ctgPeriod[i];
    }
    //가격 정보 가져오기
    var ctgPrice = [];
    ctgPrice[0] = 0;
    ctgPrice[1] = parseInt(data.c1_price/1000);
    ctgPrice[2] = parseInt(data.c2_price/1000);
    ctgPrice[3] = parseInt(data.c3_price/1000);
    ctgPrice[4] = parseInt(data.c4_price/1000);
    ctgPrice[5] = parseInt(data.c5_price/1000);

    var ctg_l_Price = [];
    ctg_l_Price[0] = 0;
    ctg_l_Price[1] = parseInt(data.c1_l_price/1000);
    ctg_l_Price[2] = parseInt(data.c2_l_price/1000);
    ctg_l_Price[3] = parseInt(data.c3_l_price/1000);
    ctg_l_Price[4] = parseInt(data.c4_l_price/1000);
    ctg_l_Price[5] = parseInt(data.c5_l_price/1000);

    var ctg_p_Price = [];
    ctg_p_Price[0] = 0;
    ctg_p_Price[1] = parseInt(data.c1_p_price/1000);
    ctg_p_Price[2] = parseInt(data.c2_p_price/1000);
    ctg_p_Price[3] = parseInt(data.c3_p_price/1000);
    ctg_p_Price[4] = parseInt(data.c4_p_price/1000);
    ctg_p_Price[5] = parseInt(data.c5_p_price/1000);

    var ctg_f_Price = [];
    ctg_f_Price[0] = 0;
    ctg_f_Price[1] = parseInt(data.c1_f_price/1000);
    ctg_f_Price[2] = parseInt(data.c2_f_price/1000);
    ctg_f_Price[3] = parseInt(data.c3_f_price/1000);
    ctg_f_Price[4] = parseInt(data.c4_f_price/1000);
    ctg_f_Price[5] = parseInt(data.c5_f_price/1000);


    //인테리어 가격 파트 리스트
    //[0]부분에 카테고리별 총합 값을 넣음
    var priceCtg = [];
    for(var i=0 ; i<6 ; i++){
      priceCtg[i] = {
        value: i,
        period: ctgPeriod[i],
        expect: ctg_l_Price[i],
        product: ctg_p_Price[i],
        furniture: ctg_f_Price[i],
      }
      priceCtg[0].period = priceCtg[0].period + ctgPeriod[i];
      priceCtg[0].expect = priceCtg[0].expect + ctg_l_Price[i];
      priceCtg[0].product = priceCtg[0].product + ctg_p_Price[i];
      priceCtg[0].furniture = priceCtg[0].furniture + ctg_f_Price[i];
    }


    //스킬태그 로드
    var skillList = [];
    skillList[0] = data.skill_1;
    skillList[1] = data.skill_2;
    skillList[2] = data.skill_3;
    skillList[3] = data.skill_4;
    skillList[4] = data.skill_5;
    skillList[5] = data.skill_6;
    skillList[6] = data.skill_7;
    skillList[7] = data.skill_8;

    var skillTag = '';
    for(var i=0; i < data.skill_len ; i++){
      skillTag = skillTag +'#'+skillList[i]+' ';
    }

    //스와이프 와 썸네일의 이미지 리스트 URL 생성
    var thumbPath = IMG_PATH + 'square/'+pv_id+'/'+pd_id+'/square_'+pv_id+'_'+pd_id+'_';
    var mainPath = IMG_PATH + 'mid_m/'+pv_id+'/'+pd_id+'/mid_'+pv_id+'_'+pd_id+'_';
    //imgURL list 생성
    var thumbList = [];
    var mainList = [];
    var thumbUrl = '';
    var mainUrl = '';
    var count = 0;
    for(var i=1; i<6 ; i++){
      for(var j=1; j<=ctg[i].length; j++){
        count++;
        thumbUrl = thumbPath + i+'_'+j+'.jpg'
        mainUrl = mainPath + i+'_'+j+'.jpg'
        thumbList.push({ctg: i, url: thumbUrl});
        mainList.push({ctg: i, url: mainUrl});
      }
    }
    //시공전사진 리스트
    for(var i=1; i<=ctg[6].length; i++){
      count++;
      thumbUrl = thumbPath + 'b_'+i+'.jpg'
      mainUrl = mainPath + 'b_'+i+'.jpg'
      thumbList.push({ctg: 6, url: thumbUrl});
      mainList.push({ctg: 6, url: mainUrl});
    }

    //로드된 모든 데이터 스테이트로 복사
    this.setState({
      priceCtg: priceCtg,
      totalPeriod: totalPeriod,
      homeType: homeType,
      skillTag: skillTag,
      imgData:{
        pv: pv_id,
        pd: pd_id,
        pvPath: IMG_PATH + 'avatar/'+pv_id+'.jpg',
        ctg: ctg,
        imgCount: count,
      },
      thumbList: thumbList,
      mainList: mainList,
    });
  }
  _moveToInterioristPage(){
    fetch('http://www.roompackers.com/db/provider/'+this.state.imgData.pv)
    .then((response) => response.json())
    .then((responseData) => {
      Actions.interioristPage({id: this.state.imgData.pv, data: responseData[0], title: this.state.portData.nick_name});
    })
    .done();
  }

  //Swipe 이미지 리스트 생성
  _getSwipeImageList() {
    var list = [];
    if(this.state.currentCtg == 0 ){
      this.state.mainList.map((data, i) =>{
        console.log(data.url)
        list.push(
          <Image key={i} style={styles.slide} source={{uri: data.url}} />
        );
      });
    }else{
      this.state.mainList.filter((data)=> {return (data.ctg == this.state.currentCtg)})
      .map((data, i) =>{
        list.push(
          <Image key={i} style={styles.slide} source={{uri: data.url}} />
        );
      });
    }
    return list.valueOf();
  }

  _renderLayer(index) {
    if(this.state.isThumb === true && this.state.indexNum === index) {
      return(
        <View style={{
          height: PIXEL_Y * 70,
          width: PIXEL_X * 70,
          backgroundColor:'#fff',
          opacity: 0.6}} />
      );
    }
  }

  //썸네일 리스트 생성
  _getThumbnailImageList() {
    var list = [];
    if(this.state.currentCtg == 0 ){
      this.state.thumbList.map((data, i) =>{
        list.push(
          <View key={i}>
            <Button onPress={()=>{this.setState({indexNum: i, isThumb: true})}}>
              <Image style={styles.thumnail} source={{uri: data.url}}>
                {this._renderLayer(i)}
              </Image>
            </Button>
          </View>
        );
      });
    }else{
      this.state.thumbList.filter((data)=> {return (data.ctg == this.state.currentCtg)})
      .map((data, i) =>{
        list.push(
          <View key={i}>
            <Button onPress={()=>{this.setState({indexNum: i, isThumb: true})}}>
              <Image style={styles.thumnail} source={{uri: data.url}} >
                {this._renderLayer(i)}
              </Image>
            </Button>
          </View>
        );
      });
    }
    return list.valueOf();
  }

  //Tab button render
  _getTabButton(){
    var list = [];
    this.state.imgData.ctg.filter((data)=>{return (data.length>0)})
    .map((data,i)=>{
      list.push(
        <View key={i} style={{flex:1}}>
          <Button key={i}  onPress={()=>{ this.setState({currentCtg: data.value});
          }}>
            <View style={{height:PIXEL_Y * 36, justifyContent:'center' , alignItems: 'center'}} key={i}>
              <Text  key={i} style={{
                color: '#4a4a4a',
                fontWeight: (this.state.currentCtg == data.value) ? 'bold': 'normal',
                fontSize: PIXEL_X * 15
                }}>{data.name}</Text>
            </View>
          </Button>
        </View>

      );
    })
    return list.valueOf();
  }

  //푸시 모달 애니메이션
  // _setModalTimer() {
  //   if(this.props.modalVisible === true ) {
  //     setTimeout(()=>{this.setState({modalAnimation:false})}, 2000);
  //   }
  // }

/*=========================================================================================================
                                Render Part
=========================================================================================================*/
  //모달 알림 역활 부분 this.state.modalVisible animationType={'fade'}
  // _renderModal() {
  //    return(
  //      <Modal transparent={true} visible={this.props.modalVisible} >
  //        <StatusBar hidden={this.state.modalAnimation ? true:false} animated={true} showHideTransition='fade'/>
  //        <Animatable.View animation={this.state.modalAnimation ? 'fadeInDown':'fadeOutUp'} style={styles.modalAnimation}
  //          onAnimationEnd={()=>{this._setModalTimer()}} >
  //          <Text style={{color: '#fff', fontSize:PIXEL_X * 12}}>상담신청이 완료되었습니다</Text>
  //        </Animatable.View>
  //      </Modal>
  //    );
  // }

  //랜더 탭버튼
  _renderTabs() {
    return(
      <View style={styles.tabs}>
        {this._getTabButton()}
      </View>
    );
  }

  //스와이프 렌더링 부분
  _renderTopSwiper() {
    return(
      <View>
        <Swiper
          loadMinimal={true}
          index={this.state.indexNum}
          showsButtons
          loop={false}
          showsPagination={false}
          height={PIXEL_X * 250}
          nextButton={<Image source={require('../../../public/img/right.png')} style={{width:13 * PIXEL_X, height:21 * PIXEL_Y}}></Image>}
          prevButton={<Image source={require('../../../public/img/left.png')} style={{width:13 * PIXEL_X, height:21 * PIXEL_Y}}></Image>}>
          {this._getSwipeImageList()}
          {/* <Image style={styles.slide} source={{uri: 'http://www.roompackers.com/img/react/mid_m/1/1/mid_1_1_1_1.jpg'}} /> */}
        </Swiper>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {this._getThumbnailImageList()}
          {/* <Image style={styles.thumnail} source={{uri: 'http://www.roompackers.com/img/react/mid_m/1/1/mid_1_1_1_1.jpg'}} /> */}
        </ScrollView>
      </View>
    );
  }

  _renderInteriorDesignerInfo() {
    return(
      <View style={styles.interiorDesignerInfo}>
        <View>
          <Button onPress={()=>{
            this._moveToInterioristPage();
          }}>
            <View style={styles.circlePhotoArea}>
              <Image source={{uri: this.state.imgData.pvPath}} style={styles.circlePhoto}></Image>
            </View>
          </Button>
        </View>
        <View style={styles.capablePerson}>
          <View style={styles.textView}>
            <Text style={styles.capablePersonName}>{this.state.portData.nick_name}</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.roomType}>{this.state.portData.home_size}평 ∙ {this.state.homeType}</Text>
          </View>
        </View>
      </View>
    );
  }

  _renderDiscriptionArea() {
    return(
      <View style={styles.discriptionArea}>
        <Text style={styles.hashTag}>{this.state.skillTag}</Text>
        <View>
          <Text numberOfLines={this.state.numberOfLines} style={styles.discription}>{this.state.portData.title_2}</Text>
        </View>

          {this._textLines()}

      </View>
    );
  }

  _textLines() {
    if(this.state.numberOfLines === 3 && this.state.portData.title_2.length > 100){
      return(

        <Button onPress={()=>{ this.setState({numberOfLines: null})}}>

            <View style={{flexDirection:'row'}}>
              <Text style={styles.readMoreButton}>더보기 </Text>
              <View style={styles.arrow}></View>

          </View>
        </Button>

      );
    }

  }

  //시공가능 정보 파트
  _renderConstructionInfo() {
    return(
      <View style={styles.constructionInfo}>
        <Text style={styles.constructionTitle}>시공가능 정보</Text>
        <View style={styles.possibleArea}>
          <Text style={styles.possibleAreaTitle}>가능시간</Text>
          <Text style={styles.possibleAreaSubject}>{this.state.portData.aval_time}</Text>
        </View>
        <View style={styles.possibleArea}>
          <Text style={styles.possibleAreaTitle}>가능지역</Text>
          <Text style={styles.possibleAreaSubject}>{this.state.portData.aval_location}</Text>
        </View>
        <View style={styles.possibleArea}>
          <Text style={styles.possibleAreaTitle}>예상시공시간</Text>
          <Text style={styles.possibleAreaSubject}>{this.state.totalPeriod}일</Text>
        </View>
      </View>
    );
  }


  //인테리어 가격 파트 렌더링
  _renderPriceTableArea() {
    var list = [];
    //존재하는 카테고리 가격만 표시
    this.state.priceCtg.filter((data)=>{ return (data.expect>0 &&data.value>0)})
    .map((data, i)=>{
      list.push(
        <View key={i}style={styles.rows}>
          <Text style={styles.tableCategoryTextCenter}>{this.state.imgData.ctg[data.value].name}</Text>
          <Text style={styles.tableCategoryTextCenter}>{data.period}일</Text>
          <Text style={styles.tableCategoryText}>{Util.addPriceComma(data.expect)}</Text>
          <Text style={styles.tableCategoryText}>{Util.addPriceComma(data.product)}</Text>
          <Text style={styles.tableCategoryText}>{Util.addPriceComma(data.furniture)}</Text>
        </View>
      );
    })
    return(
      <View style={styles.priceTableArea}>
        <Text style={styles.constructionTitle}>인테리어 가격</Text>
        <View style={styles.monetaryUnit}>
          <Text style={styles.monetaryUnitText}>(단위 : 천원)</Text>
        </View>
        <View style={styles.tableHeader}>
          <Text style={styles.tableCategoryTextCenter}>공간</Text>
          <Text style={styles.tableCategoryTextCenter}>예상기간</Text>
          <Text style={styles.tableCategoryTextCenter}>예상가격</Text>
          <Text style={styles.tableCategoryTextCenter}>소품옵션</Text>
          <Text style={styles.tableCategoryTextCenter}>가구옵션</Text>
        </View>
        {list}
        <View style={styles.tableFooter}>
          <Text style={styles.tableFooterFirstText}>전체 시공시 예상가격</Text>
          <Text style={styles.tableFooterText}>{Util.addPriceComma(this.state.priceCtg[0].expect)}</Text>
          <Text style={styles.tableFooterText}>{Util.addPriceComma(this.state.priceCtg[0].product)}</Text>
          <Text style={styles.tableFooterText}>{Util.addPriceComma(this.state.priceCtg[0].furniture)}</Text>
        </View>
      </View>
    );
  }

  _renderButtonArea() {
    return(
      <View style={styles.buttonArea}>
        <View style={styles.topButtons}>
          <Button onPress={()=>Actions.furniturePage({id: this.props.id})}>
            <View style={styles.circleMiddleBtn}>
              <Text style={styles.circleMiddleBtnText}>가구 및 소품 보기</Text>
            </View>
          </Button>
          <Button onPress={()=>Actions.guidePage()}>
            <View style={styles.circleMiddleBtn}>
              <Text style={styles.circleMiddleBtnText}>서비스 가이드</Text>
            </View>
          </Button>
        </View>
        { /* disabled={this.props.isCounselBtn}  style={{opacity: this.props.isOpacity ? 1:0.6}}버튼 활성 비활성 */ }
        <Button onPress={()=>Actions.counselPage({name: this.state.portData.nick_name, data: this.state.portData, productTitle: this.props.title, port_id:this.props.id})}>
          <View>
            <View style={styles.circleBottomBtn}>
              <Text style={styles.circleBottomBtnText}>시공 상담 신청</Text>
            </View>
          </View>
        </Button>
      </View>
    );
  }

  render() {
    return(
      <ScrollView style={styles.detailScrollView}>
        {this._renderTabs()}
        {this._renderTopSwiper()}
        <View style={styles.mainSubject}>
          <View style={styles.secondSubject}>
            {this._renderInteriorDesignerInfo()}
            {this._renderDiscriptionArea()}
            {this._renderConstructionInfo()}
            {this._renderPriceTableArea()}
            {this._renderButtonArea()}
            {/* {this._renderModal()} */}
          </View>
        </View>
      </ScrollView>
    );
  }
}

/*=========================================================================================================
                                Style Sheet
=========================================================================================================*/

const styles = StyleSheet.create({
  detailScrollView: {
    backgroundColor: '#f8f8fc',
  },
  tabs:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-around',
    height:PIXEL_Y * 36,
    backgroundColor: '#f8f8fc',
  },
  slide: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom:PIXEL_X * 2,
    width: WINDOW_WIDTH,
    flex: 1
  },
  buttonText: {
    backgroundColor:'transparent',
    fontWeight:'300',
    color:'#ffffff',
    fontSize: PIXEL_X * 50
  },
  thumnail: {
    height: PIXEL_Y * 70,
    width: PIXEL_X * 70,
    marginRight:PIXEL_X * 2,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover'
  },
  mainSubject: {

  },
  capablePerson: {
    marginTop: PIXEL_X * 30,
    marginLeft: PIXEL_X * 10,
  },
  interiorDesignerInfo:{
    flexDirection:"row"
  },
  circlePhotoArea:{
    marginTop: PIXEL_X * 15,
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
  capablePersonName: {
    fontSize: PIXEL_X * 15,
    color: '#1a8793',
    fontWeight: 'bold'
  },
  roomType: {
    fontSize: PIXEL_X * 15,
  },
  textView: {
    height:PIXEL_Y * 24,
    justifyContent: 'center',
  },
  secondSubject: {
    marginLeft: PIXEL_X * 15,
    marginRight: PIXEL_X * 15,
  },
  discriptionArea: {
    marginTop: PIXEL_X * 10,
  },
  hashTag: {
    textAlign: 'left',
    fontSize: PIXEL_X * 15,
    color: '#1a8793',
  },
  discription: {
    marginTop: PIXEL_X * 10,
    fontSize: PIXEL_X * 15,
  },
  readMoreArea: {
    height: PIXEL_Y * 24,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  readMoreButton: {
    fontSize: PIXEL_X * 15,
    fontWeight: '600',
    color: '#1a8793',
  },
  constructionInfo: {
    marginTop: PIXEL_X * 15,
  },
  constructionTitle: {
    fontWeight: 'bold',
    fontSize: PIXEL_X * 15,
  },
  possibleArea: {
    marginTop: PIXEL_X * 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  possibleAreaTitle: {
    width: PIXEL_X * 80,
    fontSize: PIXEL_X * 15,
  },
  possibleAreaSubject: {
    marginLeft: PIXEL_X * 15,
    fontSize: PIXEL_X * 15,
  },
  priceTableArea: {
    marginTop: PIXEL_X * 15,
  },
  monetaryUnit: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: PIXEL_X * 5
  },
  monetaryUnitText: {
    fontSize: PIXEL_X * 10,
    textAlign: 'right',
    color: '#4a4a4a'
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#cccccc',
    height: PIXEL_Y * 29,
  },
  tableCategoryTextCenter:{
    fontSize: PIXEL_X * 12,
    color: '#4a4a4a',
    width: PIXEL_X * 44,
    textAlign: 'center'
  },
  tableCategoryText:{
    fontSize: PIXEL_X * 12,
    color: '#4a4a4a',
    width: PIXEL_X * 44,
    textAlign: 'right'
  },
  rows: {
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center',
    marginTop:PIXEL_X * 20,
  },
  tableFooter: {
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center',
    marginTop:PIXEL_X * 22,
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: '#cccccc',
    paddingTop: PIXEL_X * 13
  },
  tableFooterFirstText: {
    fontSize: PIXEL_X * 12,
    fontWeight: '600',
    textAlign: 'center',
    color: '#4a4a4a',
    width: PIXEL_X * 112,
  },
  tableFooterText: {
    fontSize: PIXEL_X * 12,
    fontWeight: '600',
    color: '#4a4a4a',
    textAlign: 'right',
    width: PIXEL_X * 44,
  },
  buttonArea: {
    marginTop: PIXEL_X * 30,
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: PIXEL_X * 15
  },
  circleMiddleBtn: {
    width: PIXEL_X * 160,
    height: PIXEL_Y * 44,
    borderRadius: PIXEL_X * 22,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#1a8793',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  circleMiddleBtnText: {
    fontSize: PIXEL_X * 15,
    textAlign: 'center',
    color: '#1a8793'
  },
  circleBottomBtn: {
    width: PIXEL_X * 345,
    height: PIXEL_Y * 44,
    borderRadius: PIXEL_X * 22,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#1a8793',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a8793',
    marginBottom: PIXEL_X * 20,
  },
  circleBottomBtnText:{
    fontSize: PIXEL_X * 15,
    textAlign: 'center',
    color: '#fff'
  },
  arrow: {
    width:PIXEL_X * 10,
    height: PIXEL_Y * 10,
    borderRightWidth:PIXEL_X * 2,
    borderStyle: 'solid',
    borderRightColor: '#1a8793',
    borderBottomWidth: PIXEL_X * 2,
    borderBottomColor: '#1a8793',
    transform:[
      {translateX:0 },
      {rotate:'45deg'}
    ],
  },
  modalAnimation: {
    height:PIXEL_Y * 20,
    backgroundColor: '#1a8793',
    justifyContent: 'center',
    alignItems:'center',
  }
});

module.exports = DetailPage;

// export default connect(
//   (state) => ({
//     modalVisible: state.app.modalVisible,
//   }),
//   (dispatch)=>({
//    changeModalSwich:(visible) => dispatch(actions.changeModalSwich(visible)),
//   })
// )(DetailPage)
