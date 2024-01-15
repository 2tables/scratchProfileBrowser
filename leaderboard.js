 function checkIfImageExists(url, callback) {
    img = new Image();
    img.src = url;

    if (img.complete) {
      callback(true);
    } else {
      img.onload = () => {
        callback(true);
      };
      
      img.onerror = () => {
        callback(false);
      };
    }
  }

users = [];
async function getPage(page){
    for(i = 0; i < 100; i++){
        users[i] = await document.createElement("span")
        users[i].className = await "user";
        users[i].innerHTML = await `<span><img src="../assets/not_found.png">#${(i + 1) + (page * 100)} - user</span>0`;
        document.getElementById("users").appendChild(users[i]);
    }
    res = await fetch(`https://scratchdb.lefty.one/v3/user/rank/global/followers/${page}`);
    data = await res.json()
    console.log(data);
    for(i = 0; i < data.length; i++){
        checkIfImageExists(`https://cdn2.scratch.mit.edu/get_image/user/${data[i].id}_90x90.png`, (exists) => {
      if (exists) {
        users[i].innerHTML = await `<span><img src="https://cdn2.scratch.mit.edu/get_image/user/${data[i].id}_90x90.png">#${(i + 1) + (page * 100)} - ${data[i].username}</span>${data[i].statistics.followers.toLocaleString('en-US')}`;
      } else {
        users[i].innerHTML = await `<span><img src="../assets/not_found.png">#${(i + 1) + (page * 100)} - ${data[i].username}</span>${data[i].statistics.followers.toLocaleString('en-US')}`;
        }
        });
    }
}
index = 0;
getPage(index);

window.onscroll = function(){
    if(window.scrollY + window.innerHeight >= document.body.scrollHeight){
        console.log("updating");
        index++;
        getPage(index);
    }
};
