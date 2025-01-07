import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

type Quote = {
  id: string;
  content: string;
  author: string;
};

const SearchScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch('https://zenquotes.io/api/quotes');
        const data = await response.json();
        const formattedQuotes = data.map((quote: any, index: number) => ({
          id: index.toString(),
          content: quote.q,
          author: quote.a,
        }));
        setQuotes(formattedQuotes);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch quotes');
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  const handleSearch = () => {
    Alert.alert('Search Triggered', `You searched for: "${searchText}"`);
    setSearchText('');
  };

  const renderQuote = ({ item }: { item: Quote }) => (
    <View style={styles.quoteContainer}>
      <Text style={styles.quoteContent}>“{item.content}”</Text>
      <Text style={styles.quoteAuthor}>- {item.author}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Inspiring Quotes</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={quotes}
          keyExtractor={(item) => item.id}
          renderItem={renderQuote}
          contentContainerStyle={styles.quoteList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#228B22',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  quoteList: {
    paddingBottom: 20,
  },
  quoteContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quoteContent: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 10,
  },
  quoteAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#888',
  },
});

export default SearchScreen;
