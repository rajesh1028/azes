document, addEventListener("click", e => {
    const isDropdownButton = e.target.matches("[data-dropdown-button]")
    if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) {
        return
    }

    let currentDropdown
    if (isDropdownButton) {
        currentDropdown = e.target.closest("[data-dropdown]")
        currentDropdown.classList.toggle('active')
    }

    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
        if (dropdown === currentDropdown) return
        dropdown.classList.remove('active')
    })
})

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

// login

let form = document.querySelector("form")
form.addEventListener("submit",(e)=>{
    e.preventDefault();

    let obj = {
        email: form.email.value,
        password: form.password.value
    }

    let flag = true;
    if (obj.email && obj.password) {
        flag = true;
    } else {
        flag = false;
    }

    if (flag) {
        async function post() {
            let url = "https://busy-clam-drawers.cyclic.app";
            //console.log(obj);
            try {
                let res = await fetch(`${url}/users/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                })
                let data = await res.json();
                //console.log(data);
                localStorage.setItem("token", data.token)
                console.log("logged in");

                let user = await fetch(`${url}/users`);
                let userData = await user.json();

                let result = userData.filter((elem, i) => {
                    return obj.email == elem.email;
                })

                localStorage.setItem("user-name", result[0].name)

                setTimeout(() => {
                    window.location.href = "index.html"
                }, 2000)

            } catch (error) {
                console.log(error);
                console.log("Error in logging in");
            }
        }

        post();

    } else {
        alert("Enter all the details");
    }

})

// display

let container = document.querySelector("#display");
let userData = null;
async function getData() {
    let url = "https://busy-clam-drawers.cyclic.app/";
    try {
        let data = await fetch(`${url}men`, {
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
        <button class="butt" value=${elem._id}>Add to cart</button>
        `
        container.append(div);
    })

    let buttons = document.querySelectorAll(".butt");
    for (let button of buttons) {
        button.addEventListener("click", () => {
            addToCart(button.value);
        })
    }

}

// add to cart

async function addToCart(id) {
    let data = userData.filter((elem, i) => {
        return elem._id == id;
    })
    //console.log(data[0]);
    try {
        let res = await fetch("https://busy-clam-drawers.cyclic.app/cart/create",{
            method:"POST",
            headers:{
                "content-type":"application/json",
                "authorization":localStorage.getItem("token")
            },
            body:JSON.stringify(data[0])
        })
        let out = res.json();
        //console.log(out);
    } catch (error) {
        console.log(error)
    }
}



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


//  register

let register = document.querySelector("#register")
register.addEventListener("click", () => {
    window.location.href = "register.html";
})


// logout

if(localStorage.getItem("token")){
    let logout = document.querySelector("#logout")
    logout.addEventListener("click", () => {
        localStorage.setItem("token", "");
        localStorage.setItem("user-name", "");
        alert("User logged out successfully");
        window.location.href="index.html";
    })
}else{
    let logout = document.querySelector("#logout")
    logout.addEventListener("click", () => {
        alert("User has been logged out already");
    })
}