import alt from '../alt';
import { LocationSource } from '../sources/LocationSource';

class LocationActions {
  updateLocations(locations) {
    return locations;
  }

  favoriteLocation = (locationId) => (dispatch) => dispatch(locationId);

  fetchLocations() {
    return (dispatch) => {
      // we dispatch an event here so we can have "loading" state.
      dispatch();
      LocationSource.fetch.remote({})
        .then((locations) => this.updateLocations(locations))
        .catch((errorMessage) => this.locationsFailed(errorMessage));
    }
  }

  locationsFailed(errorMessage) {
    return errorMessage;
  }
}

export const locationActions = alt.createActions(LocationActions);

