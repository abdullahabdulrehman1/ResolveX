import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Modal, Portal, Card, IconButton, Text, Divider } from 'react-native-paper';
import { useThemeContext } from '@/context/themecontext';

interface CustomModalProps {
  visible: boolean;
  onDismiss: () => void;
  data: { title: string; onPress: () => void }[];
}

const CustomModal: React.FC<CustomModalProps> = ({ visible, onDismiss, data }) => {
  const { theme } = useThemeContext();

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modalContainer}>
        <View style={styles.cardWrapper}>
          <Card style={[styles.card, { backgroundColor: theme.colors.background }]}>
            <Card.Content style={styles.cardContent}>
              {data.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity
                    onPress={item.onPress}
                    style={styles.menuItem}
                  >
                    <Text
                      style={[
                        styles.menuText,
                        { 
                          color: theme.colors.text,
                          fontFamily: theme.fonts.regular.fontFamily,
                        }
                      ]}
                    >
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                  {index < data.length - 1 && <Divider style={styles.divider} />}
                </View>
              ))}
            </Card.Content>
          </Card>
          <IconButton
            icon="close"
            size={24} // Increased size for a thicker icon
            onPress={onDismiss}
            style={[
              styles.closeButton,
              {
                backgroundColor: theme.colors.primary,
                shadowColor: theme.colors.primary,
              }
            ]}
            iconColor={theme.colors.background}
          />
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardWrapper: {
    position: 'relative',
    width: '80%',
  },
  card: {
    borderRadius: 24,
    
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'visible',
  },
  cardContent: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  closeButton: {
    position: 'absolute',
    top: -12,
    right: -12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  menuItem: {
    paddingVertical: 14,
    borderRadius: 12,
    marginVertical: 4,
  },
  menuText: {
    fontSize: 16,
    paddingLeft: 12,
  },
  divider: {
    marginVertical: 4,
  },
});

export default CustomModal;