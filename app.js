function getGitHubUser(e) {
  e.preventDefault();

  const username = document.getElementById("input").value.trim();
  const errElem = document.getElementById("err");
  const infoElem = document.getElementById("user-info");

  // Reset old messages
  errElem.style.display = 'none';
  errElem.innerHTML = '';
  infoElem.innerHTML = '';

  if (!username) {
    errElem.innerHTML = 'Please enter a username';
    errElem.style.display = 'block';

    setTimeout(() => {
      errElem.style.display = 'none';
      errElem.innerHTML = '';
    }, 1000);
    return;
  }

  fetch(`https://api.github.com/users/${username}`)
    .then(res => {
      if (!res.ok) {
        throw new Error("User not found");
      }
      return res.json();
    })
    .then(data => {
      infoElem.innerHTML = `
        
        <div id="left">
            <div id="user-info-left">

                <div id="image">   
                <img id="avatar" src="${data.avatar_url}" alt="not available" />
                </div>

                <h2 id="name">Name: ${data.name || "N/A"}</h2>

                <p id="repos">Repos: ${data.public_repos || "N/A"}</p>
                <p id="followers">Followers: ${data.followers}</p>
                <p id="following">Following: ${data.following}</p>
            </div>

            <div id="user-info-right">
                <p id="bio">Bio: ${data.bio || "N/A"}</p>
                <p id="location">Location: ${data.location || "N/A"}</p>
                <p id="blog">Blog: ${data.blog || "N/A"}</p>
                <p id="twitter">Twitter: ${data.twitter_username || "N/A"}</p>
            </div>
        </div> 
      `;
    })
    .catch(err => {
      errElem.innerHTML = 'Please enter a valid username';
      errElem.style.display = 'block';

      // Auto-hide error after 3 seconds
      setTimeout(() => {
        errElem.style.display = 'none';
        errElem.innerHTML = '';
      }, 1000);
    });
}

// Add event listener
document.getElementById("btn").addEventListener("click", getGitHubUser);
