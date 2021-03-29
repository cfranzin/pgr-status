import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./src/screens/HomeScreen";
import SeriesScreen from "./src/screens/SeriesScreen";

const navigator = createStackNavigator(
  {
    Home: SeriesScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "Status PGR"
    }
  }
);

export default createAppContainer(navigator);
