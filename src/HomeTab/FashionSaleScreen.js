import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FashionSaleScreen = () => {
  const [likedItems, setLikedItems] = useState({
    dress1: false,
    dress2: false,
  });

  const toggleLike = itemId => {
    setLikedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://s3-alpha-sig.figma.com/img/ff9f/e689/5f92a300e886114d2dde23fbe28ad1be?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=avUdjsvUu5HfTbmQUZZnh6rEBXfYpQQrSb5hn5ucu0l6ym9kGrLXS87dbihenJ39k4iKr~ac~eizZJZKpw~s0p3NTIv59iEBEdyQ6fsz9OL4YxHGz8z4I-pw8-gnqxnI4BmSOTyjffBaMrf6JPgNdFP4rzgU4Wx3cG-jKHm5eo-b9X86ACBW1G7uJaRyJb0K4-7MCx563ffgF9bZlN4PRT9rLjSjigLsER4Im3Mg3uzZhrlpWDmidnzsvgbIvaoO8Z9MIiXVKidt~x51id6ISCEuCuLJdXMNaUf8ZycZb-iCOU9chcQ~LoUqVapN3fyqJDGxZJXto29MyVfvMRt~0g__',
        }}
        style={styles.headerImage}>
        <Text style={styles.headerText}>Street clothes</Text>
      </ImageBackground>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sale</Text>
        <Text style={styles.viewAllText}>View all</Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.productCard}>
          <Image
            source={{
              uri: 'https://s3-alpha-sig.figma.com/img/c8d6/cd3c/953d61faf9fd666897e97a67e9857028?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HktB~5MgFMg8lYkZVxPoRWWJciSm4IektL1yNzhsjhX7qx~kfQetDoaVyFo5FYuAqNIZ6Tg3N1qZqwuUr0qezfDmnMyz6rEHOuqDmsCnxVj~fJCXXGLAkPJaQzNaM6kL4GBlNUJKQGPOhNunUlVUf6q8Zext1CzkdIzA~ebabs4GnheGpEMQBunpErPGo9yhLJsK1KWP2goDurJ8LBc5-K6tA7wHBD8V3iDAvu2gzHe5JWx-q59VXZ8~IU6n9-zhTx~E21aBsFU1L~tS8mRq6i45JhFMm0yMUO2eyabQSkZPMIM7bLD-E47o4n~w913~NrQ~keC-b~BF~~lc6FJQEA__',
            }}
            style={styles.productImage}
          />

          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-20%</Text>
          </View>
          <Text style={styles.productName}>Evening Dress</Text>
          <Text style={styles.productPrice}>
            15$ <Text style={styles.discountPrice}>12$</Text>
          </Text>
          <TouchableOpacity
            onPress={() => toggleLike('dress1')}
            style={styles.heartButton}>
            <AntDesign
              name={likedItems.dress1 ? 'heart' : 'hearto'}
              size={24}
              color={likedItems.dress1 ? 'red' : 'gray'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.productCard}>
          <Image
            source={{
              uri: 'https://s3-alpha-sig.figma.com/img/9282/7a65/3bcf169c1f1c4b22fc8fc4b86176e01a?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PGpDl3bihKj9~SL9X~BCZnqXwplJ4yG9j~G8oaXjDScr6HSFgW2vuA2St1kiX8-BagM~xIQG3xKpr7ncd1TFWdKUP1fpPH80ihvrdwtVLUZVTTAyIHLzQ8vFqpzU6RdDrdwL~jl9FeUTrqxze9fI0Sv3p2BcG03LnyYvEC1MJqgjWybnZ2bebgHwOj8S9CD~Hd34NLoaDRxL4Apt2s2PcyxDhY8KMnfv7X~lfgH0RyCpDgsI46Y7mkHaIdNQmpVZBUbKD2XecDik5LgdZDv~P5bFe064226Z4bvPVQv7YNZnpXMwsoOTD9LJ3PLosXYCDEtEhsR7cRv-LBsGHvXPfw__',
            }}
            style={styles.productImage}
          />

          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-15%</Text>
          </View>
          <Text style={styles.productName}>Sport Dress</Text>
          <Text style={styles.productPrice}>
            22$ <Text style={styles.discountPrice}>19$</Text>
          </Text>

          <TouchableOpacity
            onPress={() => toggleLike('dress2')}
            style={styles.heartButton}>
            <AntDesign
              name={likedItems.dress2 ? 'heart' : 'hearto'}
              size={24}
              color={likedItems.dress2 ? 'red' : 'gray'}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.newSection}>
        <Text style={styles.newTitle}>New</Text>
        <Text style={styles.viewAll}>View all</Text>
      </View>
      <Text style={styles.subtitle}>You’ve never seen it before!</Text>

      <View style={styles.thumbnailContainer}>
        {['https://s3-alpha-sig.figma.com/img/fcaf/d160/32c84320feb3909ded342aacc494eabc?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KKnNAYKFiarbMjD31YKdv-jQ53kX0Di9Tc929JKXZhAtm1vsWv6HnJ7i~9sU0wNlUY9TxZWqqDXjnZepKK764i4b50JBFvHAU6pu9XKgksmCk5oKnAgS6F-2w9cnjpUlLmhM3AxwJzp3c4x8at8uvXcy4lqt42xmGMMVhhI9cXNDq6lHFYpHY2XqUMjpEjKO-KIbXdnII2vfcNYP7wZ9DOPfeNAM5AeZ2skHMDkVd-AAKH5G44gJgaxy2f1oIXIcXqrPihL97EbDjLvN1~jeu49MYSOLa7NXP7-rOqwC~eoRZi~1hlrVdp1zUKFp3ZnxESMexJZboRZdj9JVRwFb-A__', 'https://s3-alpha-sig.figma.com/img/744c/af4f/8cbe22e0d501d66b730b03c24f793383?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TH7uaU~y1J0L~luXzckzdFYuwXXjxQevQ5jDcupI61VFqfoog~FiK8RIMdo6EcJ1sBDxWmKjUxIVevHIVUeV7ZrdIgAaXzuo~Eh92WhB-Khb3euubTTLzTv7WbBpPNuKQETB72uOvq3M3GNUi9EPWvjePMkV7vJhDeNxrnPCNxG0-joOmds9vL9J8qbAs3FMvrURWVBosznln8sF1kw5wyGb62LX9GJ3-0jav8zsrmI0opbBeT50zIidONkC7bEglOND4xLaNLjqN4IrgUqZqYr2QgPqvDowG7nwHAK-fxP3Bqq~Jm~EEhcsSa2dWU8VK-NFvVeZY~Yn3jesp0A~Vw__', 'https://s3-alpha-sig.figma.com/img/ff48/013c/2e83ffc52e71ad79aa63042d84df66ea?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YM8P~0PxtthvqdrRezgqTPGWBwDYBuaJ5KuSH2p5ukXo6wtUu1OJrzbctsWiSVSlOjbU0eRG2IeJi01FM-FtaQja7IZ2nYG0EOfott7neuSKMdg6se9PRA4AHShVEDPHadWErlEvn24c4lQKvPQZItVI6bZZ9MZriltsA7mxzW65JF1LDIzGzEbl5JDhMivfcUrAkpMxj8UfZDIN~u~PkMNceSRvxYf2bQ-~~s7Qim~ecTdYfFoaJ~wzyt~t-AeOINTCnj1RRcaWl85blyiAU-FxMURFNelAi8UVzsbb0C~LwGC11iWQvMonHiXFRLSFKQPvYaMkHiGC5AQ0Wb0blA__'].map((uri, index) => (
          <View key={index} style={styles.thumbnailWrapper}>
            <Image style={styles.thumbnail} source={{ uri }} />
            <View style={styles.BadgeNew}>
              <Text style={styles.TextNew}>New</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  headerImage: {
    width: '100%',
    height: 300,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  viewAllText: {
    color: '#222222',
  },
  productCard: {
    width: 150,
    marginHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    position: 'relative',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#00B0FF',
    marginTop: 5,
    marginLeft: 5,
    paddingVertical: 2,
    paddingHorizontal: 4,
    fontSize: 11,
    borderRadius: 20,
  },
  discountText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 11,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  productName: {
    marginTop: 10,
    fontSize: 12,
  },
  productPrice: {
    fontSize: 16,
    color: '#888',

  },
  newSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  newTitle: {
    fontSize: 18,
    color: '#222222',
    fontWeight: 'bold',
  },
  viewAll: {
    marginTop: 10,
    color: '#9B9B9B',
    fontSize: 11,
    fontWeight: 'bold',
  },
  subtitle: {
    marginLeft: 20,
    fontSize: 11,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  BadgeNew: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#222222',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 20,
  },
  TextNew: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 11,
  },
  discountPrice: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize:16,
  },
  heartButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#FFF',
    marginTop: 20,
  },

  thumbnail: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
});

export default FashionSaleScreen;
