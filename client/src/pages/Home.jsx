import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import apiHandler from "../api/apiHandler";
import { clearStorage } from "mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      lng: 2.3488,
      lat: 48.8534,
      zoom: 11.39,
      toto: null,
    };
  }

  componentDidMount() {
    apiHandler
      .getItems()
      .then((res) => {
        console.log("received items in Home ", res);
        this.setState({ items: res });
      })
      .catch((err) => console.error(err));
  }

  handleOnClick = (item) => {
    this.setState({ toto: {} });
  };

  // Implement react map box here.
  render() {
    if (this.state.items) {
      return (
        <div>
          {this.state.toto && <div>Salut je suis totot</div>}
          <Map
            style="mapbox://styles/chaspy/ckd4iqh92130d1in2h73n7u0v"
            containerStyle={{
              height: "100vh",
              width: "100vw",
            }}
            center={[this.state.lng, this.state.lat]}
          >
            <Layer
              type="symbol"
              id="marker"
              layout={{ "icon-image": "marker-15", "icon-size": 4 }}
            >
              {this.state.items.map((item) => {
                console.log(
                  item.location.coordinates[0],
                  item.location.coordinates[1]
                );
                return (
                  <Feature
                    onClick={() => this.handleOnClick(item)}
                    key={item._id}
                    coordinates={[
                      item.location.coordinates[0],
                      item.location.coordinates[1],
                    ]}
                  />
                );
              })}
            </Layer>
          </Map>
          ;
        </div>
      );
    } else {
      return "Loading..";
    }
    // if (!this.state.items) {
    //   return "Loading, please wait";
    //}
  }
}

export default Home;
