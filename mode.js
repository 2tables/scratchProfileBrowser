if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
    document.querySelector("body").style.background = "black";
    document.querySelector("body").style.color = "white";
    document.querySelector(".header").style.background = "black";
} else {
    document.querySelector("body").style.background = "white";
    document.querySelector("body").style.color = "black";
    document.querySelector(".header").style.background = "white";
}