import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import RouterScreen from './components/RouterScreen';
import Login from './pages/Login';
import Main from './pages/Main';
import NewTask from './pages/NewTask';
import TaskDetails from './pages/TaskDetails';

const AppStackNavigator = createStackNavigator({
  Main,
  NewTask,
  TaskDetails,
});

const Routes = createAppContainer(
  createSwitchNavigator({
    RouterScreen,
    Login,
    AppStackNavigator,
  })
);

export default Routes;
