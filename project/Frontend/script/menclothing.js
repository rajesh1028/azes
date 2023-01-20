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
        let data = await fetch(`${url}men`,{
            headers:{
                "authorization":localStorage.getItem("token")
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
    data.forEach((elem,i)=>{
        let div = document.createElement("div");
        div.innerHTML=`
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