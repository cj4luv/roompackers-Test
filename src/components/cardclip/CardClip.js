//Card view component

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native'

//화면 크기 얻기
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

//화면 크기에 따른 1픽셀 비율
const PIXEL_X = WINDOW_WIDTH/375;
const PIXEL_Y = WINDOW_HEIGHT/667;

class CardClip extends Component {
  render() {
    const newStyles = this.props.styles || {};
    return (
      <View style={[styles.container, styles.card, newStyles.card]}>
        {this.props.children}
      </View>
    );
  }
}

class CardImage extends Component {
  render () {
    const newStyles = this.props.styles || {};
    return (
      <View style={[styles.cardImage, newStyles.cardImage]}>
        {this.props.children}
      </View>
    );
  }
}

class CardAvatarImage extends Component {
  render () {
    const newStyles = this.props.styles || {};
    return (
      <View style={newStyles.cardImage}>
        {this.props.children}
      </View>
    );
  }
}


class CardTitle extends Component {
  render () {
    const newStyles = this.props.styles || {};
    return (
      <View style={[styles.cardTitle, newStyles.cardTitle]}>
        {this.props.children}
      </View>
    );
  }
}

class CardContent extends Component {
  render () {
    const newStyles = this.props.styles || {};
    return (
      <View style={[styles.cardContent, newStyles.cardContent]}>
        {this.props.children}
      </View>
    );
  }
}

class CardAction extends Component {
  render () {
    const newStyles = this.props.styles || {};
    return (
      <View>
        {this.props.separator ? <Separator /> : null}
        <View style={[styles.cardAction, newStyles.cardAction]}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

class CardInput extends Component {
  render () {
    const newStyles = this.props.styles || {};
    return (
      <View style={[styles.cardInput, newStyles.cardInput]}>
        {this.props.children}
      </View>
    );
  }
}


class Separator extends Component {
  render () {
    return <View style={styles.separator} />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginBottom: 10,
    marginLeft : 10 * PIXEL_X,
    marginRight: 10 * PIXEL_X,
  },
  card: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 3,

  },
  cardSearch: {
    backgroundColor: "#fff",
    borderRadius: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3,
    }
  },
  cardImage: {
    flex: 1
  },
  cardAvatarImage: {

  },
  cardTitle: {
    flex: 1,
    flexDirection: 'row',
    padding: 16
  },
  cardInput: {
    flex: 1,
    flexDirection: 'row',
    padding: 16
  },
  cardContent: {
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  cardAction: {
    margin: 8,
    flexDirection: 'row',
    alignItems: 'center',

  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#E9E9E9'
  }
});

export {
  CardClip,
  CardTitle,
  CardAction,
  CardContent,
  CardImage,
  CardAvatarImage,
  Separator
}
