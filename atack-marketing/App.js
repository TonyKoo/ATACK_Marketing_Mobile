import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import HomeScreen from "./src/screens/Home";
import SearchScreen from "./src/screens/Search";
import QRScannerScreen from "./src/screens/QRScan";
import ProfileScreen from "./src/screens/Profile";
import { Ionicons } from "@expo/vector-icons";
import EventList from "./src/components/events/EventList";
import Event from "./src/components/events/Event";
import VendorList from './src/components/vendors/VendorList'
import Vendor from './src/components//vendors/Vendor'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const AppStack = createStackNavigator();

const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();

const HomeTabNavigator = ({navigation, route}) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name == "Home") {
          iconName = "ios-home";
        } else if (route.name == "Search") {
          iconName = "ios-search";
        } else if (route.name == "QRScan") {
          iconName = "ios-qr-scanner";
        } else if (route.name == "Profile") {
          iconName = "ios-person";
        } else if (route.name == "Login") {
          iconName = "ios-apps";
        } else if (route.name == "Register") {
          iconName = "ios-more";
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeStackNavigator} />
    <Tab.Screen name="Search" component={SearchStackNavigator} />
    <Tab.Screen name="QRScan" component={QRScannerScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    {/* Login + Register will be removed from tab bar upon SWITCH Navigation implementation */}
    <Tab.Screen name="Login" component={Login} />
    <Tab.Screen name="Register" component={Register} />
  </Tab.Navigator>
);

function getHeaderTitle(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : "Home";

  switch (routeName) {
    case "Home":
      return "Home";
    case "Search":
      return "Search";
    case "QRScan":
      return "QR Scanner";
    case "Profile":
      return "Profile";
  }
}

function shouldHeaderBeShown(route) {
  const routeName = route.state ? route.state.routes[route.state.index].name: 'Home'
  switch(routeName) {
    case 'Home':
      return false;
    case 'Search':
      return false;
    case 'EventList':
      return false;
  }
}

const HomeStackNavigator = ({navigation, routes}) => {
  return(
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeScreen}/>
    <HomeStack.Screen 
      name="EventList" 
      component={AppStackNavigator}
      />
  </HomeStack.Navigator>
  )}

  const SearchStackNavigator = ({navigation, routes}) => {
    return(
      <SearchStack.Navigator>
      <SearchStack.Screen name="Home" component={SearchScreen}/>
      <SearchStack.Screen name="EventList" component={AppStackNavigator} />
    </SearchStack.Navigator>
    )
  }

  const AppStackNavigator = ({navigation, routes}) => {
    return (
      <AppStack.Navigator>
      <AppStack.Screen name="EventList" component={EventList} options={{ headerShown: false }}/>
      <AppStack.Screen name="Event" component={Event}/>
      <AppStack.Screen name="QRScan" component={QRScannerScreen}/>
      <AppStack.Screen name="VendorList" component={VendorList}/>
      <AppStack.Screen name="Vendor" component={Vendor}/>
      </AppStack.Navigator>
    )

  }

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Home"
      >
        <Stack.Screen
          options={({ route }) => ({
            title: getHeaderTitle(route),
            headerShown: shouldHeaderBeShown(route)
          })}
          name="Home"
          component={HomeTabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
