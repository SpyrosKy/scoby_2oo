import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 2.3488,
      lat: 48.8534,
      zoom: 11.39,
    };
  }

  // Implement react map box here.
  render() {
    return (
      <div>
        <Map
          style="mapbox://styles/chaspy/ckd4iqh92130d1in2h73n7u0v"
          containerStyle={{
            height: "100vh",
            width: "100vw",
          }}
        >
          {/* <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}
          >
            <Feature coordinates={[this.state.lng, this.state.lat]} />
          </Layer> */}
        </Map>
        ;
      </div>
    );
  }
}

export default Home;
