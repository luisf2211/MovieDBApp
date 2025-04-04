import React from 'react';
import { GestureResponderEvent, StyleSheet, Text, View } from 'react-native';

interface IHeroComponent extends React.FC<{ children: React.ReactNode }> {
    Title: React.FC<{ children: React.ReactNode }>;
    Description: React.FC<{ children: React.ReactNode, onPress: (event: GestureResponderEvent) => void }>;
    HeroHeader: React.FC<{ children: React.ReactNode }>;
}

const HeroTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Text style={{ ...styles.title, flex: 1, textAlign: 'left' }}>
        {children}
    </Text>
);

const HeroDescription: React.FC<{ children: React.ReactNode, onPress: (event: GestureResponderEvent) => void }> = ({ children, onPress }) => (
    <Text style={{ ...styles.p, flex: 1, textAlign: 'right', fontWeight: 400, fontSize: 14 }} onPress={onPress}>
        {children}
    </Text>
);

const HeroHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <View style={{ flexDirection: 'row', padding: 2 }}>
            {children}
        </View>
    )
}

const HeroComponent: IHeroComponent = ({ children }) => {
    return (
        <View style={{ padding: 20, gap: 10 }}>
            {children}
        </View>
    );
};

HeroComponent.Title = HeroTitle;
HeroComponent.Description = HeroDescription;
HeroComponent.HeroHeader = HeroHeader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontFamily: 'inter',
        fontWeight: 500,
        fontSize: 16,
        color: '#032541',
    },
    p: {
        fontFamily: 'inter',
        fontWeight: 500,
        fontSize: 16,
        color: '#032541',
    }
});

export default HeroComponent;