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

let form = document.querySelector("#form")
form.addEventListener("submit", getData)

function getData(event) {
    event.preventDefault();

    let obj = {
        email: form.mail.value,
        password: form.password.value
    }

    console.log(obj);

    let flag = true;
    if (obj.email && obj.password.length>4) {
        flag = true;
    } else {
        flag = false;
    }

    if (flag) {
        async function post(){
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
                console.log(data);
                console.log("Logged in");

                setTimeout(()=>{
                    window.location.href="index.html"
                },2000);


            } catch (error) {
                console.log(error);
            }
        }
        
        post();

    }else{
        alert("Enter all the fields")
    }


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
register.addEventListener("click",()=>{
    window.location.href="register.html";
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