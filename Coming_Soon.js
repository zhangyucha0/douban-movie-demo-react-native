/**
 * doubanMovielist
 * by zhangyucha0
 */

import React, {
    Component,
} from 'react';

import {
    AppRegistry,
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Navigator
} from 'react-native';

import Movie_details from './Movie_details';

var REQUEST_URL = 'https://api.douban.com/v2/movie/coming_soon';

class Coming_Soon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
    this.fetchData = this.fetchData.bind(this);
    this.push = this._push.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.subjects),
            loaded: true,
          });
        });
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderMovie}
            style={styles.listView}
        />
    );
  }

  renderLoadingView() {
    return (
        <View style={styles.loading}>
          <Image
            source={require('image!loading')}
            style={{height: 110,width: 110}}
          />
        </View>
    );
  }

  renderMovie(movie) {
    return (
      <TouchableOpacity style={styles.container} onPress={() => {this._push(movie)}}>
        <View style={styles.container}>
          <Image
              source={{uri: movie.images.small}}
              style={styles.small}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.originaltitle}>{movie.original_title}</Text>
            <Text style={styles.introduce}>{"年份："+movie.year}</Text>
            <Text style={styles.introduce}>{"类型："+movie.genres}</Text>
            <Text style={styles.introduce}>{"导演："+movie.directors[0].name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

   _push(movie) {
  this.props.navigator.push({
    id: 'Movie_details',
    passProps: {data:movie},
    component: Movie_details,
    sceneConfig: Navigator.SceneConfigs.HorizontalSwipeJump
    });
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 7,
    textAlign: 'left',
  },
  originaltitle: {
    fontSize: 13,
    fontStyle:'italic',
    marginTop: -2,
    marginLeft: 7,
    marginBottom: 4,
  },
  introduce: {
    marginLeft: 7,
    textAlign: 'left',
  },
  small: {
    margin: 7,
    marginLeft: 13,
    width: 64,
    height: 103,
  },

  listView: {
    backgroundColor: '#F5F5F5',
  },
});

export default Coming_Soon;
