import { useRef } from 'react';
import { Animated } from 'react-native';
import { useThemeContext } from '@/context/themecontext';

export const useThemeToggleAnimation = () => {
  const { theme, toggleTheme } = useThemeContext();
  const pageTranslateYAnim = useRef(new Animated.Value(0)).current;
  const imageFlipAnim = useRef(new Animated.Value(0)).current;

  const handleToggleTheme = () => {
    Animated.sequence([
      Animated.timing(pageTranslateYAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(imageFlipAnim, {
        toValue: theme.dark ? 0 : 1,
        duration: 1000, // Increased duration to slow down the animation
        useNativeDriver: true,
      }),
      Animated.timing(pageTranslateYAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      toggleTheme();
    });
  };

  const pageTranslateY = pageTranslateYAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50], // Move down by 50 units
  });

  const imageFlip = imageFlipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return {
    handleToggleTheme,
    pageTranslateY,
    imageFlip,
  };
};