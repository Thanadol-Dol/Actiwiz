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
        <Text style={[styles.navText, activePage === 'FeedPageEvent' && styles.activeNavText]}>Event</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navButton, activePage === 'FeedPageClub' && styles.activeNavButton]}
        onPress={() => setActivePage('FeedPageClub')}
      >
        <Text style={[styles.navText, activePage === 'FeedPageClub' && styles.activeNavText]}>Club</Text>
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
    color: '#000', // ตั้งค่าสีข้อความเป็นสีดำ
  },
  activeNavButton: {
    borderBottomWidth: 2,
    borderColor: '#ff8f00',
  },
  activeNavText: {
    color: '#ff8f00', // ตั้งค่าสีข้อความเมื่อ Active เป็นสีส้ม
  },
});

export default Navbar;
