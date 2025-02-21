import GoogleSignInButton from "@/components/googleSignInButton";
import PrimaryButton from "@/components/primaryButton";
import ThemeToggleButton from "@/components/themeToggleButton";
import { useThemeContext } from "@/context/themecontext";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet, Text, View, StatusBar } from "react-native";
import AvatarFrame from "../../components/avatarFrame";
import { useTextStyles } from "../../config/textStyles";
import { useThemeToggleAnimation } from "@/hooks/useThemeToggleAnimation";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";
import buttonData from './buttonData.json';

const imports = {
  GoogleSignInButton,
  PrimaryButton,
  ThemeToggleButton,
  useThemeContext,
  useRouter,
  useEffect,
  useRef,
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  AvatarFrame,
  useTextStyles,
  useThemeToggleAnimation,
  SafeAreaView,
  styles,
  buttonData,
};

export default imports;