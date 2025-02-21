import React from 'react';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useThemeContext } from '@/context/themecontext';



interface ThemeToggleButton   {
    onPress:()=> void
  }
const ThemeToggleButton: React.FC<ThemeToggleButton> = () => {
  const { theme, toggleTheme } = useThemeContext();
  const rotateAnim = React.useRef(new Animated.Value(0)).current;
  const translateYAnim = React.useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start(toggleTheme);
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const translateY = translateYAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10], // Move down by 10 units
  });

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <Animated.View style={{ transform: [{ rotate }, { translateY }] }}>
        <Feather 
          name={theme.dark ? 'moon' : 'sun'} 
          size={38} 
          color={theme.colors.primary} // Using primary color from theme
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
   
    position: 'absolute',
    top: 10,
    right: 15,
    zIndex: 10, // Increase zIndex to ensure it stays on top
  },
});

export default ThemeToggleButton;