import React, { Component } from 'react'
import { ImageBackground, Text } from 'react-native'

import styles from './styles'

const MILLISECONDS_TO_WAIT = 1000

class SplashScreen extends Component {
  componentDidMount () {
    const { transitionToHomeScreen } = this;

    setTimeout(transitionToHomeScreen, Number(MILLISECONDS_TO_WAIT));
  }

  transitionToHomeScreen = () => {
    const { navigate } = this.props.navigation;

    navigate('Map');
  };

  render () {
    const imageSrc = 'https://blog.oxforddictionaries.com/wp-content/uploads/mountain-names.jpg'

    return (
      <ImageBackground
        style={styles.background}
        source={{ uri: imageSrc }}
      >
        <Text style={styles.title}>Climbing Maps</Text>
        <Text style={styles.subtitle}>Find cool shit to do along the way home.</Text>
      </ImageBackground>
    )
  }
}

export default SplashScreen
