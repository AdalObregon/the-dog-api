const API_URL = "https://api.thedogapi.com/v1/images/search";

const myDog = async () => {
  const res = await fetch(API_URL);
  const data = await res.json();
  const img = document.querySelector("#ramdom-dog");
  img.src = data[0].url;
};
myDog();
const myButton = document.querySelector("button");
myButton.onClick = myDog;
