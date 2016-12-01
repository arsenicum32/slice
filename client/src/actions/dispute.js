export function fetchDispute(data) {
  return {
    type: 'FETCH_DISPUTE',
    data
  }
};


// import axios from 'axios';
//
// export function fetchDispute() {
//   const request = axios.get('/dispute/all');
//   return (dispatch) => {
//     request.then(data => {
//       return dispatch({type: 'FETCH_DISPUTE', payload: data});
//     }
//   );
//  };
// };


// Functionality for future
//
// export default function addDispute(name, disc, sides, timer, referee, complete) {
//   return {
//     type: 'ADD_DISPUTE',
//     name,
//     disc,
//     sides,
//     timer,
//     referee,
//     complete
//   }
// };
