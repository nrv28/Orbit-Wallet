import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';

type HorizontalListProps = {
  data: {
    id: string;
    imageUrl: string;
    title: string;
  }[];
};

const SCREEN_WIDTH = Dimensions.get('window').width;

const HorizontalList: React.FC<HorizontalListProps> = ({ data }) => {
  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <Text style={styles.cardText}>{item.title}</Text>
        </View>
      )}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: 10,
    alignItems: 'center',
  },
  image: {
    width: SCREEN_WIDTH / 3,
    height: SCREEN_WIDTH / 3,
    borderRadius: 10,
  },
  cardText: {
    marginTop: 5,
    fontSize: 14,
  },
});

export default HorizontalList;
