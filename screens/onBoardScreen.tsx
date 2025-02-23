import imports from "../utils/onBoarding/imports";
const {
  GoogleSignInButton,
  PrimaryButton,
  ThemeToggleButton,
  useThemeContext,
  useRouter,
  useEffect,
  useRef,
  Animated,
  ScrollView,
  Text,
  View,
  StatusBar,
  AvatarFrame,
  useTextStyles,
  useThemeToggleAnimation,
  SafeAreaView,
  styles,
  buttonData,
} = imports;
const OnBoardScreen: React.FC = () => {
  const router = useRouter();
  const { theme } = useThemeContext();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const textStyles = useTextStyles();
  const { handleToggleTheme, pageTranslateY, imageFlip } =
    useThemeToggleAnimation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  if (!textStyles) {
    return null; // Render nothing or a loading indicator while fonts are loading
  }

  const handleSignIn = () => {
    router.push("/signin");
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  const handleGoogleSignIn = () => {
    // Add your Google sign-in logic here
  };

  const buttonFunctions: { [key: string]: () => void } = {
    handleSignIn,
    handleSignUp,
    handleGoogleSignIn,
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar hidden />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View
          style={[
            styles.container,
            { opacity: fadeAnim, transform: [{ translateY: pageTranslateY }] },
          ]}
        >
          <ThemeToggleButton onPress={handleToggleTheme} />

          <Animated.View
            style={[
              styles.imageContainer,
              { transform: [{ rotateY: imageFlip }] },
            ]}
          >
            <AvatarFrame
              src={
                theme.dark
                  ? require("../assets/images/darkonBoard.jpg")
                  : require("../assets/images/onBoardImage.jpg")
              }
              width={200}
              height={200}
            />
          </Animated.View>

          <View style={styles.textContainer}>
            <Text style={[textStyles.heading, { color: theme.colors.text }]}>
              Welcome to{"\n"}
              <Text style={{ color: theme.colors.primary }}>ResolveX</Text>{" "}
              Complaint Management
            </Text>
            <Text style={[textStyles.normalText, { color: theme.colors.text }]}>
              Streamline your complaints with our efficient management system
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            {buttonData.map((button, index) => (
              <PrimaryButton
                key={index}
                title={button.title}
                onPress={buttonFunctions[button.onPress]}
                iconName={button.iconName as any}
                textColor={button.textColor}
                iconColor={button.iconColor}
              />
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnBoardScreen;
