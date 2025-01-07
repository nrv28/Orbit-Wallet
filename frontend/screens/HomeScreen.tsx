import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View, FlatList, Image, TextInput } from 'react-native';
import HorizontalList from '../components/HorizontalList';

type Item = {
  id: string;
  imageUrl: string;
  title: string;
};

type Nomad = {
  id: string;
  imageUrl: string;
  username: string;
  followers: number;
};

const HomeScreen: React.FC = () => {
  const [trendingHashtags, setTrendingHashtags] = useState<Item[]>([]);
  const [topCommunity, setTopCommunity] = useState<Item[]>([]);
  const [topNomads, setTopNomads] = useState<Nomad[]>([]);
  const [pictureOfTheDay, setPictureOfTheDay] = useState<string>('');
  const [exploreDestinations, setExploreDestinations] = useState<Item[]>([]);
  const [popularEvents, setPopularEvents] = useState<Item[]>([]);

  useEffect(() => {
    const fetchTrendingHashtags = () => {
      const hashtags = Array.from({ length: 10 }, (_, i) => ({
        id: i.toString(),
        imageUrl: `https://picsum.photos/200?random=${i}`,
        title: `#Hashtag${i + 1}`,
      }));
      setTrendingHashtags(hashtags);
    };

    const fetchTopCommunity = () => {
      const community = Array.from({ length: 10 }, (_, i) => ({
        id: i.toString(),
        imageUrl: `https://picsum.photos/200?random=${i + 10}`,
        title: `Community ${i + 1}`,
      }));
      setTopCommunity(community);
    };

    const fetchTopNomads = () => {
      const nomads = Array.from({ length: 10 }, (_, i) => ({
        id: i.toString(),
        imageUrl: `https://randomuser.me/api/portraits/med/men/${i}.jpg`, // Using Random User API
        username: `@nomad${i + 1}`,
        followers: Math.floor(Math.random() * 100) + 100, // Random number of followers
      }));
      setTopNomads(nomads);
    };

    const fetchPictureOfTheDay = () => {
      setPictureOfTheDay('https://picsum.photos/400'); // Random picture from Picsum
    };

    const fetchExploreDestinations = () => {
      const destinations = Array.from({ length: 10 }, (_, i) => ({
        id: i.toString(),
        imageUrl: `https://picsum.photos/300?random=${i + 20}`,
        title: `Destination ${i + 1}`,
      }));
      setExploreDestinations(destinations);
    };

    const fetchPopularEvents = () => {
      const events = Array.from({ length: 10 }, (_, i) => ({
        id: i.toString(),
        imageUrl: `https://picsum.photos/300?random=${i + 30}`,
        title: `Event ${i + 1}`,
      }));
      setPopularEvents(events);
    };

    fetchTrendingHashtags();
    fetchTopCommunity();
    fetchTopNomads();
    fetchPictureOfTheDay();
    fetchExploreDestinations();
    fetchPopularEvents();
  }, []);

  const renderTopNomads = () => {
    return (
      <FlatList
        horizontal
        data={topNomads}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.nomadCard}>
            <Image source={{ uri: item.imageUrl }} style={styles.nomadImage} />
            <Text style={styles.nomadUsername}>{item.username}</Text>
            <Text style={styles.nomadFollowers}>{item.followers}k</Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Discover the World</Text>
        <TextInput
          style={styles.searchBox}
          placeholder="Search here..."
          placeholderTextColor="#999"
        />
        <View style={styles.pictureOfDayContainer}>
          <Text style={styles.pictureOfDayText}>#Top Search of the Day</Text>
          {pictureOfTheDay ? (
            <Image source={{ uri: pictureOfTheDay }} style={styles.pictureOfDayImage} />
          ) : null}
        </View>
      </View>

      <Text style={styles.sectionHeader}>Trending Hashtags</Text>
      <HorizontalList data={trendingHashtags} />

      <Text style={styles.sectionHeader}>Top Community</Text>
      <HorizontalList data={topCommunity} />

      <Text style={styles.sectionHeader}>Top Nomads</Text>
      {renderTopNomads()}

      <Text style={styles.sectionHeader}>Explore Destinations</Text>
      <HorizontalList data={exploreDestinations} />

      <Text style={styles.sectionHeader}>Popular Events</Text>
      <HorizontalList data={popularEvents} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchBox: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  pictureOfDayContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  pictureOfDayImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  pictureOfDayText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
    color: '#228B22',
  },
  nomadCard: {
    alignItems: 'center',
    marginRight: 15,
  },
  nomadImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  nomadUsername: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  nomadFollowers: {
    fontSize: 12,
    color: '#555',
  },
});

export default HomeScreen;
