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
        let data = await fetch(`${url}cart`, {
            headers: {
                "authorization": localStorage.getItem("token")
            }
        })
        userData = await data.json();
        console.log(userData)
        displayCard(userData);
        // total cart value
        let sum = 0;
        userData.forEach((elem, i) => {
            sum += elem.price;
        })
        totalCartValue(sum)
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
        <button class="butt" value="${elem._id}">Delete</button>
        `
        container.append(div);
    })

    let buttons = document.querySelectorAll(".butt");
    for (let button of buttons) {
        button.addEventListener("click", () => {
            removeCart(button.value);
        })
    }
}

// remove from cart

async function removeCart(id) {
    try {
        let res = await fetch(`http://localhost:8800/cart/delete/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token")
            }
        })
        let out = res.json();
        alert("Item removed from cart");
        //console.log(out);
    } catch (error) {
        console.log(error)
    }

    window.location.reload();
}

// homepage, women, men, cart

let access = localStorage.getItem("token");
if (access) {
    let women = document.querySelector("#women")
    women.addEventListener("click", () => {
        window.location.href = "womenclothing.html"
    })

    let men = document.querySelector("#men")
    men.addEventListener("click", () => {
        window.location.href = "menclothing.html"
    })

    let cart = document.querySelector("#cart")
    cart.addEventListener("click", () => {
        window.location.href = "cart.html"
    })
} else {
    let women = document.querySelector("#women")
    women.addEventListener("click", () => {
        alert("Login to continue");
    })

    let men = document.querySelector("#men")
    men.addEventListener("click", () => {
        alert("Login to continue");
    })

    let cart = document.querySelector("#cart")
    cart.addEventListener("click", () => {
        alert("Login to continue");
    })
}

let home = document.querySelector("#brand")
home.addEventListener("click", () => {
    window.location.href = "index.html"
})



//  register

let register = document.querySelector("#register")
register.addEventListener("click", () => {
    window.location.href = "register.html";
})

// total cart value

function totalCartValue(sum) {
    let total = document.getElementById("total")
    total.innerHTML = `
    <h2>Total Cart Value: $ ${sum}</h2>`
}

// logout

if (localStorage.getItem("token")) {
    let logout = document.querySelector("#logout")
    logout.addEventListener("click", () => {
        localStorage.setItem("token", "");
        localStorage.setItem("user-name", "");
        alert("User logged out successfully");
        window.location.href="index.html";
    })
} else {
    let logout = document.querySelector("#logout")
    logout.addEventListener("click", () => {
        alert("User has been logged out already");
    })
}