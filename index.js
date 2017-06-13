function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.send()
}

function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map((r) => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Commit Details</a></li>').join('')} </ul>`
  document.getElementById("repositories").innerHTML = repoList
}


function getCommits(repoData) {
  const name = repoData.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener('load', showCommits)
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}

function showCommits(event, data) {
  var commits = JSON.parse(this.responseText)
  console.log(commits)
  const commitsList = `<ul>${commits.map((c) => '<li><strong>' + c.author.login + '</strong> - ' + c.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}
