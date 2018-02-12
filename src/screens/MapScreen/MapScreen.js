import React from 'react'
import axios from 'axios'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import MapView, { Polyline, ProviderPropType } from 'react-native-maps'

const { width, height } = Dimensions.get('window')
const crgCambridge = { lat: 42.3943939, lng: -71.1503452 }
const crgWatertown = { lat: 42.3696015, lng: -71.1985997 }
const ASPECT_RATIO = width / height
const LATITUDE = 42.3943939
const LONGITUDE = -71.1503452
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class MapScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    }
  }

  componentDidMount () {
    const mode = 'driving'
    const origin = `${crgCambridge.lat},${crgCambridge.lng}`
    const destination = `${crgWatertown.lat},${crgWatertown.lng}`
    const APIKEY = 'AIzaSyCNaCv8ozBsC4BF4QRzELhTT73d4KOvp0I'
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`

    axios.get(url)
      .then(response => {
        if (response.data.routes.length) {
          this.setState({
            coords: this.decode(response.data.routes[0].overview_polyline.points)
          })
        }
      })
  }

  decode = (t,e) => {for(let n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})}

  render() {
    const { coords, region } = this.state
    return (
      <View style={styles.container}>
        <MapView
          provider='google'
          style={styles.map}
          initialRegion={region}
        >
          <Polyline
            coordinates={coords}
            strokeColor='#50B1F7'
            strokeWidth={5}
          />
        </MapView>
        <View style={styles.buttonContainer}>
          <View style={styles.bubble}>
            <Text>Render circles, polygons, and polylines</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  latlng: {
    alignItems: 'stretch',
    width: 200,
  },
  button: {
    alignItems: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 12,
    width: 80,
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    marginVertical: 20,
  },
})

export default MapScreen
