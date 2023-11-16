import React from 'react';
import {
  View,
} from 'react-native';
import HomeScreen from './screens/HomeScreen';

function App(): JSX.Element {


  return (
    <View style={{ flex: 1 }} testID='app'>
      <HomeScreen />
    </View>
  );
}

export default App;
