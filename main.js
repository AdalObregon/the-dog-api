const API_URL = "https://api.thedogapi.com/v1/images/search?limit=6";

const myDog = async () => {
  const res = await fetch(API_URL);
  const data = await res.json();

  const img = document.querySelector("#ramdom-dog");
  const img2 = document.querySelector("#ramdom-dog2");
  const img3 = document.querySelector("#ramdom-dog3");
  const img4 = document.querySelector("#ramdom-dog4");
  const img5 = document.querySelector("#ramdom-dog5");
  const img6 = document.querySelector("#ramdom-dog6");

  img.src = data[0].url;
  img2.src = data[1].url;
  img3.src = data[2].url;
  img4.src = data[3].url;
  img5.src = data[4].url;
  img6.src = data[5].url;
};
myDog();
const myButton = document.querySelector("button");
myButton.onClick = myDog;
