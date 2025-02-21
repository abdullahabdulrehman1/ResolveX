import { Theme } from '@react-navigation/native';

interface FontStyle {
  fontFamily: string;
  fontWeight: '400' | '500' | '700'; // Define available font weights
}

export interface CustomTheme extends Theme {
  fonts: {
    regular: FontStyle;
    medium: FontStyle;
    bold: FontStyle;
    heavy: FontStyle;
  };
}

export const LightTheme: CustomTheme = {
  dark: false,
  colors: {
    primary: '#4285F4', // Changed to a blue color
    background: '#F8F4FC',
    card: '#EDE9FE',
    text: '#2D2D2D',
    border: '#fdfdfd',
    notification: '#007BFF', // Changed to match primary color
  },
  fonts: {
    regular: { fontFamily: 'Poppins-Regular', fontWeight: '400' },
    medium: { fontFamily: 'Poppins-Medium', fontWeight: '500' },
    bold: { fontFamily: 'Poppins-Bold', fontWeight: '700' },
    heavy: { fontFamily: 'Poppins-Bold', fontWeight: '700' }, // 🔥 Fix: Used Poppins-Bold as Heavy
  },
};

export const DarkTheme: CustomTheme = {
  dark: true,
  colors: {
    primary: '#4285F4', // Changed to a blue color
    background: '#1E1B26',
    card: '#2A2334',
    text: '#FDFDFD',
    
    border: '#fdfdfd',
    notification: '#007BFF', // Changed to match primary color
  },
  fonts: {
    regular: { fontFamily: 'Poppins-Regular', fontWeight: '400' },
    medium: { fontFamily: 'Poppins-Medium', fontWeight: '500' },
    bold: { fontFamily: 'Poppins-Bold', fontWeight: '700' },
    heavy: { fontFamily: 'Poppins-Bold', fontWeight: '700' },
  },
};