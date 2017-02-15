import React, { Component } from 'react';
import {
  Platform,
  Dimensions,
  AlertIOS,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import {
  Actions,
  Scene,
  Router,
  ActionConst
} from 'react-native-router-flux';

import { connect } from 'react-redux';

import LoginPage from '../loginPage/LoginPage';
import SearchPage from '../searchPage/SearchPage';

import DetailPage from '../detailPage/DetailPage';
import GuidePage  from '../detailPage//GuidePage';

import FurniturePage from '../furniturePage/FurniturePage';

import InterioristPage from '../interioristPage/InterioristPage';
import CounselPage from '../counselPage/CounselPage';

import TestPage from '../loginPage/TestPage';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const PIXEL_X = WINDOW_WIDTH/375;
const PIXEL_Y = WINDOW_HEIGHT/667;

const FONT_SC = Platform.OS === 'android' ? PIXEL_X * 0.9:1;

class RouterContainer extends Component {

  render() {
    return (
      <Router>
        <Scene key="TestPage" component={TestPage}  hideNavBar hideTabBar />
        <Scene key="loginPage" component={LoginPage}  hideNavBar hideTabBar initial/>
        <Scene key="searchPage" component={SearchPage} hideNavBar hideTabBar type='replace' />
        <Scene key="detailPage" component={DetailPage} title={this.props.pfTitle} titleStyle={styles.title}
          getSceneStyle={getSceneStyle}  navigationBarStyle={styles.navigationBarStyle}
          leftButtonIconStyle={styles.leftButtonIconStyle} hideNavBar={false}
        />
        <Scene key="furniturePage" component={FurniturePage} title="가구 및 소품" titleStyle={styles.title}
          getSceneStyle={getSceneStyle}  navigationBarStyle={styles.navigationBarStyle} hideNavBar={false}
          leftButtonIconStyle={styles.leftButtonIconStyle}
        />
        <Scene key="guidePage" component={GuidePage} title="서비스 가이드" titleStyle={styles.title}
           getSceneStyle={getSceneStyle}  navigationBarStyle={styles.navigationBarStyle} hideNavBar={false}
           leftButtonIconStyle={styles.leftButtonIconStyle}
        />
        <Scene key="counselPage" component={CounselPage} title="셀프인테리어 시공 상담신청" titleStyle={styles.title}
          getSceneStyle={getSceneStyle}  navigationBarStyle={styles.navigationBarStyle} hideNavBar={false}
          leftButtonIconStyle={styles.leftButtonIconStyle}
        />
        <Scene key="interioristPage" component={InterioristPage} title={this.props.intTitle} titleStyle={styles.title}
          getSceneStyle={getSceneStyle}  navigationBarStyle={styles.navigationBarStyle} hideNavBar={false}
          leftButtonIconStyle={styles.leftButtonIconStyle}
        />
      </Router>
    );
  }
}

// 라우터 네비게이터 마진값 CSS
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#ffffff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 :PIXEL_Y * 64 * FONT_SC;
  }
  return style
}

const styles = StyleSheet.create({
  navigationBarStyle: {
    backgroundColor:'#ffffff',
    height: PIXEL_Y * 64 * FONT_SC,
  },
  title:{
    marginTop: Platform.OS === 'android' ? 2:0,
    width: WINDOW_WIDTH,
    fontSize: PIXEL_X * 17 * FONT_SC,
    textAlign: 'center',
  },
  titleWrapperStyle:{
    borderWidth: 1,
  },
  leftButtonIconStyle: {
    width: PIXEL_X * 12.6,
    height: PIXEL_Y * 21.2,
    tintColor: "#ff2d55",
  }
});

function mapStateToProps(state){
  return {
    pfTitle: state.app.pfTitle,
    intTitle: state.app.intTitle,
  }
}

export default connect(mapStateToProps)(RouterContainer);
