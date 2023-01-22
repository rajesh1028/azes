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

let form = document.querySelector("form")
form.addEventListener("submit", getData)

function getData(event) {
    event.preventDefault();

    let obj = {
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
        age: form.age.value
    }

    let flag = true;
    if (obj.name && obj.email && obj.password && obj.age) {
        flag = true;
    } else {
        flag = false;
    }

    if (flag) {
        async function post(){
            let url = "http://localhost:8800";
            console.log(obj);
            try {
                let res = await fetch(`${url}/users/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                })
                let data = await res.json();
                console.log(data);
                console.log("registered");

                setTimeout(()=>{
                    window.location.href="login.html"
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


// // homepage, women, men, cart

let home = document.querySelector("#brand")
home.addEventListener("click",()=>{
    window.location.href="index.html"
})

let women = document.querySelector("#women")
women.addEventListener("click",()=>{
    window.location.href="womenclothing.html"
})

let men = document.querySelector("#men")
men.addEventListener("click",()=>{
    window.location.href="menclothing.html"
})

let cart = document.querySelector("#cart")
cart.addEventListener("click", () => {
    window.location.href = "cart.html"
})

// register

let register = document.querySelector("#register")
register.addEventListener("click",()=>{
    window.location.href="register.html";
})