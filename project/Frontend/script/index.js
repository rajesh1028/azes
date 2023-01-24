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

// welcome
let user_name = localStorage.getItem("user-name");
if (user_name) {
    let welcome = document.querySelector("#welcome")
    welcome.innerHTML = `
    <h2>Welcome back! MR/MS : ${user_name} </h2>
    `
} else {
    let welcome = document.querySelector("#welcome")
    welcome.innerHTML = `
    <h2>Login to continue shopping</h2>
    `
}


// login

let form = document.querySelector("form")
form.addEventListener("submit", getData)

function getData(event) {
    event.preventDefault();

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
            let url = "http://localhost:8800";
            console.log(obj);
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

// admin page

let admin = document.querySelector("#admin");
admin.addEventListener("click",()=>{
    window.location.href="admin-login.html";
})
