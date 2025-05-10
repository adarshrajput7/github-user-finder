let userinp = document.querySelector("#username");
let button = document.querySelector("#btn");
let card = document.querySelector("#card");
// let error = document.querySelector("#error");
let popup = document.querySelector("#error-card");
let errpop = document.querySelector("#err-pop");
let disbtn = document.querySelector("#disbtn");
let rshow = document.querySelector("#container");
let data_show= document.querySelector("#data-show");




// function FatchUserProfile(username){
//     if(username.length > 0){
//         return fetch(`https://api.github.com/users/${username}`)
//         .then((raw) => {
//             if(!raw.ok){ throw new Error("User not found"); }
//             return raw.json();
//         });
//     }  else{
        
//     }
// }

function FatchUserProfile(username){

    return fetch(`https://api.github.com/users/${username}`)
    .then((raw) => {
        if(!raw.ok){ throw new Error("User not found"); }
        return raw.json();
    }).catch(err => {
        // error.innerHTML = 'Please enter a valid username';
        // error.style.display = 'block';
        card.innerHTML = '';

        popup.style.display = 'flex';
        errpop.innerHTML = 'Please Enter The Valid Username';
        rshow.innerHTML = '';
  
        // Auto-hide error after 3 seconds
        setTimeout(() => {
          error.style.display = 'none';
          error.innerHTML = '';
        }, 1000);
      });
}

function repos(username){
    
    return fetch(`https://api.github.com/users/${username}/repos?short=updated`).then((raw) => {
        if(!raw.ok){ throw new Error("Failed to fatch repos..."); }
        return raw.json();

    
    })

}


function createRepoCard(repo){
    console.log(repo);
    let data = ``;
    repo.forEach((el) => {

        const updated = new Date(el.created_at).toLocaleString('en-IN', {
            day: '2-digit',
            month: 'numeric',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        data += `
         <div id="cardrepo">
            <div id="top">
                <a href="${el.html_url}" target="_blank">${el.name}</a>
                <p id="rname">${el.language}</p>
            </div>
            <p id="desc">Desciption: <span>${el.description || "N/A"}</span></p>
            <div id="bottom">
                <p id="rname">Views: <span>${el.watchers}</span></p>
                <p id="rname">Created At: <span>${updated}</span></p>
                <p id="rme">Rating: <span>${el.stargazers_count}</span></p>
            </div>
        </div>`;
    });
    rshow.innerHTML = data;
}

function createCard(details){
    console.log(details);
   let data = `<div id="imgg"><img id="avatar" src="${details.avatar_url}" alt="User Avatar"></div>
        <div id="user-info">
            <div id="top">
                <h2 id="name">${details.name}</h2>
                <p id="username">@${details.login}</p>
                <p id="bio">${details.bio ? detail.bio : "N/A"}</p>
            </div>

            <div id="bottom">
                <p id="repos">Public Repositories: <span>${details.public_repos}</span></p>    
                <p id="followers">Followers: <span>${details.followers}</span></p>
                <p id="following">Following: <span>${details.following}</span></p>
                <p id="location">Location: <span>${details.location ? details.location : "N/A"}</span></p>
                <p id="company">Company: <span>${details.company ? details.company : "N/A"}</span></p>
                <p id="blog">Blog: <span>${details.blog ? details.blog : "N/A"}</span></p>
            </div>`;

            card.innerHTML = data;
}


button.addEventListener("click", function(){
    data_show.style.display = "block";
    let usernames = userinp.value.trim();
    if(usernames.length > 0){
        FatchUserProfile(usernames).then((data) => {
            createCard(data);
        })

        repos(usernames).then((data) => {
            console.log(data);
            createRepoCard(data);
        })
    }else{
        // alert("Please enter a username");
        // error.innerHTML = "Please enter a username";
            // error.style.display = "block";

        popup.style.display = 'flex';
        errpop.innerHTML = 'Please Enter The Username';
        card.innerHTML = '';
        rshow.innerHTML = '';
        setTimeout(() => {
            error.style.display = "none";
        }, 1000);
    }  
    
    

    //repos


})





popup.addEventListener("click", function(){
    
    popup.style.display = "none";
    errpop.innerHTML = '';
    data_show.style.display = "none";
})










































// FatchUserProfile("facebook").then(function(data){
//     console.log(data);
//     console.log(`Name: ${data.name} ${data.login}`);
//     console.log(`Bio: ${data.bio}`);    
//     console.log(data.bio);
//     console.log(data.location);
//     console.log(data.followers);
// })

