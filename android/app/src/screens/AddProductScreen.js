import { View, Text } from 'react-native'
import React from 'react'
import { View, Text, TouchableOpacity, Image,
  ScrollView , StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const AddProductScreen = () => {
  return (
    <View>
      <Text>AddProductScreen</Text>
    </View>
  )
}
return (
  <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.imageContainer}>
              <TouchableOpacity
                  style={styles.imageButton}
                  onPress={() => addImage()}
              >
                      <Image
                      style={{ width: 50, height: 50 }}
                      source={{
                          uri: 'https://assets.webiconspng.com/uploads/2017/02/Photograph-Icon-PNG.png'}} />
              </TouchableOpacity>
          </View>
      </ScrollView>
  </View>
);

export default AddProductScreen;
