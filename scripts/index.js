/*
This file contains only JS for index.html
*/

// This array will hold all the photo urls for the search
let photosUrlArray = [];
// variable holding the number of images to get, max 500 according to the docs (API)
let numOfResult = 20;

/* Function is asynchronous which means that when it is called it won't block any other JS from running.
 */
let searchButtonClicked = async () => {
  //searchTerm is the value that is entered in the searchfield-tag in html
  let searchTerm = document.getElementById("searchField").value;
  //if the promise is rejected the catch (error) will run.
  try {
    let response = await getImages(searchTerm, numOfResult); //value of resolved promise
    let responseAsJson = await response.json(); //value of resolved promise
    // so far so good, let's handle the response
    handlePhotosResponse(responseAsJson);
  } catch (error) {
    alert(error);
  }
};

// EventListeners that engage on click or on an "keyup" event (enter-key)
document
  .getElementById("searchButton")
  .addEventListener("click", searchButtonClicked);

document.getElementById("searchField").addEventListener("keyup", event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("searchButton").click();
  }
});

//eventlistner that listens to if the modal is directly clicked on. If so the modal will hide through style.display
document.getElementById("modal_").addEventListener("click", event => {
  let modal_ = document.getElementById("modal_");
  if (event.target == modal_) {
    modal_.style.display = "none";
  }
});

//refresh webpage on header-click
document.getElementById("headerH1").addEventListener("click", () => {
  window.location.reload();
});

/*This function will handle the response we get from the Flickr API. 
Since it is returned as a list of JSON object we need to convert the objects into strings (URL) to be able to present them in img-tags.
The function loops through that list of JSON objects, creates an url for each object and store them in the array (photosUrlArray) */
const handlePhotosResponse = response => {
  let listOfPhotoObjects = response.photos.photo;
  photosUrlArray = [];
  for (let i = 0; i < listOfPhotoObjects.length; i++) {
    let photoObject = listOfPhotoObjects[i];
    let urlString = `https://farm${photoObject.farm}.staticflickr.com/${photoObject.server}/${photoObject.id}_${photoObject.secret}.jpg`;
    photosUrlArray.push(urlString);
  }
  createImgTags(); //Let's show the images
};

let createImgTags = () => {
  let htmlString = ""; // this string will contain all the img-tags for the mainpage
  let modalHtmlString = ""; // this string will contain all the img-tags for the modal
  let idForImageTag = 0; // we need to set id to every img-tag so that we can assign event-listeners to it later.

  // this for of loop fills the strings above with img-tags for the mainpage and the modal and assigns it different id:s.
  for (let imageUrl of photosUrlArray) {
    htmlString += `<img id="main_${idForImageTag}" src="${imageUrl}"/>` + "\n";
    modalHtmlString +=
      `<img id="modal_${idForImageTag}" src="${imageUrl}"/>` + "\n";
    idForImageTag++;
  }
  //images for mainpage
  document.getElementById("imagesContainer").innerHTML = htmlString;
  //images for modal
  document.getElementById("previewImagesContainer").innerHTML = modalHtmlString;
  //let's add eventlisteners to the images to make them open in the lightbox
  addEventlistenersToImages();
};

let addEventlistenersToImages = () => {
  for (let i = 0; i < photosUrlArray.length; i++) {
    //looping so that we can find all images by id
    document.getElementById("main_" + i).addEventListener("click", () => {
      //show the clicked image in the light-box
      document.getElementById("modal_").style.display = "flex"; // the modal (lightbox) becomes visable
      document.getElementById(
        "mainImageContainer"
      ).innerHTML = `<img src="${photosUrlArray[i]}"/>`; //show the actual image clicked on
    });
    // same as above but for the lightbox horisontal images
    document.getElementById("modal_" + i).addEventListener("click", () => {
      document.getElementById(
        "mainImageContainer"
      ).innerHTML = `<img src="${photosUrlArray[i]}"/>`;
    });
  }
};
