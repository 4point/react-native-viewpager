import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';

const DOT_SIZE = 8;
const DOT_SAPCE = 4;

export default class DefaultViewPageIndicator extends React.Component {

  static propTypes = {
    goToPage: PropTypes.func,
    activePage: PropTypes.number,
    pageCount: PropTypes.number
  };

  state = {
    viewWidth: 0
  };

  render() {
    var pageCount = this.props.pageCount;
    var itemWidth = DOT_SIZE + (DOT_SAPCE * 2);
    var offset = (this.state.viewWidth - itemWidth * pageCount) / 2 + itemWidth * this.props.activePage;

    //var left = offset;
    var offsetX = itemWidth * (this.props.activePage - this.props.scrollOffset);
    var left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [offsetX, offsetX + itemWidth]
    })

    var indicators = [];
    for (var i = 0; i < pageCount; i++) {
      indicators.push(this.renderIndicator(i))
    }

    return (
      <View style={styles.indicators}>
        <View style={styles.tabs}
              onLayout={(event) => {
                var viewWidth = event.nativeEvent.layout.width;
                if (!viewWidth || this.state.viewWidth === viewWidth) {
                  return;
                }
                this.setState({viewWidth});
              }}>
          {indicators}
          <Animated.View style={[styles.curDot, {left}]}/>
        </View>
      </View>
    );
  }

  renderIndicator(page) {
    return (
      <TouchableOpacity style={styles.tab} key={'idc_' + page} onPress={() => this.props.goToPage(page)}>
        <View style={styles.dot}/>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
  },

  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: '#ccc',
    marginHorizontal: DOT_SAPCE
  },

  curDot: {
    position: 'absolute',
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: '#666',
    marginHorizontal: DOT_SAPCE
  },

  indicators: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  }
});
