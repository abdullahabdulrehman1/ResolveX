import { useThemeContext } from "@/context/themecontext";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { Divider, IconButton, Text } from "react-native-paper";

interface OrganizationSelectProps {
  label: string;
  value: string;
  onSelect: (organization: string) => void;
  suggestions: string[];
  error?: string;
}

const OrganizationSelect: React.FC<OrganizationSelectProps> = ({
  label,
  value,
  onSelect,
  suggestions,
  error,
}) => {
  const { theme } = useThemeContext();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const screenWidth = Dimensions.get("window").width;

  const handleToggleSuggestions = () => {
    setShowSuggestions(!showSuggestions);
  };

  const handleCloseSuggestions = () => {
    setShowSuggestions(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={handleToggleSuggestions}
          style={[
            styles.selectionField,
            {
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.primary,
              borderRadius: 24,
              borderWidth: 1,
            },
          ]}
        >
          <Text
            style={[
              styles.selectionText,
              {
                color: value ? theme.colors.text : theme.colors.primary,
                fontFamily: value
                  ? theme.fonts.regular.fontFamily
                  : theme.fonts.medium.fontFamily,
              },
            ]}
          >
            {value || label}
          </Text>
        </TouchableOpacity>
        <IconButton
          icon={showSuggestions ? "chevron-up" : "chevron-down"}
          size={20}
          iconColor={theme.colors.primary}
          onPress={handleToggleSuggestions}
          style={styles.dropdownButton}
        />
      </View>

      {showSuggestions && suggestions.length > 0 && (
        <View
          style={[
            styles.suggestionsContainer,
            {
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.primary,
              borderRadius: 24,
              borderWidth: 2,
              width: screenWidth * 0.9, // Adjust width based on screen size
            },
          ]}
        >
          <View style={styles.suggestionsHeaderContainer}>
            <Text
              style={[styles.suggestionsHeader, { color: theme.colors.text }]}
            >
              Select Organization
            </Text>
            <IconButton
              icon="close"
              size={20}
              iconColor="red"
              onPress={handleCloseSuggestions}
            />
          </View>

          {/* Scrollable list container */}
          <ScrollView
            style={styles.scrollView}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.scrollContent}>
              {suggestions.map((suggestion, index) => (
                <React.Fragment key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      onSelect(suggestion);
                      setShowSuggestions(false);
                    }}
                    style={styles.suggestionItem}
                  >
                    <Text style={{ color: theme.colors.text }}>
                      {suggestion}
                    </Text>
                    {value === suggestion && (
                      <IconButton
                        icon="check"
                        size={16}
                        iconColor={theme.colors.primary}
                        style={styles.checkIcon}
                      />
                    )}
                  </TouchableOpacity>
                  {index < suggestions.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </View>
          </ScrollView>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectionField: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  selectionText: {
    fontSize: 16,
  },
  dropdownButton: {
    marginLeft: 8,
  },
  suggestionsContainer: {
    position: "absolute",
    top: 60,
    left: "5%", // Center the dropdown
    zIndex: 20,
    right: "5%", // Center the dropdown
    maxHeight: 300, // Fixed maximum height
  },
  scrollView: {
    flex: 1,
    maxHeight: 250, // Slightly less than container height
  },
  scrollContent: {
    paddingBottom: 16, // Add bottom padding
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
});

export default OrganizationSelect;
