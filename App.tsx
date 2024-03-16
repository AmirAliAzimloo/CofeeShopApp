import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';


import CustomIcon from './src/components/CustomIcon';



function App(): JSX.Element {


  return (
    <SafeAreaView >
      <StatusBar
        barStyle={'dark-content'}
      />
        <CustomIcon name='search' size={24} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});

export default App;
