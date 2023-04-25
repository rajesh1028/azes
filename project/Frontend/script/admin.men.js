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
        <button class="butt" value="${elem._id}">Delete</button>
        `
        container.append(div);
    })

    let buttons = document.querySelectorAll(".butt");
    for (let button of buttons) {
        button.addEventListener("click", () => {
            removeData(button.value);
        })
    }
}

// remove from cart

async function removeData(id) {
    try {
        let res = await fetch(`https://busy-clam-drawers.cyclic.app/men/delete/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token")
            }
        })
        let out = res.json();
        //console.log(out);
    } catch (error) {
        console.log(error)
    }

    window.location.reload();
}

// add data

let post=document.getElementById("insert");
post.addEventListener("submit",addData);

async function addData(e) {
    e.preventDefault();
    let form = document.querySelector("#insert");
    let obj={
        name:form.name.value,
        avatar:form.avatar.value,
        price:form.price.value,
        rating:form.rating.value
    }
    console.log(obj);

    let url = "https://busy-clam-drawers.cyclic.app/";
    try {
        let data = await fetch(`${url}men/create`, {
            method:"POST",
            headers: {
                "content-type":"application/json",
                "authorization": localStorage.getItem("token")
            },
            body:JSON.stringify(obj)
        })

        let res = data.json();
        // console.log(res);
        
    } catch (error) {
        console.log(error);
    }

    window.location.reload();
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