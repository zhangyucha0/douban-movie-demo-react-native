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

import ScrollableTabView from 'react-native-scrollable-tab-view';
import MovieTabBar from './MovieTabBar';
import Movie_details from './Movie_details';
import Coming_Soon from './Coming_Soon';

var REQUEST_URL = 'https://api.douban.com/v2/movie/in_theaters';

class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabNames: ['正在热映', '即将上映'],
      tabIconNames: ['ios-flame', 'md-bulb'],
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
    let tabNames = this.state.tabNames;
    let tabIconNames = this.state.tabIconNames;
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
        <ScrollableTabView
          renderTabBar={() => <MovieTabBar tabNames={tabNames} tabIconNames={tabIconNames}/>}
          tabBarPosition='bottom'>

          <View style={styles.container} tabLabel='key1'>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderMovie.bind(this)}
              style={styles.listView}
            />
          </View>

          <Coming_Soon style={styles.container} tabLabel='key2'/>

        </ScrollableTabView>
    );
  }

  renderLoadingView() {
    return (
        <View style={styles.loading}>
          <Image
            source={require('image!starting')}
            style={{height: 300,width: 400}}
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
            <Text style={styles.introduce}>{"评分："+movie.rating.average}</Text>
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
    backgroundColor: '#F5F5F5',
    borderTopWidth: 0.5,
    borderTopColor: '#E8E8E8'
  },
  loading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE439'
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

export default FirstPage;
