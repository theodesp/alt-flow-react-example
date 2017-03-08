import React from 'react';
import { LocationStore } from '../stores/LocationStore';
import { locationActions } from '../actions/LocationActions';

export const Locations = ({ locations, errorMessage, className }) => {
  const addFave = (ev) => {
    console.trace(LocationStore);
    var location = LocationStore.getLocation(
      Number(ev.target.getAttribute('data-id'))
    );
    locationActions.favoriteLocation(location);
  };

  if (errorMessage) {
    return (
      <div>{errorMessage}</div>
    );
  }

  return (
    <ul className={className}>
      {locations.map((location, i) => {
        const faveButton = (
          <button onClick={addFave} data-id={location.id}>
            Favorite
            </button>
        );
        
        return (
          <li key={i}>
            {location.name} {location.has_favorite ? '<3' : faveButton}
          </li>
        );
      })}
    </ul>
  );
}
