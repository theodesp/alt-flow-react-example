// @flow
import 
  alt
 from '../alt';
import {
  locationActions
} from '../actions/LocationActions';
import {
  FavoritesStore
} from './FavoritesStore';
import { LocationSource } from '../sources/LocationSource';

class LocationStoreImpl {
  locations: Array < Object > ;
  errorMessage: ? string = null; 
  bindListeners: (Object) => Object;
  waitFor: (number) => void;
  getState: () => Object;
  getLocation: (locationId: number) => Object;

  constructor() {
    this.locations = [];
    this.errorMessage = null;

    this.bindListeners({
      handleUpdateLocations: locationActions.UPDATE_LOCATIONS,
      handleFetchLocations: locationActions.FETCH_LOCATIONS,
      handleLocationsFailed: locationActions.LOCATIONS_FAILED,
      setFavorites: locationActions.FAVORITE_LOCATION
    });

    this.registerAsync(LocationSource); // This is to expose the isLoading method to the store

    this.exportPublicMethods({ // This is to expose public (static) methods other than the listeners
      getLocation: this.getLocation
    })
  }

  handleUpdateLocations(locations: Array < Object > ): void {
    this.locations = locations;
    this.errorMessage = null;
  }

  handleFetchLocations(): void {
    // reset the array while we're fetching new locations so React can
    // be smart and render a spinner for us since the data is empty.
    this.locations = [];
  }

  handleLocationsFailed(errorMessage: string): void {
    this.errorMessage = errorMessage;
  }

  resetAllFavorites(): void {
    this.locations = this.locations.map((location: Object) => {
      return {
        id: location.id,
        name: location.name,
        has_favorite: false
      };
    });
  }

  setFavorites(location: Object) {
    this.waitFor(FavoritesStore);

    const favoritedLocations = FavoritesStore.getState().locations;

    this.resetAllFavorites();

    favoritedLocations.forEach((location: Object) => {
      // find each location in the array
      for (let i = 0; i < this.locations.length; i += 1) {

        // set has_favorite to true
        if (this.locations[i].id === location.id) {
          this.locations[i].has_favorite = true;
          break;
        }
      }
    });
  }

  getLocation(id: number): ?Object {
    let { locations } = this.getState();
    for (let i = 0; i < locations.length; i += 1) {
      if (locations[i].id === id) {
        return locations[i];
      }
    }

    return null;
  }
}

export const LocationStore = alt.createStore(LocationStoreImpl, 'LocationStore');
