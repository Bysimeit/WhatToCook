import { View, StyleSheet, Pressable } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function NavBar({ navigation, active }) {
    const handlePressResearch = () => {
        navigation.navigate('Research');
    };
      const handlePressRecipe = () => {
        navigation.navigate('Receipts');
    };
      const handlePressDiscovery = () => {
        navigation.navigate('Discovery');
    };

    if (active == "none") {
        return (
            <View style={stylesNone.buttons}>
                <Pressable style={stylesNone.searchButtonLeft} onPress={ handlePressResearch }>
                    <Ionicons name='search-outline' size={25} style={stylesNone.iconsNoActive} />
                </Pressable>
                <Pressable style={stylesNone.searchButtonMiddle} onPress={ handlePressRecipe }>
                    <Ionicons name='stats-chart-outline' size={25} style={stylesNone.iconsNoActive} />
                </Pressable>
                <Pressable style={stylesNone.searchButtonRight} onPress={ handlePressDiscovery }>
                    <Ionicons name='compass-outline' size={25} style={[stylesNone.iconsNoActive, stylesNone.iconRight]} />
                </Pressable>
            </View>
        );
    } else {
        if (active == "left") {
            return (
                <View style={stylesLeft.buttons}>
                    <Pressable style={stylesLeft.searchButtonActive}>
                        <Ionicons name='search-outline' size={25} style={stylesLeft.iconsActive} />
                    </Pressable>
                    <Pressable style={stylesLeft.searchButtonMiddle} onPress={ handlePressRecipe } >
                        <Ionicons name='stats-chart-outline' size={25} style={stylesLeft.iconsNoActive} />
                    </Pressable>
                    <Pressable style={stylesLeft.searchButtonRight} onPress={ handlePressDiscovery } >
                        <Ionicons name='compass-outline' size={25} style={[stylesLeft.iconsNoActive, stylesLeft.iconRight]} />
                    </Pressable>
                </View>
            );
        } else {
            if (active == "middle") {
                return (
                    <View style={stylesMiddle.buttons}>
                        <Pressable style={stylesMiddle.searchButtonLeft} onPress={ handlePressResearch }>
                            <Ionicons name='search-outline' size={25} style={stylesMiddle.iconsLeft} />
                        </Pressable>
                        <Pressable style={stylesMiddle.searchButtonActive}>
                            <Ionicons name='stats-chart-outline' size={25} style={stylesMiddle.iconsActive} />
                        </Pressable>
                        <Pressable style={stylesMiddle.searchButtonRight} onPress={ handlePressDiscovery } >
                            <Ionicons name='compass-outline' size={25} style={stylesMiddle.iconsRight} />
                        </Pressable>
                    </View>
                );
            } else {
                if (active == "right") {
                    return (
                        <View style={stylesRight.buttons}>
                            <Pressable style={stylesRight.searchButtonLeft} onPress={ handlePressResearch }>
                                <Ionicons name='search-outline' size={25} style={stylesRight.iconsNoActive} />
                            </Pressable>
                            <Pressable style={stylesRight.searchButtonMiddle} onPress={ handlePressRecipe }>
                                <Ionicons name='stats-chart-outline' size={25} style={stylesRight.iconsNoActive} />
                            </Pressable>
                            <Pressable style={stylesRight.searchButtonActive}>
                                <Ionicons name='compass-outline' size={25} style={[stylesRight.iconsActive, stylesRight.iconRight]} />
                            </Pressable>
                        </View>
                    );
                }
            }
        }
    }
}

const stylesNone = StyleSheet.create({
    buttons: {
        height: 50,
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        bottom: 30,
        alignSelf: 'center'
    },
    searchButtonLeft: {
        backgroundColor: "#D9D9D9", 
        height: 40, 
        width: 40, 
        borderRadius: 20,
        marginRight: 40
    },
    searchButtonMiddle: {
        backgroundColor: "#D9D9D9", 
        height: 40, 
        width: 40, 
        borderRadius: 20
    },
    searchButtonRight: {
        backgroundColor: "#D9D9D9", 
        height: 40, 
        width: 40, 
        borderRadius: 20,
        marginLeft: 40
    },
    iconsNoActive: {
        color: 'black',
        textAlign: 'center',
        top: 6
    },
    iconRight: {
        left: 1
    }
});

const stylesLeft = StyleSheet.create({
    buttons: {
        height: 50,
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        bottom: 30,
        alignSelf: 'center'
    },
    searchButtonActive: {
        backgroundColor: "#3F3838", 
        height: 40, 
        width: 40, 
        borderRadius: 20,
        marginRight: 40
    },
    searchButtonMiddle: {
        backgroundColor: "#D9D9D9",
        height: 40, 
        width: 40, 
        borderRadius: 20
    },
    searchButtonRight: {
        backgroundColor: "#D9D9D9",
        height: 40, 
        width: 40, 
        borderRadius: 20,
        marginLeft: 40
    },
    iconsActive: {
        color: '#FFFFFF',
        textAlign: 'center',
        top: 6
    },
    iconsNoActive: {
        color: 'black',
        textAlign: 'center',
        top: 6
    },
    iconRight: {
        left: 1
    }
});

const stylesMiddle = StyleSheet.create({
    buttons: {
        height: 50,
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        bottom: 30,
        alignSelf: 'center'
    },
    searchButtonActive: {
        backgroundColor: "#3F3838", 
        height: 40, 
        width: 40, 
        borderRadius: 20
    },
    searchButtonLeft: {
        backgroundColor: "#D9D9D9",
        height: 40, 
        width: 40, 
        borderRadius: 20,
        marginRight: 40
    },
    searchButtonRight: {
        backgroundColor: "#D9D9D9",
        height: 40, 
        width: 40, 
        borderRadius: 20,
        marginLeft: 40
    },
    iconsActive: {
        color: '#FFFFFF',
        textAlign: 'center',
        top: 6
    },
    iconsLeft: {
        color: 'black',
        textAlign: 'center',
        top: 6
    },
    iconsRight: {
        color: 'black',
        textAlign: 'center',
        top: 6,
        left: 1
    }
});

const stylesRight = StyleSheet.create({
    buttons: {
        height: 50,
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        bottom: 30,
        alignSelf: 'center'
    },
    searchButtonLeft: {
        backgroundColor: "#D9D9D9", 
        height: 40, 
        width: 40, 
        borderRadius: 20,
        marginRight: 40
    },
    searchButtonMiddle: {
        backgroundColor: "#D9D9D9", 
        height: 40, 
        width: 40, 
        borderRadius: 20
    },
    searchButtonActive: {
        backgroundColor: "#3F3838", 
        height: 40, 
        width: 40, 
        borderRadius: 20,
        marginLeft: 40
    },
    iconsNoActive: {
        color: 'black',
        textAlign: 'center',
        top: 6
    },
    iconsActive: {
        color: '#FFFFFF',
        textAlign: 'center',
        top: 6
    },
    iconRight: {
        left: 1
    }
});