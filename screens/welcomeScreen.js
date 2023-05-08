import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
import styles from "../StyleSheets/loginScreenStyles";
import Svg, { Image, Ellipse, ClipPath } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
  runOnJS,
  withSequence,
  withSpring
} from "react-native-reanimated";
import { postLogin, postRegister } from "../util/Client";
import { useNavigation } from "@react-navigation/native";
import { validator } from '../util/Client'

const WelcomeScreen = () => {
    const navigation = useNavigation()
    const { height, width } = Dimensions.get("window");
    const imagePosition = useSharedValue(1);
    const formButtonScale = useSharedValue(1);
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [firstName, setFirstName] = useState({ value: '', error: '' })
    const [lastName, setLastName] = useState({ value: '', error: '' })
    const [loginSuccessful, setLoginSuccessful] = useState(false)
    const [isDisabled, setDisabled] = useState(false)
    
    const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
        imagePosition.value,
        [0, 1],
        [-height / (isRegistering ? 1.8 : 2), 0]
    );

    return {
        transform: [
          { translateY: withTiming(interpolation, { duration: 1000 }) },
        ],
      };
    });


    const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [650, 0]);
    return {
        opacity: withTiming(imagePosition.value, { duration: 500 }),
        transform: [
          { translateY: withTiming(interpolation, { duration: 1000 }) },
          ],
      };
    });

    const closeButtonContainerStyle = useAnimatedStyle(() => {
      const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
        return {
            opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
            transform: [
            { rotate: withTiming(interpolation + "deg", { duration: 1000 }) },
            ],
        };
    });

    const formAnimatedStyle = useAnimatedStyle(() => {
      return {
          opacity:
          imagePosition.value === 0
              ? withDelay(400, withTiming(1, { duration: 800 }))
              : withTiming(0, { duration: 300 }),
      };
    });

    const formButtonAnimatedStyle = useAnimatedStyle(() => {
      return {
          transform: [{scale: formButtonScale.value}]
      }
    })


    const enableButton = () => {
    setDisabled(false)
    }

    const handleLogin = async () => {
      const e = email.value
      const p = password.value
      setDisabled(true)
      formButtonScale.value = withSequence(withSpring(1.5), withSpring(1)) 
      try {
        await postLogin(enableButton, e, p)
        handleSuccessfulLogin()
      } catch (error) {
        setDisabled(false)
      }
    }

    const handleSuccessfulLogin = () => {
      navigation.navigate('tabs')
    }
    

    const handleRegister = () => {
      return new Promise((resolve, reject) => {
        setDisabled(true)
        formButtonScale.value = withSequence(withSpring(1.5), withSpring(1)) 
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError) {
          console.log(emailError)
        } else if (passwordError){
          console.log(passwordError)
        } else {
        postRegister(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          },
            firstName.value,
            lastName.value,
            email.value,
            password.value,
            enableButton,
          );
       }
      });
     }
  

    const handlePress = async () => {
        if (isRegistering) {
          await handleRegister();
        } else {
          await handleLogin();
        }
    };

  const loginButton = () => {
    imagePosition.value = 0;
    if (isRegistering) {
      runOnJS(setIsRegistering)(false);
    }
  };

  const registerButton = () => {
    imagePosition.value = 0;
    if (!isRegistering) {
      runOnJS(setIsRegistering)(true);
    }
  };
  
  const closeButton = () => {
    imagePosition.value = 1;
  }

  return (
    <Animated.View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg height={height + 100} width={width}>
          <ClipPath id="clipPathId">
            <Ellipse cx={width / 2} rx={height} ry={height + 100} />
          </ClipPath>
          <Image
            href={require("../assets/loginBackground.jpg")}
            width={width + 100}
            height={height + 100}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clipPathId)"
          />
        </Svg>
        <Animated.View style={[styles.closeButtonContainer, closeButtonContainerStyle]}>
          <Text onPress={closeButton}>X</Text>
        </Animated.View>
      </Animated.View>
      <View style={styles.bottomContainer}>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={styles.button} onPress={loginButton}>
            <Text style={styles.buttonText}>Login!</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={buttonsAnimatedStyle}>
        <Pressable style={styles.button} onPress={registerButton}>
            <Text style={styles.buttonText}>Register!</Text>
        </Pressable>
        </Animated.View>
        <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
        {isRegistering && (
            <>
            <TextInput
                placeholder="First Name"
                placeholderTextColor="black"
                style={styles.textInput}
                label="FirstName"
                returnKeyType="next"
                onChangeText={(text) => setFirstName({ value: text, error: '' })}
            /> 
            <TextInput
                placeholder="Last Name"
                placeholderTextColor="black"
                style={styles.textInput}
                labe="LastName"
                returnKeyType="next"
                onChangeText={(text) => setLastName({ value: text, error: '' })}
            />
            </>
            )}
            <TextInput
                placeholder="Email"
                placeholderTextColor="black"
                style={styles.textInput}
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Password"
                placeholderTextColor="black"
                style={styles.textInput}
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />
            <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
              <Pressable onPress={handlePress}>
                <Text style={styles.buttonText}>
                    {isRegistering ? "Register!" : "Login!"}
                </Text>
              </Pressable>
            </Animated.View>  
          </Animated.View>
        </View>
    </Animated.View>
  );
}

export default WelcomeScreen