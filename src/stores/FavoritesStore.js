// @flow
import alt from '../alt';
import { locationActions } from '../actions/LocationActions';

class FavoritesStoreImpl {
  locations: Array<Object>;
  bindListeners: (Object) => Object;

  constructor() {
    this.locations = [];

    this.bindListeners({
      addFavoriteLocation: locationActions.FAVORITE_LOCATION
    });
  }

  addFavoriteLocation(location: Object) {
    this.locations.push(location);
  }
}

export const FavoritesStore = alt.createStore(FavoritesStoreImpl, 'FavoritesStore');
