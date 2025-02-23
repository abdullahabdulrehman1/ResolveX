import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, View } from 'react-native';
import { useThemeContext } from '@/context/themecontext';
import { useTextStyles } from '@/config/textStyles';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

type FeatherIconName = keyof typeof Feather.glyphMap;
type MaterialCommunityIconName = keyof typeof MaterialCommunityIcons.glyphMap;

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  iconColor?: string;
  textColor?: string;
  iconName: FeatherIconName | MaterialCommunityIconName | '';
  iconFamily?: 'Feather' | 'MaterialCommunityIcons';
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, iconColor = 'white', textColor = "white", onPress, disabled = false, iconName, iconFamily = 'Feather' }) => {
  const { theme } = useThemeContext();
  const scaleValue = new Animated.Value(1);
  const depthValue = new Animated.Value(0);
  const iconAnim = new Animated.Value(0);
  const textStyles = useTextStyles();

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 0.97,
        useNativeDriver: true,
      }),
      Animated.spring(depthValue, {
        toValue: 1,
        useNativeDriver: false,
      }),
      Animated.timing(iconAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(depthValue, {
        toValue: 0,
        useNativeDriver: false,
      }),
      Animated.timing(iconAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const iconScale = iconAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  const IconComponent = iconFamily === 'Feather' ? Feather : MaterialCommunityIcons;

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }], width: '100%' }}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={disabled}
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
      >
        <View style={styles.content}>
          {iconName ? (
            <Animated.View style={{ transform: [{ scale: iconScale }] }}>
              <IconComponent name={iconName as any} size={24} color={iconColor ? iconColor : theme.colors.text} />
            </Animated.View>
          ) : null}
          <Text style={[textStyles?.boldText, { color: textColor ? textColor : theme.colors.text, marginLeft: 8 }]}>{title}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    overflow: 'hidden',
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Make button width full
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PrimaryButton;