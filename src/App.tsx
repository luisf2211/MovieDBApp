import * as ScreenOrientation from 'expo-screen-orientation';
import { ApplicationProvider } from '@ui-kitten/components';
import AppNavigator from './navigation/app.navigator';
import { NavigationContainer } from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import { MoviesProvider } from './context/MoviesContext';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);
  
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <MoviesProvider>
          <AppNavigator />
        </MoviesProvider>
      </NavigationContainer>
    </ApplicationProvider>
  );
}
