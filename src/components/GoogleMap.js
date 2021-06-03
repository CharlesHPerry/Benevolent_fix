import React, { Component } from "react";
import '../App.css';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';


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
 };

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin_address: '',
      destination_address: '',
      origin_id: '',
      destination_id: '',
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      mapCenter: {
        lat: 47.6062,
        lng: -122.3321
      }
    };
  }  
   
    handleOriginChange = origin_address => {
      this.setState({ origin_address });
    };
   
    handleOriginSelect = async origin_address => {
      const results = await geocodeByAddress(origin_address);
      const latLng = await getLatLng(results[0]);
      
      this.setState({ origin_address });
      this.setState({ origin_id: results[0].place_id });
      this.setState({ mapCenter: latLng })
    };

    handleDestinationChange = destination_address => {
      this.setState({ destination_address });
    };
   
    handleDestinationSelect = async destination_address => {
      const results = await geocodeByAddress(destination_address);
      const latLng = await getLatLng(results[0]);
      
      this.setState({ destination_address })
      this.setState({ destination_id: results[0].place_id });
      this.setState({ mapCenter: latLng })
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
        </div>
      )
    }
  }

export default GoogleApiWrapper({
    apiKey: ('AIzaSyDBvH-f0BeO22D8QqD6wQddykUJ5zFt1gM')
})(MapContainer)