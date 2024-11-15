import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import Splash from './(tabs)/splash'
import Signup from './(tabs)/signup'
import SignIn from './(tabs)/signin'

import Profile from './Profile'
import Home from './Home'
import Favorites from './Favorites'
import ProductDetails from './ProductDetails'
import Settings from './Settings'
import CreateListing from './CreateListing'

import { colors } from '@/constants/colors'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { getCurrentUser } from '@/lib/appwrite';
import { UserContext } from '@/context/usercontext';
import { NavigationContainer } from '@react-navigation/native'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()


const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}} />
            <Stack.Screen name="Settings" component={Settings} options={{headerShown: false}} />
            <Stack.Screen name="CreateListing" component={CreateListing} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

const Tabs = ({ setIsAuthenticated }) => {
    return (
        <Tab.Navigator 
        screenOptions= {({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let icon

                if (route.name === "Home") {
                    icon = focused
                       ? require('@/assets/tabs/home_active.png')
                       : require('@/assets/tabs/home.png')
                } else if (route.name === "Favorites") {
                    icon = focused
                       ? require('@/assets/tabs/bookmark_active.png')
                       : require('@/assets/tabs/bookmark.png')
                } else if (route.name === "Profile") {
                    icon = focused
                       ? require('@/assets/tabs/profile_active.png')
                       : require('@/assets/tabs/profile.png')
                }
                return <Image style={{width: 24, height: 24}} source={icon} />
            },
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {borderTopColor: colors.lightGrey}
            })}
            >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Favorites" component={Favorites} />
            <Tab.Screen name='Profile' component={ProfileStack} />
        </Tab.Navigator>
    )
}

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const theme = { colors: { background: colors.white } }; 

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const user = await getCurrentUser();
                setIsAuthenticated(!!user);
            } catch (error) {
                console.log("Error fetching user: ", error);
                setIsAuthenticated(false);
            }
        };
        checkAuthentication();
    }, []);

    const handleSignInSuccess = () => {
        setIsAuthenticated(true); 
    };

    return (
        <SafeAreaProvider>
            <UserContext.Provider value={{ setIsAuthenticated }}>
                <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        contentStyle: { backgroundColor: theme.colors.background },
                        headerShown: false,
                    }}
                >
                    {isAuthenticated ? (
                        <>
                            <Stack.Screen name="Tabs" component={Tabs} />
                            <Stack.Screen name="ProductDetails" component={ProductDetails} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="Splash" component={Splash} />
                            <Stack.Screen name="Signup">
                                {(props) => <Signup {...props} setIsAuthenticated={setIsAuthenticated} />}
                            </Stack.Screen>
                            <Stack.Screen name="Signin">
                                {(props) => <SignIn {...props} onSignInSuccess={handleSignInSuccess} />}
                            </Stack.Screen>
                        </>
                    )}
                </Stack.Navigator>
                </NavigationContainer>
            </UserContext.Provider>
        </SafeAreaProvider>
    );
};

export default React.memo(App)