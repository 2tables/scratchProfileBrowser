const input = document.getElementById("UsernameInput")
function redirect(value){
    window.location.href = window.location.href.split("pages/leaderboard.html")[0] + "index.html?u=" + value;
}