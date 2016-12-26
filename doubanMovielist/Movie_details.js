/**
 * doubanMovielist
 * by zhangyucha0
 */

'use strict';
import React,{
  Component
} from 'react';

import {
  StyleSheet,
  View,
  WebView,
  Dimensions,
  BackAndroid
} from 'react-native';

const {width, height} = Dimensions.get('window');

class Movie_WebView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      BackAndroid.addEventListener('hardwareBackPress', this._back.bind(this))
  }

  _back() {
      if (this.props.navigator) {
         this.props.navigator.pop();
         return true;
       }
       return false;
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          style={{width:width,height:height,backgroundColor:'#E8E8E8'}}
          source={{uri:this.props.data.alt,method: 'GET'}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={true}
          mediaPlaybackRequiresUserAction={true}
          startInLoadingState={true}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
  },
});

export default Movie_WebView;
