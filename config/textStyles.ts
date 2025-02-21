import { StyleSheet } from 'react-native';
import { useCustomFonts } from './font';

export const useTextStyles = () => {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  return StyleSheet.create({
    heading: {
      fontFamily: 'Poppins-Bold',
      fontSize: 32,
      lineHeight: 40,
      color: '#2D2D2D',
    },
    subheading: {
      fontFamily: 'Poppins-Medium',
      fontSize: 24,
      lineHeight: 32,
      color: '#2D2D2D',
    },
    normalText: {
      fontFamily: 'Poppins-Regular',
      fontSize: 16,
      lineHeight: 24,
      color: '#2D2D2D',
    },
    underlinedText: {
      fontFamily: 'Poppins-Regular',
      fontSize: 16,
      lineHeight: 24,
      color: '#2D2D2D',
      textDecorationLine: 'underline',
    },
    smallText: {
      fontFamily: 'Poppins-Regular',
      fontSize: 12,
      lineHeight: 16,
      color: '#2D2D2D',
    },
    boldText: {
      fontFamily: 'Poppins-Bold',
      fontSize: 16,
      lineHeight: 24,
      color: '#2D2D2D',
    },
    heavyText: {
      fontFamily: 'Poppins-Heavy',
      fontSize: 16,
      lineHeight: 24,
      color: '#2D2D2D',
    },
  });
};