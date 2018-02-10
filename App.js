import { StackNavigator } from 'react-navigation'

import SplashScreen from './src/screens/SplashScreen'
import MapScreen from './src/screens/MapScreen'

const fade = props => {
  const { position } = props
  const { index } = props.scene

  const opacity = position.interpolate({
    inputRange: [index - 0.7, index, index + 0.7],
    outputRange: [0.3, 1, 0.3],
  })

  return {
    opacity,
    transform: [{ translateX: 0 }, { translateY: 0 }],
  }
}

const App = StackNavigator(
  {
    Map: {
      screen: MapScreen,
      navigationOptions: {
        gesturesEnabled: false
      },
    },
    Splash: { screen: SplashScreen },
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
    transitionConfig: () => ({
      screenInterpolator: props => fade(props),
    }),
  },
)

export default App
