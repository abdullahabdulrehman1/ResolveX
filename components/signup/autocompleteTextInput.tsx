import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, List, Text, Divider, IconButton } from "react-native-paper";
import { useThemeContext } from "@/context/themecontext";

interface AutocompleteTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  suggestions: string[];
  onSuggestionPress: (suggestion: string) => void;
  error?: string;
}

const AutocompleteTextInput: React.FC<AutocompleteTextInputProps> = ({
  label,
  value,
  onChangeText,
  suggestions,
  onSuggestionPress,
  error,
}) => {
  const { theme } = useThemeContext();
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleCloseSuggestions = () => {
    setShowSuggestions(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label={label}
        value={value}
        textColor={theme.colors.text}
        selectionColor={theme.colors.text}
        outlineStyle={{
          borderWidth: 1,
          borderColor: theme.colors.primary, // Set outline color to primary
          borderRadius: 24, // Ensure border radius is applied properly
        }}
        placeholderTextColor={theme.colors.primary}
        onChangeText={(text) => {
          onChangeText(text);
          setShowSuggestions(true);
        }}
        mode="outlined"
        error={!!error}
        style={[styles.input, { backgroundColor: theme.colors.background }]}
        theme={{
          colors: {
            primary: theme.colors.primary,
            onSurfaceVariant: theme.colors.primary,
            placeholder: theme.colors.primary,
          },
        }}
      />
      {showSuggestions && suggestions.length > 0 && (
        <View
          style={[
            styles.suggestionsContainer,
            {
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.primary,
              borderRadius: 24,
              borderWidth: 2,
            },
          ]}
        >
          <View style={styles.suggestionsHeaderContainer}>
            <Text
              style={[styles.suggestionsHeader, { color: theme.colors.text }]}
            >
              Select from these:
            </Text>
            <IconButton
              icon="close"
              size={20}
              iconColor="red"
              onPress={handleCloseSuggestions}
            />
          </View>
          {suggestions.map((suggestion, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                onPress={() => onSuggestionPress(suggestion)}
                style={styles.suggestionItem}
              >
                <Text style={{ color: theme.colors.text }}>{suggestion}</Text>
                <IconButton
                  icon="check"
                  size={16}
                  iconColor={theme.colors.primary}
                  style={styles.checkIcon}
                />
              </TouchableOpacity>
              {index < suggestions.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
  },
  suggestionsContainer: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  suggestionsHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  suggestionsHeader: {
    fontWeight: "bold",
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
  },
  checkIcon: {
    marginLeft: 8,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  errorText: {
    marginLeft: 4,
  },
});

export default AutocompleteTextInput;
