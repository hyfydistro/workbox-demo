console.log("Hello world!");

const userList = document.querySelector(".users") as HTMLElement;
const photoList = document.querySelector(".photo") as HTMLElement;

interface JsonUserInterface {
  name: string;
  email?: string;
}

interface JsonPhotoInterface {
  url: string;
}

fetch(/* webpackPreload: true */"https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    if (!response.ok) throw Error("Not OK!");
    return response.json();
  })
  .then((json) => {
    const frag = document.createDocumentFragment();
    json.forEach((currentUser: JsonUserInterface) => {
      const elem = document.createElement("div");
      elem.textContent = currentUser.name;
      frag.appendChild(elem);
    });
    userList.appendChild(frag);
  })
  .catch((err) => console.log("ERR :", err));

fetch("https://jsonplaceholder.typicode.com/photos")
  .then((response) => {
    if (!response.ok) throw Error("Photo: Not OK!");
    return response.json();
  })
  .then((json) => {
    const frag = document.createDocumentFragment();

    for (let i: number = 0; i < 10; i++) {
      // json.forEach((currentPhoto: JsonPhotoInterface) => {
      const elem = document.createElement("img");
      elem.src = json[i].url;
      frag.appendChild(elem);
      // });
    }

    console.log(frag);
    photoList.appendChild(frag);
  })
  .catch((err) => console.log("ERR :", err));
