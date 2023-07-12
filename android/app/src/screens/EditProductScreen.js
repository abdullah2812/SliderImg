import {View, Text} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {InputComponent} from '../components/inputComponent';
import SelectDropdown from 'react-native-select-dropdown';
import {categoryList} from '../data/Data';
import realm from '../../store/realm';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen-hooks';

const EditProductScreen = () => {
  return (
    <View>
      <Text>EditProductScreen</Text>
    </View>
  )
}

return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.imageButton} onPress={() => addImage()}>
            <Image
              style={{width: productData.imagePath !=='' ? wp('50%') : 50, 
                height: productData.imagePath !=='' ? wp('50%') : 50
              }}
              source={{
                uri: 'https://assets.webiconspng.com/uploads/2017/02/Photograph-Icon-PNG.png',
              }}
            />
            <Image
              style={{
                width: productData.imagePath !== '' ? 200 : 50,
                height: productData.imagePath !== '' ? 200 : 50,
              }}
              source={{
                uri:
                  productData.imagePath !== ''
                    ? productData.imagePath
                    : 'https://assets.webiconspng.com/uploads/2017/02/Photograph-Icon-PNG.png',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalContainer}>
          <InputComponent
            placeholder="Product Name"
            value={productData.productName}
            onChangeText={text => onInputChange('productName', text)}
          />
          <SelectDropdown
            data={categoryList}
            defaultButtonText="Select category" //default place holder
            onSelect={(item) => {
              onInputChange('category', item.id);
            }}
            buttonTextAfterSelection={(item) => {
              return item.name;
            }}
            rowTextForSelection={(item) => {
              return item.name;
            }}
            buttonStyle={styles.selectDropdown}
            buttonTextStyle={styles.selectText}
            ref={dropdownRef}
          />
        </View>
        <View style={styles.horizontalContainer}>
          <InputComponent
            placeholder="Description"
            value={productData.description}
            onChangeText={text => onInputChange('description', text)}
            isDescription={true}
          />
          <InputComponent
            placeholder="Price"
            value={productData.price}
            onChangeText={text => onInputChange('price', text)}
            isIcon={true}
            name="dollar"
            type="font-awesome"
          />
        </View>
        <Text style={styles.sellerText}>Seller Contact</Text>
        <InputComponent
          placeholder="Whastapp number (ex : +4498739230)"
          value={productData.phoneNumber}
          onChangeText={text => onInputChange('phoneNumber', text)}
          isIcon={true}
          name="whatsapp"
          type="font-awesome"
        />
        <InputComponent
          placeholder="Instagram username (ex : timedooracademy)"
          value={productData.instagram}
          onChangeText={text => onInputChange('instagram', text)}
          isIcon={true}
          name="instagram"
          type="font-awesome"
        />
        <InputComponent
          placeholder="Facebook username (ex : timedooracademy)"
          value={productData.facebook}
          onChangeText={text => onInputChange('facebook', text)}
          isIcon={true}
          name="facebook-square"
          type="font-awesome"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveText}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

export default EditProductScreen