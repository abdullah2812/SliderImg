import {View, Text} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {imageSlider} from '../../data/Data';
import {SliderBox} from 'react-native-image-slider-box';
import {Image, FlatList, TouchableOpacity} from 'react-native';
import {categoryList} from '../../data/Data';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  titleContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  flatListContainer: {
    padding: 8,
  },
  button: {
    flex: 1,
    margin: 8,
    borderWidth: 1,
    borderColor: '#7CAF58',
    borderRadius: 10,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  itemName: {
    color: 'black',
  },
});

const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

return (
  <View style={styles.mainContainer}>
    <SliderBox
      images={imageSlider}
      autoplay={true}
      circleLoop={true}
      sliderBoxHeight={250}
    />
    <View style={styles.titleContainer}>
      <Text style={styles.text}>Categories</Text>
      <FlatList
        data={categoryList}
        key={3}
        numColumns={3}
        keyExtractor={categoryList.id}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.button}>
              <Image source={{uri: categoryList.icon}} style={styles.icon} />
              <Text style={styles.itemName}>{categoryList.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  </View>
);

export default HomeScreen;
