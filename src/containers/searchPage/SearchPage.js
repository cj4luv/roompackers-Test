import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import {
  CardClip,
  CardTitle,
  CardImage,
  CardAvatarImage,
  CardContent,
  CardAction,
  Separator
} from '../../components/cardclip/CardClip';

import { Actions, Scene } from 'react-native-router-flux';
import Button from '../../components/buttons/Button';

import Util from '../../components/functions/Util';

import * as actions from '../app/actions';
//import { connect } from 'react-redux';

//PickerIOS를 담은 모달
import PickerModal from './PickerModal';

//화면 크기 얻기
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

//화면 크기에 따른 1픽셀 비율
const PIXEL_X = WINDOW_WIDTH/375;
const PIXEL_Y = WINDOW_HEIGHT/667 ;

const FONT_SC = PIXEL_X * 0.9;

//카드 크기지정
var cardWidth = PIXEL_X * 355;
var cardHeight = WINDOW_WIDTH*3/4.5;

class SearchPage extends Component {
  constructor(props){
    super(props);
    this.roomType = ['전체','원룸','거실','방','주방','기타'];
    this.priceRange = ['전체', '100만원 미만','100만원-200만원', '200만원-300만원', '300만원-500만원'];

    this.state = {
      postSource: [],
      postList: [],
      dataLoaded: false,
      roomModalVisible: false,
      priceModalVisible: false,
      roomTypeNum: 0,
      priceTypeNum: 0,
      roomTypeBtn: '공간형태',
      priceRangeBtn: '가격범위',
    };
  }
  //modal visiablity && button text set
  _setRoomModalVisible(visible) {
    this.setState({roomModalVisible: visible});
  }_setPriceModalVisible(visible) {
    this.setState({priceModalVisible: visible});
  }
   // selected category
  _setRoomTypeValue(value){
    this.setState({
      roomTypeBtn: this.roomType[value],
      roomTypeNum: value
    });
  }_setPriceRangeValue(value){
    this.setState({
      priceRangeBtn: this.priceRange[value],
      priceTypeNum: value
    });
  }

  componentWillMount(){
    //rest로 상품 db리스트 불러오기
    fetch('http://www.roompackers.com/db/portfolio')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        postSource: responseData.json,
        dataLoaded: true
      });
    })
    .done();
  }
  _setListDataFromFetching(){
    this.setState({
      postSource: this.props.data,
      dataLoaded: true,
    });
  }

  _moveDetailPage(port_id) {
    fetch('http://www.roompackers.com/db/portfolio_app/' + port_id)
    .then((response) => response.json())
    .then((responseData) => {
      Actions.detailPage({id: port_id, data: responseData[0], title: responseData[0].title_1});
    })
    .done();
  }

  //가격범위 필터링
  _filterPriceRange(data, priceValue){
    var low, high;
    switch(priceValue){
      case 1: low = 0;          high = 1000000;
      break;
      case 2: low = 1000000;    high = 2000000;
      break;
      case 3: low = 2000000;    high = 3000000;
      break;
      case 4: low = 3000000;    high = 5000000;
      break;
    }
    if(low <= data.total_l_price && data.total_l_price <high) return true;
    else false;
  }

  //공간타입과 가겨범위를 측정함
  _filterFunction(data, roomValue, priceValue){
    //공간타입 존재유무
    var ctg = [];
    ctg[1] = data.c1_len;
    ctg[2] = data.c2_len;
    ctg[3] = data.c3_len;
    ctg[4] = data.c4_len;
    ctg[5] = data.c5_len;

    //필터링 진행
    if(roomValue == 0 && priceValue == 0){
      return true;
    }else if(ctg[roomValue]>0 && priceValue == 0){
      return true;
    }else if(ctg[roomValue]>0 && priceValue !=0){
      return this._filterPriceRange(data, priceValue);
    }else if(roomValue == 0 && priceValue !=0){
      return this._filterPriceRange(data, priceValue);
    }else return false;
  }

  //로딩화면 추후 교체
  render() {
    if(this.state.dataLoaded){
      return (
        <View>
          <StatusBar hidden={true}></StatusBar>
          {this._renderLoaded()}
        </View>
      )
    }else{
      return(
        <View>
          <StatusBar hidden={true}></StatusBar>
          {this._renderHeader()}
        </View>
      );
    }
  }
  //Loaded
  _renderLoaded(){
    return(
      <View>
        {this._renderHeader()}
        {this._renderScrollView()}
        {this._renderPickerModal()}
      </View>
    );
  }

  //Header
  _renderHeader(){
    return(
      <View style={styles.header}>
        <Text style={styles.headerText}> Roompackers </Text>
        <View style={styles.headerButton}>
          <TouchableHighlight underlayColor={'#f8f8fc'} style={styles.button} onPress={() => {
            this._setRoomModalVisible(true);
          }}>
            <Text style={styles.buttonText}>{this.state.roomTypeBtn}</Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor={'#f8f8fc'} style={styles.button} onPress={() => {
            this._setPriceModalVisible(true);
          }}>
            <Text style={styles.buttonText}>{this.state.priceRangeBtn}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  //ScrollView
  _renderScrollView(){
    //출력을 위한 리스트 배열
    //검색 조건을 필터링하여 각 카드를 삽입한다.
    var list = [];
    list.push(
      this.state.postSource.filter((data)=>{
        return this._filterFunction(data, this.state.roomTypeNum, this.state.priceTypeNum);
      }).map((data)=>{

        return(
          <CardClip key={data.port_id} style={styles.cardContainer}>
            <TouchableHighlight onPress={() => {
              this._moveDetailPage(data.port_id);
            }}>
              <View>
                <Image
                  style={styles.image}
                  source={{uri: data.img_path}}
                />
                <Image
                  style={styles.coverImage}
                  source={require('../../../public/img/gradation_img.png')}
                />
              </View>
            </TouchableHighlight>

            <View style={styles.bottomContainer}>
              <View style={styles.avatarContainer}>
                <Image
                  style={styles.avatarImage}
                  source={{uri: 'http://www.roompackers.com/img/react/avatar/'+parseInt(data.port_id/100)+'.jpg'}}
                />
              </View>

              <TouchableHighlight underlayColor={'transparent'} style={{justifyContent:'center'}} onPress={()=>{this._moveDetailPage(data.port_id)}}>
                <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'space-between'}}>
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>{data.title_1}</Text>
                    <Text style={styles.price}>{Util.addPriceComma(data.total_l_price)}</Text>
                  </View>
                  <View style={styles.arrow}/>
                </View>
              </TouchableHighlight>
            </View>
          </CardClip>
        );
      })
    );
    //render
    return(
      <View style={{height: 575 * PIXEL_Y}}>
        <ScrollView style={styles.scroll}>
          {list}
        </ScrollView>
      </View>

    );
  }
  //Modalrender
  _renderPickerModal(){
    return(
      <View>
        <PickerModal
          item={this.roomType}
          modalVisible={this.state.roomModalVisible}
          setValue={this._setRoomTypeValue.bind(this)}
          setModalVisible={this._setRoomModalVisible.bind(this)}
        />
        <PickerModal
          item={this.priceRange}
          modalVisible={this.state.priceModalVisible}
          setValue={this._setPriceRangeValue.bind(this)}
          setModalVisible={this._setPriceModalVisible.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //header
  header: {
    borderBottomWidth: 1 * PIXEL_Y,
    backgroundColor: 'transparent',
    borderColor: '#ccc',
  },
  headerButton: {
    width: WINDOW_WIDTH,
    marginTop: 16 * PIXEL_Y,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText:{
    width: WINDOW_WIDTH,
    marginTop: 25 * PIXEL_Y,
    fontSize: 17 * FONT_SC,
    textAlign: 'center',
    color: '#000',
  },
  button: {
    width: 140 * PIXEL_X,
    height: 29 * PIXEL_Y,
    marginLeft: 20 * PIXEL_X,
    marginRight: 20 * PIXEL_X,
    marginBottom: 7 * PIXEL_Y,
    borderWidth: 1 * PIXEL_X,
    borderRadius: 14 * PIXEL_X,
    borderColor: '#ceced2',
    justifyContent: 'center'
  },
  buttonText: {
    textAlign: 'center',
    alignItems: 'flex-end',
    color: '#4a4a4a',
    fontSize: 15 * FONT_SC,
  },

  //스크롤뷰 파트
  scroll: {
    backgroundColor: '#f8f8fc',
    paddingTop: 10 * PIXEL_Y,
  },
  cardContainer: {
    width: WINDOW_WIDTH,
    backgroundColor: '#d8d8d8',
    borderColor: '#ffffff',
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3,
    },
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  bottomContainer: {
    marginTop: -57 * PIXEL_Y,
    width: cardWidth,
    height: 57 * PIXEL_Y,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  content: {
    width: cardWidth,
    height: 100 * PIXEL_Y,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  avatarContainer: {
    marginLeft: 10 * PIXEL_X,
    marginRight: 6 * PIXEL_X,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: PIXEL_X * 250,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  image: {
    width: cardWidth,
    height: cardHeight,
    overlayColor: '#fff',
    borderRadius: 2,
  },
  coverImage: {
    width: cardWidth,
    height: cardHeight,
    marginTop: -cardHeight,
    borderRadius: 5,
  },
  avatarImage: {
    width: 44*PIXEL_X,
    height: 44*PIXEL_Y,
    borderRadius: 22*PIXEL_X,
  },
  overlay:{
    width: cardWidth,
    height: cardHeight/5,
    marginTop: cardHeight*4/5,
    position: 'absolute',
    //backgroundColor: 'black',
    //opacity: 0.3,
  },
  title: {
    marginTop: -1.5 * PIXEL_Y,
    marginBottom: 3 * PIXEL_Y,
    fontSize: 17 * FONT_SC,
    fontWeight: '500',
    color: '#fff',
    backgroundColor: 'transparent',
  },
  price: {
    fontSize: 10 * FONT_SC,
    fontWeight: '600',
    letterSpacing: 0.1,
    color: '#fff',
    backgroundColor: 'transparent'
  },
  //for indicator
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#cccccc',
  },
  arrow: {
    marginLeft: PIXEL_X * 30,
    width:PIXEL_X * 10,
    height: PIXEL_Y * 10,
    borderRightWidth:PIXEL_X * 2,
    borderStyle: 'solid',
    borderRightColor: '#ffffff',
    borderBottomWidth: PIXEL_X * 2,
    borderBottomColor: '#ffffff',
    transform:[
      {translateX:-10 * PIXEL_X },
      {rotate:'-45deg'}
    ],
  }

});

/*
export default connect(
  (state)=>({}),
  (dispatch)=>({
    changePortfolioTitle: (title) => dispatch(actions.changePortfolioTitle(title)),
    changeInterioristTitle: (title) => dispatch(actions.changeInterioristTitle(title)),
  })
)(SearchPage)
*/
module.exports = SearchPage;
