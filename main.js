function getElementById(id){
    return document.getElementById(id);
}
lines = ["Why did you think that would work?", "Did you really think that would work?", "That...uhh...that's blank.", "No.", "Why? Just why?"];
input = getElementById("UsernameInput");
const scratchBio = getElementById("scratchBio");
const scratchStatus = getElementById("scratchStatus");
const userDisplay = getElementById("UserDisplay");
joined = [""];
joined_month = "";
subcounts = '';
badge = "";
const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const urlParams = new URLSearchParams(window.location.search);
if(urlParams.get("dev") !== "true"){
    console.log("Hello.\nThis is the console.\nIt's used for developers to test out JavaScript scripts.\nIf someone told you to copy and paste something here, then it might not be a good idea to do so.\nThey might take your Scratch Account, remove all of your projects, or do much more.\nSo if you don't know what you're doing here, you should probably close this window without doing anything.\nIf you don't want this message to appear, type devMode(); and hit Enter.\n\nBest regards,\n-2tables");
}
function devMode(){
    if(urlParams.get("dev") === null){
        urlParams.append("dev", "true");
    } else {
        if(urlParams.get("dev") == "true"){
            urlParams.delete("dev");
        } else {
            urlParams.set("dev", "true");
        }
    }
    window.location.href = window.location.href.split('?')[0] + "?" + urlParams.toString();
}
const username_parameter = urlParams.get('u');
document.onkeydown = function (e) {
    if(e.key == "Enter"){
        if(document.activeElement == input){
            getScratchUser(input.value);
        }
    }
};
function getScratchUser(username){
    username = username.replace(/" "/g, "")
    if(username_parameter === null){
        urlParams.delete("u");
	    urlParams.append("u", username);
        window.location.href = window.location.href.split('?')[0] + "?" + urlParams.toString();
    } else if (username_parameter === ""){
        if(input.value === ""){
            userDisplay.innerHTML = lines[Math.floor(Math.random() * lines.length)] + "<br><div class=\"joined\">Search for a user using the input at the top.</div>";
            return;
        } else {
            urlParams.delete("u");
	    urlParams.append("u", username);
            window.location.href = window.location.href.split('?')[0] + "?" + urlParams.toString();
        }
    } else if (username_parameter !== username){
	urlParams.delete("u");
	    urlParams.append("u", username);
        window.location.href = window.location.href.split('?')[0] + "?" + urlParams.toString();
    }
    getElementById("allInfo").style.visibility = "visible";
    input.value = username;
    fetch("https://scratchdb.lefty.one/v3/user/info/" + username)
        .catch((error) => {
            getElementById('error').innerText = 'ScratchDB is currently down.';
            return;
        })
        .then(res => res.json()).then(data => {
        if(urlParams.get("dev") == "true"){
            console.log(data);
        }
        document.querySelector("link").setAttribute("href", "https://cdn2.scratch.mit.edu/get_image/user/" + data.id + "_32x32.png");
        if(data.error !== undefined){
            getElementById("error").innerHTML = "Error: " + data.error;
            getElementById("error").style.visibility = "visible";
            return null;
        } else {
            getElementById("error").innerHTML = "No errors yet";
            getElementById("error").style.visibility = "hidden";
        }
        document.querySelector("title").innerHTML = data.username + " - Scratch Profile Browser";
        if(data.statistics !== undefined){
            if(data.statistics.followers === null){
                data.statistics.followers = 0;
            }
            if(data.statistics.following === null){
                data.statistics.following = 0;
            }
            getElementById("followers").innerHTML = data.statistics.followers;
            getElementById("following").innerHTML = data.statistics.following;
        }
        badge = "";
        if (data.school !== null){
            badge = badge + "<div class=\"emoji\" title=\"School profile\">&#127979;</div>";
            getElementById("school").innerHTML = "School of <a target=\"_blank\" href=\"https://scratch.mit.edu/classes/" + data.school + "\">" + data.school + "</a>";
        }
        if (data.status == "Teacher Account"){
            badge = badge + "<div class=\"emoji\" title=\"Teacher profile\">&#127891;</div>";
        }
        if (data.status == "Scratch Team"){
            badge = badge + "<div class=\"emoji\" title=\"Scratch Team\">&#128736;</div>";
        }
        userDisplay.innerHTML = "<img class=\"profile-picture\" src='https://cdn2.scratch.mit.edu/get_image/user/" + data.id + "_90x90.png'><br><h1><a class=\"username\" href='https://scratch.mit.edu/users/" + data.username + "' target='_blank'>" + data.username + badge + "</a></h1> #" + data.id;
        joined = data.joined.split("T")[0].split("-");
        getElementById("joined").innerHTML = data.status + "<br>Joined " + months[Number(joined[1]) - 1] + " " + Number(joined[2]) + ", " + Number(joined[0]);
        scratchBio.innerHTML = data.bio;
        scratchStatus.innerHTML = data.work;
    });
    fetch("https://scratchdb.lefty.one/v3/forum/user/info/" + username)
        .catch((error) => {
            getElementById('error').innerText = 'ScratchDB is currently down.';
            return;
        })
        .then(res => res.json()).then(data => {
        if(urlParams.get("dev") == "true"){
            console.log(data);
        }
        if(data.error !== undefined){
            return null;
        }
        if(data.signature === null){
            getElementById("signature").innerHTML = "No signature";
        } else {
            getElementById("signature").innerHTML = data.signature.replace(/src="/g, "src=\"https://").replace(/https:\/\/https/g, "https");
        }
        let i = 1;
        subcounts = '';
        while (i < Object.keys(data.counts).length){
            subcounts = subcounts + "<div class='sub-count'>" + "Posts in " + Object.keys(data.counts)[i] + ": " + data.counts[Object.keys(data.counts)[i]].count + "</div>";
            i = i + 1;
        }
        getElementById("counts").innerHTML = "Total Posts: " + data.counts.total.count + subcounts;
    });
    fetch("https://scratchdb.lefty.one/v2/project/info/user/" + username)
        .catch((error) => {
            getElementById('error').innerText = 'ScratchDB is currently down.';
            return;
        })
        .then(res => res.json()).then(data => {
            if(urlParams.get("dev") == "true"){
                console.log(data);
            }
        if(data.projects.length > 0){
            let latestProject = data.projects[data.projects.length - 1];
            getElementById("recentProject").innerHTML = "<img src=\"assets/icons/recent.svg\" class=\"icon\"><a href=\"https://scratch.mit.edu/projects/" + latestProject.info.scratch_id + "\" title=\"Original project page link\"target=\"_blank\">" + latestProject.info.title + "</a>";
            getElementById("recentFavorites").innerHTML = latestProject.favorites + " favorites";
            getElementById("recentLoves").innerHTML = latestProject.loves + " loves";
            getElementById("recentViews").innerHTML = latestProject.views + " views";
            let project_i = 0;
            let lovedProjectIndex = 0;
            while (project_i < data.projects.length){
                if(data.projects[project_i].loves > data.projects[lovedProjectIndex].loves){
                    lovedProjectIndex = project_i;
                }
                project_i = project_i + 1;
            }
            getElementById("lovedProject").innerHTML = "<img src=\"assets/icons/loves.svg\" class=\"icon\"><a href=\"https://scratch.mit.edu/projects/" + data.projects[lovedProjectIndex].info.scratch_id + "\" title=\"Original project page link\"target=\"_blank\">" + data.projects[lovedProjectIndex].info.title + "</a>";
            getElementById("lovedFavorites").innerHTML = data.projects[lovedProjectIndex].favorites + " favorites";
            getElementById("lovedLoves").innerHTML = "<b>" + data.projects[lovedProjectIndex].loves + " loves</b>";
            getElementById("lovedViews").innerHTML = data.projects[lovedProjectIndex].views + " views";
            project_i = 0;
            let favoritedProjectIndex = 0;
            while (project_i < data.projects.length){
                if(data.projects[project_i].favorites > data.projects[favoritedProjectIndex].favorites){
                    favoritedProjectIndex = project_i;
                }
                project_i = project_i + 1;
            }
            getElementById("favoritedProject").innerHTML = "<img src=\"assets/icons/favorites.svg\" class=\"icon\"><a href=\"https://scratch.mit.edu/projects/" + data.projects[favoritedProjectIndex].info.scratch_id + "\" title=\"Original project page link\"target=\"_blank\">" + data.projects[favoritedProjectIndex].info.title + "</a>";
            getElementById("favoritedFavorites").innerHTML = "<b>" + data.projects[favoritedProjectIndex].favorites + " favorites</b>";
            getElementById("favoritedLoves").innerHTML = data.projects[favoritedProjectIndex].loves + " loves";
            getElementById("favoritedViews").innerHTML = data.projects[favoritedProjectIndex].views + " views";
            project_i = 0;
            let viewedProjectIndex = 0;
            while (project_i < data.projects.length){
                if(data.projects[project_i].views > data.projects[viewedProjectIndex].views){
                    viewedProjectIndex = project_i;
                }
                project_i = project_i + 1;
            }
            getElementById("viewedProject").innerHTML = "<img src=\"assets/icons/views.svg\" class=\"icon\"><a href=\"https://scratch.mit.edu/projects/" + data.projects[viewedProjectIndex].info.scratch_id + "\" title=\"Original project page link\"target=\"_blank\">" + data.projects[viewedProjectIndex].info.title + "</a>";
            getElementById("viewedFavorites").innerHTML = data.projects[viewedProjectIndex].favorites + " favorites";
            getElementById("viewedLoves").innerHTML = data.projects[viewedProjectIndex].loves + " loves";
            getElementById("viewedViews").innerHTML = "<b>" + data.projects[viewedProjectIndex].views + " views</b>";
        } else {
            getElementById("project-text").innerHTML = "<h1>No projects by " + username + "</h1>";
        }
    });
    fetch("https://my-ocular.jeffalo.net/api/user/" + username)
        .catch((error) => {
            getElementById('error').innerText = getElementById('error').innerText + '\nocular is currently down.';
            return;
        })
        .then(res => res.json()).then(data => {
            if(urlParams.get("dev") == "true"){
                console.log(data);
            }
        if(data.error == undefined){
            getElementById("ocular").innerText = data.status;
            getElementById("ocular").innerHTML = document.getElementById("ocular").innerHTML + "<div class=\"ocular-color\" id=\"ocularColor\">";
            getElementById("ocularColor").style.background = data.color;
        }
    });
}
if(username_parameter !== null){
    if(username_parameter !== ""){
        getScratchUser(username_parameter);
    } else {
        userDisplay.innerHTML = lines[Math.floor(Math.random() * lines.length)] + "<br><div class=\"joined\">Search for a user, or type \"?u=\" and the username at the end of the URL</div>";
    }
}
