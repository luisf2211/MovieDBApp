import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, ViewPager } from '@ui-kitten/components';
import { ChildrenProp } from '@ui-kitten/components/devsupport';

interface ICustomViewPagerComponent extends React.FC<{ children: ChildrenProp | any }> {
    Layout: React.FC<{children: React.ReactNode}>;
}

type CustomViewPagerComponentLayoutProps = {
    children: React.ReactNode
}

const CustomViewPagerLayout: React.FC<CustomViewPagerComponentLayoutProps> = ({ children }) => {
    return (
        <Layout
            style={styles.tab}
            level='2'
        >
            {children}
        </Layout>
    )
}

export const CustomViewPagerComponent: ICustomViewPagerComponent = ({ children }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    return (
        <ViewPager
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}
            style={{ gap: 20 }}
            swipeEnabled
        >
            {children}
        </ViewPager>
    );
};

CustomViewPagerComponent.Layout = CustomViewPagerLayout;

const styles = StyleSheet.create({
    tab: {
        height: 350,
        alignItems: 'center',
        justifyContent: 'center',
    },
});