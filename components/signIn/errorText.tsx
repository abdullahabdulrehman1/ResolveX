import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface ErrorTextProps {
  message: string;
}

const ErrorText: React.FC<ErrorTextProps> = ({ message }) => {
  return <Text style={styles.errorText}>{message}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginBottom: 2,
  },
});

export default ErrorText;