import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const HomeView = ({ navigation }) => {
  return (
    <View style={styles.rootContainerStyle}>
      <ScrollView>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            navigation.navigate('CarouselWithTouchableNavigationView');
          }}
          style={styles.touchableStyle}>
          <Text style={styles.textStyle}>Carousel With Bottom Navigation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            navigation.navigate('ScrollPaginatedView');
          }}
          style={styles.touchableStyle}>
          <Text style={styles.textStyle}>Scroll Paginated View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            navigation.navigate('CountdownTimerView');
          }}
          style={styles.touchableStyle}>
          <Text style={styles.textStyle}>Countdown Timer View</Text>
        </TouchableOpacity>
      </ScrollView>
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
    alignItems: 'center',
    backgroundColor: '#d33192',
    borderRadius: 24,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
