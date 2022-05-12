const API_URL_RANDOM =
  "https://api.thedogapi.com/v1/images/search?limit=7&api_key=a2f0655b-e82e-48c6-a998-4c88a740ba26";
const API_URL_FAVORITES =
  "https://api.thedogapi.com/v1/favourites?api_key=a2f0655b-e82e-48c6-a998-4c88a740ba26";
const API_URL_FAVORITES__DELETE = (id) =>
  `https://api.thedogapi.com/v1/favourites/${id}?api_key=a2f0655b-e82e-48c6-a998-4c88a740ba26`;
// const API_KEY = "api_key=a2f0655b-e82e-48c6-a998-4c88a740ba26";
const spanError = document.getElementById("error");

//? Load Random Dogs
const myDog = async () => {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log("Random");
  console.log(data);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    const img = document.querySelector("#ramdom-dog");
    const img2 = document.querySelector("#ramdom-dog2");
    const img3 = document.querySelector("#ramdom-dog3");
    const img4 = document.querySelector("#ramdom-dog4");
    const img5 = document.querySelector("#ramdom-dog5");
    const img6 = document.querySelector("#ramdom-dog6");

    const btn1 = document.getElementById("random__button1");
    const btn2 = document.getElementById("random__button2");
    const btn3 = document.getElementById("random__button3");
    const btn4 = document.getElementById("random__button4");
    const btn5 = document.getElementById("random__button5");
    const btn6 = document.getElementById("random__button6");

    img.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
    img4.src = data[3].url;
    img5.src = data[4].url;
    img6.src = data[5].url;

    btn1.onclick = () => saveFavoriteDogs(data[0].id);
    btn2.onclick = () => saveFavoriteDogs(data[1].id);
    btn3.onclick = () => saveFavoriteDogs(data[2].id);
    btn4.onclick = () => saveFavoriteDogs(data[3].id);
    btn5.onclick = () => saveFavoriteDogs(data[4].id);
    btn6.onclick = () => saveFavoriteDogs(data[5].id);
  }
};

const h2 = document.createElement("h2");
const h2Text = document.createTextNode('Favorite Dogs');
h2.append(h2Text);
h2.setAttribute('style','text-align:center; margin-top: 30px; font-size: 30px; color: #9772FB');

//* LOAD FAVORITE DOGS
const favoriteDogs = async () => {
  const res = await fetch(API_URL_FAVORITES);
  const data = await res.json();
  console.log("Favoritos");
  console.log(data);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {


    const section = document.getElementById("favorite__images");
    section.setAttribute('style','display:grid; grid-template-columns: repeat(3, auto); grid-template-rows: repeat(3, auto); object-fit: cover;place-content: center;grid-auto-flow: row;margin-top: 4.5rem;gap: 1.2rem; @media(max-width: 500px) { .main__container{ display: grid;grid-template-columns: repeat(2, auto);grid-template-rows: repeat(2, auto);gap: 0.8rem;} img {max-width: 16rem;height: 16rem;border-radius: 5px;}}')
    section.innerHTML = "";

    section.insertAdjacentElement('beforebegin',h2);

    data.forEach((dog) => {
      const section = document.getElementById("favorite__images");
      const article = document.createElement("article");
      const img = document.createElement("img");
      const btn = document.createElement("button");
      btn.setAttribute('style','display:flex;font-family: "Montserrat", sans-serif;font-weight: 700;font-size: 1.rem;width: 100%;height: 31px;border: 1px solid #D99191;background-color: transparent;border-radius: 8px;justify-content: center;align-items: center;cursor: pointer;color: red;');
      const btnText = document.createTextNode("Delete Dog Favorites");

      img.src = dog.image.url;
      img.width = 150;
      btn.appendChild(btnText);
      btn.onclick = () => deleteFavoriteDogs(dog.id);
      article.appendChild(img);
      article.appendChild(btn);

      section.appendChild(article);
    });
  }
};
//? SAVE FAVORITE DOGS
const saveFavoriteDogs = async (id) => {
  const res = await fetch(API_URL_FAVORITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_id: id
    }),
  });
  const data = await res.json();

  console.log("guardar");
  console.log(res);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log("dog saved in favorites");
    favoriteDogs();
  }
};

//* DELETE_FAVORITE_DOGS
const deleteFavoriteDogs = async (id) => {
  const res = await fetch(API_URL_FAVORITES__DELETE(id), {
    method: "DELETE",
  });
  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log("dog deleted of favorites");
    favoriteDogs();
  }
};

myDog();
favoriteDogs();

const myButton = document.querySelector("button");
myButton.onClick = myDog;
