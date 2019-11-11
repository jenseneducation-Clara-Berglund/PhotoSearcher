/*
This file contains only functionality for accessing the Flickr API
*/

/* Function that takes in parameters "searchTerm" and "numResults". 
The queryString contains the query-parameters that affects the result coming from the API. 
The function returns a promise through the fetch-API which contains JSON-data if resolved or an error if rejected.
*/

const getImages = (searchTerm, numResults) => {
  const queryString =
    `?nojsoncallback=1` +
    `&api_key=82034b3450cc7d27778963c1b8099e2b` +
    `&method=flickr.photos.search` +
    `&format=json` +
    `&safe_search=1` +
    `&text=${searchTerm}` +
    `&per_page=${numResults}`;
  return fetch("https://api.flickr.com/services/rest" + queryString);
};
