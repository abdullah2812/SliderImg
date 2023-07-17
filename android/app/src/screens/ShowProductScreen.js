import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import realm from '../../store/realm';
import {Icon, CheckBox} from 'react-native-elements';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {categoryList} from '../data/Data';
import {MediaComponent} from '../components/MediaComponent';
import {Linking} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';
import {UserState} from 'realm';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  flatListContainer: {
    padding: 8,
  },
  itemButton: {
    margin: 8,
    padding: 16,
    borderColor: '#7CAF58',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    width: wp('25%'),
    height: hp('25%'),
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  title: {
    color: 'black',
    fontSize: hp('2,5%'),
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
    fontSize: hp('2%'),
  },
  modalContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '80%',
    backgroundColor: 'white',
    padding: 16,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancel: {
    padding: 8,
    position: 'absolute',
    right: 8,
    top: 8,
  },
  sellerText: {
    marginBottom: 8,
    marginTop: 32,
  },
  checkBox: {
    position: 'absolute',
    right: 0,
  },
});

const [isRemove, setIsRemove] = UserState(false);

const [data, setData] = useState([]);

const [isBuy, setIsBuy] = useState(false);
const [contact, setContact] = useState({
  phoneNumber: '',
  instagram: '',
  facebook: '',
});

const buyProduct = (whatsapp, instagramId, facebookId) => {
  setContact({
    phoneNumber: whatsapp,
    instagram: instagramId,
    facebook: facebookId,
  });
  setIsBuy(true);
};

const collectData = () => {
  const allData = realm.objects('Product').filtered('category = ${id}'); //object => untuk mengakses database Product
  setData(allData);

  const newData = allData.map(item => {
    item.checkedStatus = false;
    return item;
  });
  setData(newData);
  console.log(newData);
};

const onClickMedia = type => {
  if (type === 'whatsapp') {
    Linking.openURL('https://wa.me/${contact.numberPhone}');
  } else if (type === 'instagram') {
    Linking.openURL('https://www.instagram.com/${contact.instagram}');
  } else if (type == 'facebook') {
    Linking.openURL('https://m.me/${contact.facebook}');
  }
};

const {navigation} = props;

const ShowProductScreen = props => {
  const {route} = props;
  const category = route.params.keyExtractor;
};

const setCheckBox = (id, status) => {
  const newData = data.map((item) => {
      if (item.id === id) {
      }   item.checkedStatus = !status;
      return item;
  }); 
  setData(newData)
};

useEffect(() => {
  const productPage = navigation.addListener('focus', () => {});
  collectData();
  return productPage;
}, []);

<View style={styles.mainContainer}>
  <FlatList
    data={allData}
    contentContainerStyle={styles.flatListContainer}
    keyExtractor={item => item.id}
    renderItem={({item}) => {
      return (
        <TouchableOpacity
          style={styles.itemButton}
          onPress={() =>
            navigation.navigate('EditProduct', {
              //diambil dari main navigator yang telah kita daftarkan
              idProduct: item.id,
            })
          }
          onLongPress={() => setIsRemove(true)}>
          <View style={styles.productContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ImageZoom', {imagePath: item.imagePath})
              }>
              <Image style={styles.image} source={{uri: item.imagePath}} />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.productName}</Text>
              <Text style={styles.text}>{item.description}</Text>
              <Text style={styles.text}>$ {item.price}</Text>
            </View>
          </View>
          <TouchableOpacity>
            onPress=
            {() => buyProduct(item.phoneNumber, item.instagram, item.facebook)}
            <Icon name="shoppingcart" type="antdesign" size={30} />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    }}
  />
  {isBuy ? (
    <View style={styles.modalContainer}>
      <View style={styles.box}>
        <TouchableOpacity style={styles.cancel} onPress={() => setIsBuy(false)}>
          <Icon name="close" type="antdesign" size={18} />
        </TouchableOpacity>
        <Text style={[styles.sellerText, styles.title]}>
          Contact the seller through this media :
        </Text>
        {contact.phoneNumber !== '' ? (
          <MediaComponent
            source={require('../../assets/images/whatsapp.png')}
            value={contact.phoneNumber}
            onPress={() => onClickMedia('whatsapp')}
          />
        ) : contact.facebook !== '' ? (
          <MediaComponent
            source={require('../../assets/images/facebook.png')}
            value={contact.facebook}
            onPress={() => onClickMedia('facebook')}
          />
        ) : contact.instagram !== '' ? (
          <MediaComponent
            source={require('../../assets/images/instagram.png')}
            value={contact.instagram}
            onPress={() => onClickMedia('instagram')}
          />
        ) : null}
      </View>
    </View>
  ) : null}

  {isRemove ? (
    <CheckBox size={30} containerStyle={styles.checkBox} 
      onPress={()=> setCheckBox(item.id, item.checkedStatus)}
      checked={item.checkedStatus}
    />
  ) : (
    <TouchableOpacity
      onPress={() =>
        buyProduct(item.phoneNumber, item.instagram.item.facebook)
      }>
      <Icon name="shoppingcart" type="antdesign" size={30} />
    </TouchableOpacity>
  )}
</View>;

export default ShowProductScreen;
