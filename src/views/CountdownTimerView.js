import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const colors = {
  black: '#323F4F',
  red: '#F76A6A',
  text: '#ffffff',
};

const { height, width } = Dimensions.get('screen');

const timers = [...Array(13).keys()].map(i => (i === 0 ? 1 : i * 5));

const BUTTON_DISMISS_DURATION = 200;

const ITEM_SIZE = width * 0.4;
const ITEM_SPACING = (width - ITEM_SIZE) * 0.5;

const CountdownTimerView = () => {
  const inputTextRef = useRef();

  const scrollX = useRef(new Animated.Value(0)).current;

  const [duration, setDuration] = useState(timers[0]);

  const animation = useRef(new Animated.Value(0)).current;
  const textInputAnimation = useRef(new Animated.Value(timers[0])).current;
  const timerAnimation = useRef(new Animated.Value(height)).current;

  const animationCB = useCallback(() => {
    textInputAnimation.setValue(duration);
    Animated.sequence([
      Animated.timing(animation, {
        duration: BUTTON_DISMISS_DURATION,
        toValue: 1,
        useNativeDriver: true,
      }),

      Animated.timing(timerAnimation, {
        duration: BUTTON_DISMISS_DURATION,
        toValue: 0,
        useNativeDriver: true,
      }),

      Animated.parallel([
        Animated.timing(textInputAnimation, {
          duration: duration * 1000,
          easing: Easing.linear,
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.timing(timerAnimation, {
          duration: duration * 1000,
          easing: Easing.linear,
          toValue: height,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      Animated.timing(animation, {
        toValue: 0,
        duration: BUTTON_DISMISS_DURATION,
        useNativeDriver: true,
      }).start();
    });
  }, [animation, duration, textInputAnimation, timerAnimation]);

  const buttonOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const textOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const renderItem = useCallback(
    ({ item, index }) => {
      const inputRange = [
        (index - 1) * ITEM_SIZE,
        index * ITEM_SIZE,
        (index + 1) * ITEM_SIZE,
      ];

      const opacityOutputRange = [0.25, 1, 0.25];
      const scaleOutputRange = [0.6, 1, 0.6];

      const opacity = scrollX.interpolate({
        inputRange,
        outputRange: opacityOutputRange,
      });

      const scale = scrollX.interpolate({
        inputRange,
        outputRange: scaleOutputRange,
      });

      return (
        <Animated.View
          style={[
            styles.textContainerStyle(ITEM_SIZE),
            { opacity, transform: [{ scale }] },
          ]}>
          <Text style={styles.text}>{item}</Text>
        </Animated.View>
      );
    },
    [scrollX],
  );

  useEffect(() => {
    const listener = textInputAnimation.addListener(({ value }) => {
      inputTextRef?.current?.setNativeProps({
        text: Math.ceil(value).toString(),
      });
    });
    return () => {
      textInputAnimation.removeListener(listener);
      textInputAnimation.removeAllListeners();
    };
  }, [textInputAnimation]);

  return (
    <View style={styles.rootContainerStyle}>
      <StatusBar hidden />
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: colors.red,
            height,
            transform: [{ translateY: timerAnimation }],
            width,
          },
        ]}
      />
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          styles.bottomButtonContainerStyle,
          { opacity: buttonOpacity, transform: [{ translateY }] },
        ]}>
        <TouchableOpacity activeOpacity={0.9} onPress={animationCB}>
          <View style={styles.roundButton} />
        </TouchableOpacity>
      </Animated.View>
      <View style={styles.numbersContainerStyle}>
        <Animated.View
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            opacity: textOpacity,
            position: 'absolute',
            width: ITEM_SIZE,
          }}>
          <TextInput
            defaultValue={duration.toString()}
            ref={inputTextRef}
            style={[styles.text, { bottom: 10 }]}
          />
        </Animated.View>
        <Animated.FlatList
          bounces={false}
          contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
          data={timers}
          decelerationRate={'fast'}
          horizontal
          keyExtractor={(item, index) => `${item}-${index}`}
          onMomentumScrollEnd={ev => {
            const index = Math.round(
              ev?.nativeEvent?.contentOffset?.x / ITEM_SIZE,
            );
            setDuration(timers[index]);
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true },
          )}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_SIZE}
          style={{ flexGrow: 0, opacity: buttonOpacity }}
        />
      </View>
    </View>
  );
};

export default CountdownTimerView;

const styles = StyleSheet.create({
  bottomButtonContainerStyle: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 100,
  },

  numbersContainerStyle: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: height / 3,
  },

  rootContainerStyle: {
    backgroundColor: colors.black,
    flex: 1,
  },

  roundButton: {
    backgroundColor: colors.red,
    borderRadius: width / 6,
    height: width / 6,
    width: width / 6,
  },

  text: {
    color: colors.text,
    fontSize: 120,
  },

  textContainerStyle: wd => ({
    width: wd,
    justifyContent: 'center',
    alignItems: 'center',
  }),
});
