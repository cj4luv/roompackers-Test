import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  Platform
} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const PIXEL_X = WINDOW_WIDTH/375;
const PIXEL_Y = WINDOW_HEIGHT/667;

const FONT_SC = Platform.OS === 'android' ? PIXEL_X * 0.9:1;

class GuidePage extends Component {
  render() {
    return(
      <ScrollView style={styles.mainTopView}>
        <View style={styles.subView}>
          <Text style={styles.title}>셀프인테리어 능력자들은 어떤 분들인가요?</Text>
          <Text style={styles.subject}>룸팩커스에서 인테리어 파워블로거, TvN 내방의 품격 출연자 등 실력있는 셀프인테리어 능력자들을 섭외하였습니다. 각 능력자들의 블로그 및 인스타그램을 방문하시면, 더 많은 인테리어 작품을 확인 할 수 있습니다.</Text>
          <Text style={styles.title}>룸팩커스에서 시공가능한 인테리어 범위는 어떻게 되나요?</Text>
          <Text style={styles.subject}>룸팩커스에서 인테리어 파워블로거, TvN 내방의 품격 출연자 등 실력있는 셀프인테리어 능력자들을 섭외하였습니다. 각 능력자들의 블로그 및 인스타그램을 방문하시면, 더 많은 인테리어 작품을 확인 할 수 있습니다.</Text>
          <Text style={styles.title}>서비스 이용은 어떻게 하나요?</Text>
          <Text style={styles.stepTitle}>step 1 인테리어 신청하기</Text>
          <Text style={styles.subject}>룸팩커스에서 인테리어 파워블로거, TvN 내방의 품격 출연자 등 실력있는 셀프인테리어 능력자들을 섭외하였습니다. 각 능력자들의 블로그 및 인스타그램을 방문하시면, 더 많은 인테리어 작품을 확인 할 수 있습니다.</Text>
          <Text style={styles.stepTitle}>step 2 셀프인테리어 능력자와의 상담 진행 후 시공</Text>
          <Text style={styles.subject}>룸팩커스에서 인테리어 파워블로거, TvN 내방의 품격 출연자 등 실력있는 셀프인테리어 능력자들을 섭외하였습니다. 각 능력자들의 블로그 및 인스타그램을 방문하시면, 더 많은 인테리어 작품을 확인 할 수 있습니다.</Text>
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
  title: {
    fontSize:PIXEL_X * 15 * FONT_SC,
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
    fontSize:PIXEL_X * 15 * FONT_SC,
    color: '#4a4a4a',
    marginBottom: PIXEL_X * 10
  },
  stepTitle: {
    fontSize: PIXEL_X * 15 * FONT_SC,
    fontWeight: 'normal',
    color: '#1a8793',
    marginBottom: PIXEL_X * 6
  }
})

module.exports = GuidePage;
