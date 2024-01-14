async function getPage(page){
    res = await fetch(`https://scratchdb.lefty.one/v3/user/rank/global/followers/${page}`);
    data = await res.json()
    console.log(data);
    for(i = 0; i < data.length; i++){
        user = await document.createElement("span");
        user.className = await "user";
        user.innerHTML = await `<span><img src="https://cdn2.scratch.mit.edu/get_image/user/${data[i].id}_90x90.png">#${(i + 1) + (page * 100)} - ${data[i].username}</span>${data[i].statistics.followers.toLocaleString('en-US')}`;
        document.getElementById("users").appendChild(user);
    }
}
index = 0;
getPage(index);

window.onscroll = function(){
    if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
        console.log("updating");
        index++;
        getPage(index);
    }
};
