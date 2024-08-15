
let userList = document.getElementById("user-list")
let reposList = document.getElementById("repos-list")
let form = document.getElementById("github-form")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let search = document.getElementById("search").value
    const url = `https://api.github.com/search/users?q=${search}`
    console.log(url)
    fetch(url)
    .then(function (response) {
        return response.json();
      })
      .then(users => postUser(users))
  })
  function postUser(users){
    console.log(users.items)
    users.items.forEach(user => {

        let newUserItem = document.createElement("li")
        newUserItem.textContent = user.login
        userList.append(newUserItem)

        let newUserUrl = document.createElement("li")
        newUserUrl = user.url
        userList.append(newUserUrl)

        let newUserImg = document.createElement("img")
        newUserImg.src = user.avatar_url
        userList.append(newUserImg)

        newUserImg.addEventListener("click", (e) => {
            fetch(`https://api.github.com/users/${user.login}/repos`)
            .then(function (response) {
                return response.json()
            })
            .then(repos => postRepos(repos))
        })
    })
}

// attach event listener to the whole <ul> via the ID items to then show the user repos    

function postRepos(repos) {
    const reposList = document.getElementById("repos-list")
    repos.forEach(repo => {
        const userRepos = document.createElement("li")
        reposList.append(userRepos)
        userRepos.textContent = repo.full_name
        console.log(repo.full_name)
    })
}