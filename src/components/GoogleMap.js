import React, { Component } from "react";
import '../App.css';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Axios from 'axios';


const style = {
  maxWidth: "450px",
  height: "350px",
  overflowX: "hidden",
  overflowY: "hidden",
  position: "relative"
 };
 const containerStyle = {
  maxWidth: "450px",
  height: "350px",
  position: "relative",
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

  calcualteCost = () => {
    var d_f = this.state.flight_distance * 0.621371;

    if (d_f <= 700) {
      var t = d_f / 500;
      var c = t * 0.177157 * 51;
      this.setState({flight_cost: c})
    }
    if (d_f < 700 && d_f >= 3000 ){
      var t1 = d_f / 550;
      var c1 = t1 * 0.177157 * 51;
      this.setState({flight_cost: c1})
    }
    else {
      var t2 = d_f / 580;
      var c2 = t2 * 0.177157 * 51;
      this.setState({flight_cost: c2})
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
        <div id="google_map" className="map_div">
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
          <button type="button" onClick={(e) => this.calculateDistance(e)}>Calculate Flight Emissions</button>
          
          <Map google={this.props.google}
              style={style}
              containerStyle={containerStyle}
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
          <h1>Total flight distance in miles: {this.state.flight_distance * 0.621371}</h1>
          <h3>Cost to offset emissions from this flight: {this.state.flight_cost.toFixed(2)}$</h3>
        </div>
      )
    }
  }

export default GoogleApiWrapper({
    apiKey: ('AIzaSyDBvH-f0BeO22D8QqD6wQddykUJ5zFt1gM')
})(MapContainer)