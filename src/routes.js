import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Main from './pages/Main';
import RouterScreen from './components/RouterScreen';

const Routes = createAppContainer(
  createSwitchNavigator({
    RouterScreen,
    Login,
    Main,
  })
);

export default Routes;
