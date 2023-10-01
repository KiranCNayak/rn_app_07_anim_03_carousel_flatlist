import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { CAROUSEL_IMAGES } from './src/data/constants/IMAGES';
import leftArrow from './src/static/images/left.png';
import rightArrow from './src/static/images/right.png';

const { height, width } = Dimensions.get('window');
const imageWidth = width * 0.75;
const imageHeight = imageWidth * 1.54;

const NAV_BTN_SIZE = 32;

const HeroImage = ({ imgHeight, uri, imgWidth }) => {
  return (
    <View style={styles.imageContainerStyle(width)}>
      <Image source={uri} style={styles.imageStyle(imgHeight, imgWidth)} />
    </View>
  );
};

const renderItem = ({ item }) => (
  <HeroImage uri={item} imgHeight={imageHeight} imgWidth={imageWidth} />
);

const getInputRange = index => [
  (index - 1) * width,
  index * width,
  (index + 1) * width,
];

const outputRange = [0, 1, 0];

const App = () => {
  const flatListRef = useRef();
  const leftArrowButtonOpacity = useRef(new Animated.Value(0)).current;
  const rightArrowButtonOpacity = useRef(new Animated.Value(1)).current;
  const scrollX = useRef(new Animated.Value(0)).current;

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex <= 1) {
      Animated.timing(leftArrowButtonOpacity, {
        toValue: activeIndex === 0 ? 0 : 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [activeIndex, leftArrowButtonOpacity]);

  useEffect(() => {
    if (activeIndex >= CAROUSEL_IMAGES.length - 2) {
      Animated.timing(rightArrowButtonOpacity, {
        toValue: activeIndex === CAROUSEL_IMAGES.length - 1 ? 0 : 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [activeIndex, rightArrowButtonOpacity]);

  const keyExtractor = useCallback((_, index) => index.toString(), []);

  const renderBackgroundImage = useCallback(
    (image, index) => {
      const opacity = scrollX.interpolate({
        inputRange: getInputRange(index),
        outputRange,
      });
      return (
        <Animated.Image
          blurRadius={30}
          key={`image-${index}`}
          style={styles.container({ opacity, ht: height, wd: width })}
          source={image}
        />
      );
    },
    [scrollX],
  );

  const onLeftArrowTouchablePress = () => {
    setActiveIndex(activeIndex - 1);
    flatListRef?.current?.scrollToOffset({
      offset: width * (activeIndex - 1),
    });
  };

  const onRightArrowTouchablePress = () => {
    setActiveIndex(activeIndex + 1);
    flatListRef?.current?.scrollToOffset({
      offset: width * (activeIndex + 1),
    });
  };

  return (
    <>
      <StatusBar hidden />
      <View style={[StyleSheet.absoluteFillObject]}>
        {CAROUSEL_IMAGES.map(renderBackgroundImage)}
        <Animated.FlatList
          data={CAROUSEL_IMAGES}
          horizontal
          keyExtractor={keyExtractor}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true },
          )}
          onMomentumScrollEnd={ev => {
            setActiveIndex(Math.ceil(ev?.nativeEvent?.contentOffset.x / width));
          }}
          pagingEnabled
          ref={flatListRef}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.bottomTouchableContainerStyle}>
          <Animated.View style={{ opacity: leftArrowButtonOpacity }}>
            <TouchableOpacity
              activeOpacity={0.75}
              disabled={activeIndex <= 0}
              onPress={onLeftArrowTouchablePress}
              style={styles.leftArrowTouchableStyle}>
              <Image source={leftArrow} style={styles.leftArrowImageStyle} />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{ opacity: rightArrowButtonOpacity }}>
            <TouchableOpacity
              activeOpacity={0.75}
              disabled={activeIndex >= CAROUSEL_IMAGES.length - 1}
              onPress={onRightArrowTouchablePress}
              style={styles.rightArrowTouchableStyle}>
              <Image source={rightArrow} style={styles.rightArrowImageStyle} />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  bottomTouchableContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  container: ({ opacity, ht, wd }) => ({
    opacity,
    resizeMode: 'cover',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: ht,
    width: wd,
  }),

  imageContainerStyle: imgWidth => ({
    alignItems: 'center',
    elevation: 20,
    justifyContent: 'center',
    width: imgWidth,
  }),

  imageStyle: (imgHeight, imgWidth) => ({
    borderRadius: 16,
    height: imgHeight,
    resizeMode: 'cover',
    width: imgWidth,
  }),

  leftArrowImageStyle: {
    height: NAV_BTN_SIZE,
    tintColor: '#fff',
    width: NAV_BTN_SIZE,
  },

  leftArrowTouchableStyle: {
    backgroundColor: '#224292',
    borderRadius: NAV_BTN_SIZE,
    elevation: 16,
    margin: 16,
    padding: 16,
  },

  rightArrowImageStyle: {
    height: NAV_BTN_SIZE,
    tintColor: '#fff',
    width: NAV_BTN_SIZE,
  },

  rightArrowTouchableStyle: {
    backgroundColor: '#224292',
    borderRadius: NAV_BTN_SIZE,
    elevation: 16,
    margin: 16,
    padding: 16,
  },
});
