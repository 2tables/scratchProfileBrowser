keyword = "followers";
users = [];

function clear(){
    document.getElementById("users").innerHTML = "";
}

async function getPage(page, type){
    for(i = 0; i < 100; i++){
        users[i] = await document.createElement("span")
        users[i].className = await "user";
        users[i].innerHTML = await `<span><img src="../assets/not_found.png">#${(i + 1) + (page * 100)} - user</span>0`;
        document.getElementById("users").appendChild(users[i]);
    }
    res = await fetch(`https://scratchdb.lefty.one/v3/user/rank/global/${type}/${page}`);
    data = await res.json()
    console.log(data);
    for(i = 0; i < data.length; i++){
        users[i].innerHTML = await `<span><img src="https://cdn2.scratch.mit.edu/get_image/user/${data[i].id}_90x90.png">#${(i + 1) + (page * 100)} - ${data[i].username}</span>${data[i].statistics[type].toLocaleString('en-US')}`;
    }
}

function changeType(type){
    clear();
    document.getElementById(keyword).classList.remove("active")
    keyword = type;
    document.getElementById(keyword).classList.add("active")
    getPage(index, keyword);
    if(keyword == "followers"){
        document.getElementById("users").style.borderRadius = "0 10px 10px 10px";
    } else if (keyword == "views"){
        document.getElementById("users").style.borderRadius = "10px 0 10px 10px";
    } else {
        document.getElementById("users").style.borderRadius = "10px";
    }
}

index = 0;
document.getElementById(keyword).classList.add("active")
changeType("followers")
getPage(index, keyword);

window.onscroll = function(){
    if(window.scrollY + window.innerHeight >= document.body.scrollHeight){
        console.log("updating");
        index++;
        getPage(index, keyword);
    }
};
