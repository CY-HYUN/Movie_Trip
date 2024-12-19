// import { useState, useEffect, useRef } from 'react';

// export type Location = {
//     latitude: number;
//     longitude: number;
// };

// const useWatchLocation = (isRecordStart: boolean, options = {}) => {
//     // store location in state
//     const [location, setLocation] = useState<Location>();
//     // store error message in state
//     const [error, setError] = useState<string>();
//     // save the returned id from the geolocation's `watchPosition` to be able to cancel the watch instance
//     const locationWatchId = useRef<number>(null);

//     // Success handler for geolocation's `watchPosition` method
//     const handleSuccess = (pos: any) => {
//         const { latitude, longitude } = pos.coords;

//         setLocation({
//             latitude,
//             longitude,
//         });
//     };

//     // Error handler for geolocation's `watchPosition` method
//     const handleError = (error: any) => {
//         setError(error.message);
//     };

//     // Clears the watch instance based on the saved watch id
//     const cancelLocationWatch = () => {
//         const { geolocation } = navigator;

//         if (locationWatchId.current && geolocation) {
//             geolocation.clearWatch(locationWatchId.current);
//         }
//     };

//     useEffect(() => {
//     if(!isRecordStart) return;

//         const { geolocation } = navigator;

//         // If the geolocation is not defined in the used browser we handle it as an error
//         if (!geolocation) {
//             setError('Geolocation is not supported.');
//             return;
//         }

//         // Start to watch the location with the Geolocation API
//         locationWatchId.current = geolocation.watchPosition(handleSuccess, handleError, options);

//         // Clear the location watch instance when React unmounts the used component
//         return cancelLocationWatch;
//     }, [options]);

//     return { location, cancelLocationWatch, error };
// };

// export default useWatchLocation;
import { useState, useEffect, useRef } from "react";

export type Location = {
  latitude: number;
  longitude: number;
};

const useWatchLocation = (isRecordStart: boolean, options = {}) => {
  // store location in state
  const [location, setLocation] = useState<Location>();
  // store error message in state
  const [error, setError] = useState<string>();
  // save the returned id from the geolocation's `watchPosition` to be able to cancel the watch instance
  const locationWatchId = useRef<number | null>(null);

  // Success handler for geolocation's `watchPosition` method
  const handleSuccess = (pos: any) => {
    const { latitude, longitude } = pos.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  // Error handler for geolocation's `watchPosition` method
  const handleError = (error: any) => {
    setError(error.message);
  };

  // Clears the watch instance based on the saved watch id
  const cancelLocationWatch = () => {
    const { geolocation } = navigator;

    if (locationWatchId.current !== null && geolocation) {
      geolocation.clearWatch(locationWatchId.current);
    }
  };

  useEffect(() => {
    if (!isRecordStart) return;

    const { geolocation } = navigator;

    // If the geolocation is not defined in the used browser we handle it as an error
    if (!geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    // Start to watch the location with the Geolocation API
    locationWatchId.current = geolocation.watchPosition(
      handleSuccess,
      handleError,
      options,
    );

    // Clear the location watch instance when React unmounts the used component
    return cancelLocationWatch;
  }, [isRecordStart, options]);

  return { location, cancelLocationWatch, error };
};

export default useWatchLocation;
