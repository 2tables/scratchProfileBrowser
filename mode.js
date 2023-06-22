let check = document.querySelector(".enter");
if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
    document.querySelector("body").style.background = "black";
    document.querySelector("body").style.color = "white";
    if(check !== null){
        document.querySelector(".enter").style.background = "linear-gradient(black 50%, rgba(0,0,0,0))";
    }
} else {
    document.querySelector("body").style.background = "white";
    document.querySelector("body").style.color = "black";
    if(check !== null){
        document.querySelector(".enter").style.background = "linear-gradient(white 50%, rgba(0,0,0,0))";
    }
}