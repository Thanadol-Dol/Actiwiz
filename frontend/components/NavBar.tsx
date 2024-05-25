import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface NavbarProps {
  activePage: 'EventFeedPage' | 'ClubFeedPage';
  setActivePage: (page: 'EventFeedPage' | 'ClubFeedPage') => void;
  zIndex: number;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage, zIndex }) => {
  return (
    <View style={[styles.navbar, zIndex !== undefined && { zIndex }]}>
      <TouchableOpacity
        style={[styles.navButton, activePage === 'EventFeedPage' && styles.activeNavButton]}
        onPress={() => setActivePage('EventFeedPage')}
      >
        <Text style={[styles.navText, activePage === 'EventFeedPage' && styles.activeNavText]}>Event</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navButton, activePage === 'ClubFeedPage' && styles.activeNavButton]}
        onPress={() => setActivePage('ClubFeedPage')}
      >
        <Text style={[styles.navText, activePage === 'ClubFeedPage' && styles.activeNavText]}>Club</Text>
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
