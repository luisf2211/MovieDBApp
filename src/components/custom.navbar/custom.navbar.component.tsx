import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const CustomNavbarComponent: React.FC<{ title?: string }> = ({ title = 'TMDB' }) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="black" style='dark' />
            <Text style={{ color: '#032541', fontSize: 15, fontFamily: 'inter', fontWeight: 800, letterSpacing: 0.5, }}>
                {title}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 80,
        paddingLeft: 20,
        paddingBottom: 20,
        height: 'auto',
        backgroundColor: 'white',
        color: 'white',
        borderBottomWidth: 1,
        borderColor: '#EEEEEE'
    }
});

export default CustomNavbarComponent;