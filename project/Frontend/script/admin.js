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


// register

let form = document.getElementById("form")
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let obj = {
        name: form.name.value,
        email: form.email.value,
        password: form.password.value
    }

    async function post() {
        let url = "https://busy-clam-drawers.cyclic.app";
        console.log(obj);
        try {
            let res = await fetch(`${url}/admin/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
            let data = await res.json();
            // console.log(data);
            alert("registered");


        } catch (error) {
            console.log(error);
        }
        window.location.reload();
    }

    post();
})

// homepage, women, men, cart

let women = document.querySelector("#women")
women.addEventListener("click", () => {
    window.location.href = "admin.women.html"
})

let men = document.querySelector("#men")
men.addEventListener("click", () => {
    window.location.href = "admin.men.html"
})



let home = document.querySelector("#brand")
home.addEventListener("click", () => {
    window.location.href = "index.html"
})


// display

let container = document.querySelector("#display");
let userData = null;
async function getData() {
    let url = "https://busy-clam-drawers.cyclic.app/";
    try {
        let data = await fetch(`${url}admin`, {
            headers: {
                "authorization": localStorage.getItem("token")
            }
        })
        userData = await data.json();
        // console.log(userData)
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
        <h3>Name : ${elem.name}</h3>
        <h3>Email : $ ${elem.email}</h3>
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
        let res = await fetch(`https://busy-clam-drawers.cyclic.app/admin/delete/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token")
            }
        })
        let out = res.json();
    } catch (error) {
        console.log(error)
    }

    window.location.reload();
}


