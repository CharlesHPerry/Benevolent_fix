import React, { Component } from "react";
import '../App.css';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Axios from 'axios';


const style = {
  width: "90%",
  height: "60vh",
  overflowX: "hidden",
  overflowY: "hidden",
  position: "relative",
  display: "flex"
 };
 const containerStyle = {
  maxWidth: "100%",
  width: "50vw",
  height: "75vh",
  position: "relative",
  display: "inline-flex"
 };


export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin_address: '',
      destination_address: '',
      origin_id: '',
      destination_id: '',
      flight_distance: 0,
      flight_cost: 0,
      passengers: 1,
      round_trip: 1,
      control: false,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      mapCenter: {
        lat: 47.6062,
        lng: -122.3321
      },
      origin_cords: {
        lat: 0,
        lng: 0
      },
      destination_cords: {
        lat: 0,
        lng: 0
      }
    };
    this.handlePassengerChange = this.handlePassengerChange.bind(this);
    this.handleTripChange = this.handleTripChange.bind(this);
  }
  
  handleTripChange = (event) => {
    this.setState({round_trip: event.target.value})
  }

  handlePassengerChange = (event) => {
    this.setState({passengers: event.target.value})
  }

  calculateDistance = async (e) => {
    Number.prototype.toRad = function() {
      return this * Math.PI / 180;
   }
   
   var lat2 = this.state.destination_cords.lat; 
   var lon2 = this.state.destination_cords.lng; 
   var lat1 = this.state.origin_cords.lat; 
   var lon1 = this.state.origin_cords.lng; 
   
   var R = 6371; // km 
   //has a problem with the .toRad() method below.
   var x1 = lat2-lat1;
   var dLat = x1.toRad();  
   var x2 = lon2-lon1;
   var dLon = x2.toRad();  
   var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                   Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                   Math.sin(dLon/2) * Math.sin(dLon/2);  
   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
   var d = R * c;
   
   await this.setState({flight_distance: d})
   await this.calcualteCost()
  }

  calcualteCost = async () => {
    var r_t = this.state.round_trip;
    var d_f = this.state.flight_distance * 0.621371;
    var p = this.state.passengers
    await this.setState({flight_distance: this.state.flight_distance * r_t})
    if (d_f <= 700) {
      var t = d_f / 500;
      var c = t * 0.177157 * 51;
      this.setState({flight_cost: c * p * r_t})
    }
    if (d_f < 700 && d_f >= 3000 ){
      var t1 = d_f / 550;
      var c1 = t1 * 0.177157 * 51;
      this.setState({flight_cost: c1 * p * r_t})
    }
    else {
      var t2 = d_f / 580;
      var c2 = t2 * 0.177157 * 51;
      this.setState({flight_cost: c2 * p * r_t})
    }
  }
    // calculateDistance = async (e) => {
    //   //var origin = await new this.props.google.maps.LatLng(this.state.origin_cords.lat, this.state.origin_cords.lng);
    //   //var destination = this.props.google.maps.LatLng(this.state.destination_cords.lat, this.state.destination_cords.lng );
    //   var service = new this.props.google.maps.DistanceMatrixService();

    //   e.preventDefault();

    //   let callback = async (res, status) => {
    //     if (status === "OK"){
    //       console.log(res);
    //       await this.setState({flight_distance: res.rows[0].elements[0].distance.value});
    //     } else {
    //       console.error( "status:", status)
    //     }
    //   }
    //   await service.getDistanceMatrix({
    //     origins: [this.state.origin_cords],
    //     destinations: [this.state.destination_cords],
    //     travelMode: 'DRIVING',
    //   }, callback());

    // }
   
    handleOriginChange = origin_address => {
      this.setState({ origin_address });
    };
   
    handleOriginSelect = async origin_address => {
      const results = await geocodeByAddress(origin_address);
      const latLng = await getLatLng(results[0]);
      console.log(results[0])
      
      this.setState({ origin_address });
      this.setState({ origin_id: results[0].place_id });
      this.setState({ mapCenter: latLng });
      this.setState({ origin_cords: latLng });
    };

    handleDestinationChange = destination_address => {
      this.setState({ destination_address });
    };
   
    handleDestinationSelect = async destination_address => {
      const results = await geocodeByAddress(destination_address);
      const latLng = await getLatLng(results[0]);
      
      console.log(latLng);
      this.setState({ destination_address })
      this.setState({ destination_id: results[0].place_id });
      this.setState({ mapCenter: latLng });
      this.setState({ destination_cords: latLng })
    };
   
    render() {
      return (
        <div>

          <div id="flight_container" className="flight_container" >

            <div id="flight_form" className="flight_form">

                <PlacesAutocomplete
                  value={this.state.origin_address}
                  onChange={this.handleOriginChange}
                  onSelect={this.handleOriginSelect}
                  id={"origin_input"}
                >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: 'Enter Flight Origin',
                        className: 'location-search-input',
                      })}
                    required />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                          : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
              <PlacesAutocomplete
                  value={this.state.destination_address}
                  onChange={this.handleDestinationChange}
                  onSelect={this.handleDestinationSelect}
                  id={"destination_input"}
                >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: 'Enter Destination',
                        className: 'location-search-input',
                      })}
                      required
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                          : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
              <div className="small_form">
                <div className="radio_form">
                  <p className="form-label">Was this a round trip?</p>
                  <div className="yes_input">
                    <label for="Yes">Yes</label>
                    <input type="radio" value="2" name="round_trip" onClick={(event) => {this.handleTripChange(event); console.log(this.state.round_trip)}} />
                  </div>
                  <div className="yes_input">
                    <label for="No">No</label>
                    <input type="radio" value="1" name="round_trip" onClick={() => this.setState({round_trip: false})} />
                  </div>
                </div>
                <div className="number_form">
                  <p className="form-label">Number of people in your group:</p>
                  <input type="text" pattern="[0-9]*" id="passenger_input" placeholder="1" value={this.state.passengers} onChange={(event) => this.handlePassengerChange(event)}/>
                </div>
              </div>
            </div>
            <div id="google_map" className="map_div">
              
              <Map google={this.props.google}
                  className="map_style"
                  style={style}
                  containerStyle={containerStyle}
                  //containerStyle={containerStyle}
                  initialCenter={{
                    lat: this.state.mapCenter.lat,
                    lng: this.state.mapCenter.lng
                  }}
                  center={{
                    lat: this.state.mapCenter.lat,
                    lng: this.state.mapCenter.lng
                  }}
                  >
                <Marker position={{
                  lat: this.state.mapCenter.lat,
                  lng: this.state.mapCenter.lng
                }} />
              </Map>
            </div>
          </div>
              <div className="button_form">
                <button type="button" onClick={(e) => this.calculateDistance(e)}>Calculate Flight Emissions</button>
              </div>
          <div>
              <h1>Total flight distance in miles: {this.state.flight_distance * 0.621371}</h1>
              <h3>Cost to offset emissions from this flight: {this.state.flight_cost.toFixed(2)}$</h3>

          </div>
        </div>
      )
    }
  }

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAeEJojAR4Ffjcq2vt0lVA7bZ8sEFZVbAo')
})(MapContainer)