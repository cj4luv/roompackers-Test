import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  AlertIOS,
  Dimensions
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Util from '../../components/functions/Util';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const PIXEL_X = WINDOW_WIDTH/375;
const PIXEL_Y = WINDOW_HEIGHT/667;

class FurniturePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      productList: [],
      furnitureList: [],
      dataLoaded: false,
      productPrice: 0,
      furniturePrice: 0,
    }
  }
  componentWillMount(){
    Actions.refresh({title: this.props.title,});
    //rest로 상품 db리스트 불러오기
    fetch('http://www.roompackers.com/db/furniture_item/'+this.props.id)
    .then((response) => response.json())
    .then((responseData) => {
      this._setDataFromFetching(responseData);
      this.setState({
        data: responseData,
        dataLoaded: true,
      });
    })
    .done();
  }
  _setDataFromFetching(data){
    var dataList = data;
    var productList = [];
    var furnitureList = [];
    var productPrice = 0;
    var furniturePrice = 0;
    data.filter((data)=>{return (data.product == '가구')})
    .map((data,i)=>{
      furniturePrice+=data.price;
      furnitureList.push(
        <View key={i}style={styles.rows}>
          <Text style={styles.space}>{data.space}</Text>
          <Text style={styles.store}>{data.store}</Text>
          <Text style={styles.item}>{data.item}</Text>
          <Text style={styles.price}>{Util.addPriceComma(data.price)}</Text>
        </View>
      );
    });
    data.filter((data)=>{return (data.product == '소품')})
    .map((data,i)=>{
      productPrice += data.price;
      productList.push(
        <View key={i}style={styles.rows}>
          <Text style={styles.space}>{data.space}</Text>
          <Text style={styles.store}>{data.store}</Text>
          <Text style={styles.item}>{data.item}</Text>
          <Text style={styles.price}>{Util.addPriceComma(data.price)}</Text>
        </View>
      );
    });

    this.setState({
      productList: productList,
      furnitureList: furnitureList,
      productPrice: productPrice,
      furniturePrice: furniturePrice,
    });
  }

  render() {
    return(
      <ScrollView style={styles.scroll}>
        <Text style={styles.constructionTitle}>가구</Text>
        <View style={styles.monetaryUnit}>
          <Text style={styles.monetaryUnitText}>(단위 : 원)</Text>
        </View>
        <View style={styles.tableHeader}>
          <Text style={styles.space}>공간</Text>
          <Text style={styles.store}>구입처</Text>
          <Text style={styles.item}>아이템</Text>
          <Text style={styles.price}>가격</Text>
        </View>
        {this.state.furnitureList}
        <View style={styles.tableFooter}>
          <Text style={styles.footerTextLeft}>전체 구입시 예상가격</Text>
          <Text style={styles.footerTextRight}>{Util.addPriceComma(this.state.furniturePrice)}</Text>
        </View>
        <Text style={styles.constructionTitle}>소품</Text>
        <View style={styles.monetaryUnit}>
          <Text style={styles.monetaryUnitText}>(단위 : 원)</Text>
        </View>
        <View style={styles.tableHeader}>
          <Text style={styles.space}>공간</Text>
          <Text style={styles.store}>구입처</Text>
          <Text style={styles.item}>아이템</Text>
          <Text style={styles.price}>가격</Text>
        </View>
        {this.state.productList}
        <View style={styles.tableFooter}>
          <Text style={styles.footerTextLeft}>전체 구입시 예상가격</Text>
          <Text style={styles.footerTextRight}>{Util.addPriceComma(this.state.productPrice)}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    padding: 15 * PIXEL_X,
    backgroundColor: '#f8f8fc',
    paddingTop: 20 * PIXEL_Y,
  },
  space: {
    fontSize: PIXEL_X * 12,
    letterSpacing: 0.2,
    color: '#4a4a4a',
    width: PIXEL_X * 50,
    textAlign: 'left'
  },
  store: {
    //marginLeft: PIXEL_X * 10,
    letterSpacing: 0.2,
    fontSize: PIXEL_X * 12,
    color: '#4a4a4a',
    width: PIXEL_X * 90,
    textAlign: 'left',
  },
  item: {
    //marginLeft: PIXEL_X * 10,
    letterSpacing: 0.2,
    fontSize: PIXEL_X * 12,
    color: '#4a4a4a',
    width: PIXEL_X * 130,
    textAlign: 'left'
  },
  price: {
    //marginLeft: PIXEL_X * 7,
    letterSpacing: 0.2,
    fontSize: PIXEL_X * 12,
    color: '#4a4a4a',
    width: PIXEL_X * 65,
    textAlign: 'right'
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
  tableFooter: {
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center',
    marginTop:PIXEL_Y * 22,
    marginBottom:PIXEL_Y * 33,
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: '#cccccc',
    paddingTop: PIXEL_X * 13
  },
  footerTextLeft: {
    fontSize: PIXEL_X * 12,
    fontWeight: '600',
    textAlign: 'left',
    color: '#4a4a4a',
    width: PIXEL_X * 103,
  },
  footerTextRight: {
    fontSize: PIXEL_X * 12,
    fontWeight: '600',
    color: '#4a4a4a',
    textAlign: 'right',
    width: WINDOW_WIDTH - 133 * PIXEL_X,
  },
  rows: {
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center',
    marginTop:PIXEL_X * 20,
  },
  constructionTitle: {
    fontWeight: 'bold',
    fontSize: PIXEL_X * 15,
  }
})

module.exports = FurniturePage;
