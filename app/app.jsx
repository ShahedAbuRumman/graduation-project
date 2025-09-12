import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomePage from "@/app/welcomepage"; 
import RegisterScreen from "@/app/registerscreen";
import LoginScreen from "@/app/loginscreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    
  );
}
