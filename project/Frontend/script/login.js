let form = document.querySelector("form")
form.addEventListener("submit", getData)

function getData(event) {
    event.preventDefault();

    let obj = {
        email: form.mail.value,
        password: form.password.value
    }

    let flag = true;
    if (obj.email && obj.password) {
        flag = true;
    } else {
        flag = false;
    }

    if (flag) {
        async function post(){
            let url = "http://localhost:8800";
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
                localStorage.setItem("token",data.token)
                console.log("logged in");

                let user = await fetch(`${url}/users`);
                let userData = await user.json();

                let result = userData.filter((elem,i)=>{
                    return obj.email==elem.email;
                })

                localStorage.setItem("user-name",result[0].name)

                setTimeout(()=>{
                    window.location.href="index.html"
                },2000)

            } catch (error) {
                console.log(error);
                console.log("Error in logging in");
            }
        }
        
        post();

    }else{
        alert("Enter all the details");
    }


}


// homepage, women, men

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