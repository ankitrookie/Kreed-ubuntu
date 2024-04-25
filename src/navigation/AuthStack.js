import { createNativeStackNavigator } from "@react-navigation/native-stack";

// components
import { ForgetPassword, SignUp, Login, Otp, OnBoarding, ProfileDetail } from "../screens/index";

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: true,
                gestureDirection: "horizontal",
            }}>
            <Stack.Screen name="OnBoarding" component={OnBoarding} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Otp" component={Otp} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ProfileDetail" component={ProfileDetail} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        </Stack.Navigator>
    );
};

export default AuthNavigation;