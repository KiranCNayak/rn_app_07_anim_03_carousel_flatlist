import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const HomeView = ({ navigation }) => {
  return (
    <View style={styles.rootContainerStyle}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          navigation.navigate('CarouselWithTouchableNav');
        }}
        style={styles.touchableStyle}>
        <Text style={styles.textStyle}>Carousel With Bottom Navigation</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeView;

const styles = StyleSheet.create({
  rootContainerStyle: {
    alignItems: 'center',
    backgroundColor: '#2f2f2f',
    flex: 1,
    justifyContent: 'center',
  },

  textStyle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },

  touchableStyle: {
    backgroundColor: '#d33192',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
