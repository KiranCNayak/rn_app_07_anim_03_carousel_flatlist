import React, { useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { SCROLL_PAGINATED_IMAGES } from '../data/constants/IMAGES';

const { width, height } = Dimensions.get('window');

const ITEM_HEIGHT = height;
const ITEM_WIDTH = width;

const DOT_SIZE = 8;
const DOT_SPACING = 8;
const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

const getOpacityInterpolationValues = (index, outputMin) => {
  const inputRange = [
    (index - 1) * ITEM_HEIGHT,
    index * ITEM_HEIGHT,
    (index + 1) * ITEM_HEIGHT,
  ];
  const outputRange = [outputMin, 1, outputMin];

  return { inputRange, outputRange };
};

const ScrollPaginatedView = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <View>
      <StatusBar hidden />
      <View style={styles.flatListContainerStyle}>
        <Animated.FlatList
          bounces={false}
          data={SCROLL_PAGINATED_IMAGES}
          decelerationRate={'fast'}
          keyExtractor={(_, idx) => idx.toString()}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true },
          )}
          renderItem={({ item, index }) => {
            const opacity = scrollY.interpolate({
              ...getOpacityInterpolationValues(index, 0),
            });
            return (
              <Animated.View style={{ opacity }}>
                <Image source={item} style={styles.imageStyle} />
              </Animated.View>
            );
          }}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
        />
        <View style={styles.pagination}>
          {SCROLL_PAGINATED_IMAGES.map((_, index) => {
            const opacity = scrollY.interpolate({
              ...getOpacityInterpolationValues(index, 0.85),
            });
            return (
              <Animated.View key={index} style={[styles.dot, { opacity }]} />
            );
          })}
          <Animated.View
            style={[
              styles.dotIndicator,
              {
                transform: [
                  {
                    translateY: Animated.divide(
                      scrollY,
                      ITEM_HEIGHT,
                    ).interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, DOT_INDICATOR_SIZE],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default ScrollPaginatedView;

const styles = StyleSheet.create({
  dot: {
    backgroundColor: '#333b',
    borderRadius: DOT_SIZE,
    height: DOT_SIZE,
    marginVertical: DOT_SPACING / 2,
    width: DOT_SIZE,
  },

  dotIndicator: {
    borderColor: '#333d',
    borderRadius: DOT_INDICATOR_SIZE,
    borderWidth: 2,
    height: DOT_INDICATOR_SIZE,
    left: -DOT_SIZE / 2 + 8,
    position: 'absolute',
    top: -DOT_SIZE / 2 + DOT_SPACING + 4,
    width: DOT_INDICATOR_SIZE,
  },

  flatListContainerStyle: {
    height: ITEM_HEIGHT,
    overflow: 'hidden',
  },

  imageStyle: {
    height: ITEM_HEIGHT,
    resizeMode: 'cover',
    width: ITEM_WIDTH,
  },

  pagination: {
    backgroundColor: '#ddda',
    borderRadius: 16,
    left: 12,
    padding: 8,
    position: 'absolute',
    top: ITEM_HEIGHT * 0.4,
  },
});
