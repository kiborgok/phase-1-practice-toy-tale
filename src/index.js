let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector(".add-toy-form");
  const toysDiv = document.getElementById("toy-collection");


  function createToyCard(toy) {
    const container = document.createElement("div");
    container.setAttribute("class", "card");
    const h2 = document.createElement("h2");
    h2.textContent = toy.name;
    const image = document.createElement("img");
    image.setAttribute("src", toy.image);
    image.classList.add("toy-avatar");
    const p = document.createElement("p");
    p.textContent = toy.likes;
    const btn = document.createElement("button");
    btn.setAttribute("id", toy.id);
    btn.setAttribute("class", "like-btn");
    btn.textContent = "Like";
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      let likes = parseInt(e.target.previousElementSibling.textContent)
      console.log(likes + 1)
      likes += 1
      e.target.previousElementSibling.textContent = likes;
      fetch(`http://localhost:3000/toys/${e.target.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ "likes": likes }),
      })
      
    });
    container.appendChild(h2);
    container.appendChild(image);
    container.appendChild(p);
    container.appendChild(btn);
    toysDiv.appendChild(container);
  }

  function getFormData() {
    const name = form.name.value;
    const image = form.image.value;
    return { name, image };
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { name, image } = getFormData();
    postFormData(name, image, (likes = 0));
  });

  function getToys() {
    return fetch(" http://localhost:3000/toys")
      .then((res) => res.json())
      .then((toys) => {
        return toys;
      });
  }
  function displayToys() {
    getToys().then((toys) => {
      toys.forEach((toy) => createToyCard(toy));
    });
  }

  displayToys();

  function postFormData(name, image, likes) {
    fetch(" http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name, image, likes }),
    });
  }

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
