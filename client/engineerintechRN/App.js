// import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {WebView} from 'react-native-webview';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView edges={['right', 'left', 'top']} style={{backgroundColor:'white'}}></SafeAreaView>

      <WebView source={{uri: 'http://localhost:3000/signup'}} />
    </>
  );
};

export default App;
