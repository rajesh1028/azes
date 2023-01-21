// slide
let count2 = 0;
document.querySelector("#ltexarrow").onclick = () => {
    console.log("clicked");

    if (count2 == 0) {
        return;
    }
    count2--;
    let val = count2 * 260;
    document.querySelector("#explore_container").style.transform = `translateX(-${val}px)`;
};

document.querySelector("#rtexarrow").onclick = () => {
    if (count2 > 4) {
        return;
    }
    count2++;
    let val = count2 * 260;
    document.querySelector("#explore_container").style.transform = `translateX(-${val}px)`;
};

// display

let container = document.querySelector("#display");
let userData = null;
async function getData() {
    let url = "http://localhost:8800/";
    try {
        let data = await fetch(`${url}women`, {
            headers: {
                "authorization": localStorage.getItem("token")
            }
        })
        userData = await data.json();
        console.log(userData)
        displayCard(userData);
    } catch (error) {
        console.log(error);
    }
}

getData()

function displayCard(data) {
    container.innerHTML = null;
    data.forEach((elem, i) => {
        let div = document.createElement("div");
        div.innerHTML = `
        <img width="100%" src=${elem.avatar} alt=${elem.name}/>
        <h3>Name : ${elem.name}</h3>
        <p>Price : $ ${elem.price}</p>
        <p>Rating : ${elem.rating}</p>
        <button>Add to cart</button>
        `
        container.append(div);
    })
}

// homepage, women, men

let home = document.querySelector("#brand")
home.addEventListener("click", () => {
    window.location.href = "index.html"
})

let women = document.querySelector("#women")
women.addEventListener("click", () => {
    window.location.href = "womenclothing.html"
})

let men = document.querySelector("#men")
men.addEventListener("click", () => {
    window.location.href = "menclothing.html"
})

// sort

document.querySelector("#sort").addEventListener("change", sort);
document.querySelector("#less_than_50").addEventListener("change", sort);
document.querySelector("#less_than_80").addEventListener("change", sort);
document.querySelector("#less_than_100").addEventListener("change", sort);
document.querySelector("#greater_than_4").addEventListener("change", sort);
document.querySelector("#greater_than_7").addEventListener("change", sort);
document.querySelector("#greater_than_9").addEventListener("change", sort);

function sort() {
    let data = document.querySelector("#sort").value;
    if (data == "P-LTH") {
        userData.sort((a, b) => a.price - b.price);
    } else if (data == "P-HTL") {
        userData.sort((a, b) => b.price - a.price);
    } else if (data == "R-LTH") {
        userData.sort((a, b) => a.rating - b.rating);
    } else {
        userData.sort((a, b) => b.rating - a.rating)
    }
    displayCard(userData);
    console.log(userData);

    // filter

    let checkbox1 = document.querySelector("#less_than_50");
    if (checkbox1.checked) {
        let data = userData.filter((elem, i) => {
            return elem.price < 50;
        })
        displayCard(data);
    }

    let checkbox2 = document.querySelector("#less_than_80");
    if (checkbox2.checked) {
        let data = userData.filter((elem, i) => {
            return elem.price < 80;
        })
        displayCard(data);
    }

    let checkbox3 = document.querySelector("#less_than_100");
    if (checkbox3.checked) {
        let data = userData.filter((elem, i) => {
            return elem.price < 100;
        })
        displayCard(data);
    }

    // filter2

    let box1 = document.querySelector("#greater_than_4");
    if (box1.checked) {
        let data = userData.filter((elem, i) => {
            return elem.rating > 4;
        })
        displayCard(data);
    }

    let box2 = document.querySelector("#greater_than_7");
    if (box2.checked) {
        let data = userData.filter((elem, i) => {
            return elem.rating > 7;
        })
        displayCard(data);
    }

    let box3 = document.querySelector("#greater_than_9");
    if (box3.checked) {
        let data = userData.filter((elem, i) => {
            return elem.rating > 9;
        })
        displayCard(data);
    }
}