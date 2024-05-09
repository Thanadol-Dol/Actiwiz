import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface NavbarProps {
  activePage: 'FeedPageEvent' | 'FeedPageClub';
  setActivePage: (page: 'FeedPageEvent' | 'FeedPageClub') => void;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={[styles.navButton, activePage === 'FeedPageEvent' && styles.activeNavButton]}
        onPress={() => setActivePage('FeedPageEvent')}
      >
        <Text style={styles.navText}>Event</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navButton, activePage === 'FeedPageClub' && styles.activeNavButton]}
        onPress={() => setActivePage('FeedPageClub')}
      >
        <Text style={styles.navText}>Club</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  navButton: {
    paddingHorizontal: 20,
  },
  navText: {
    fontWeight: 'bold',
  },
  activeNavButton: {
    borderBottomWidth: 2,
    borderColor: '#ff8f00',
  },
});

export default Navbar;