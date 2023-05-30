document.getElementById('postForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  var nickname = document.getElementById('nickname').value;
  var password = document.getElementById('password').value;
  var content = document.getElementById('content').value;
  
  var post = {
    nickname: nickname,
    password: password,
    content: content
  };
  
  savePost(post);
  clearForm();
});

function savePost(post) {
  var posts = getSavedPosts();
  posts.push(post);
  localStorage.setItem('posts', JSON.stringify(posts));
  
  renderPosts();
}

function getSavedPosts() {
  var postsString = localStorage.getItem('posts');
  var posts = JSON.parse(postsString) || [];
  return posts;
}

function renderPosts() {
  var posts = getSavedPosts();
  var postList = document.getElementById('postList');
  postList.innerHTML = '';
  
  posts.forEach(function(post) {
    var postElement = document.createElement('div');
    postElement.classList.add('post');
    
    var titleElement = document.createElement('div');
    titleElement.classList.add('title');
    titleElement.innerText = post.nickname;
    
    var contentElement = document.createElement('div');
    contentElement.classList.add('content');
    contentElement.innerText = post.content;
    
    postElement.appendChild(titleElement);
    postElement.appendChild(contentElement);
    
    postList.appendChild(postElement);
  });
}

function clearForm() {
  document.getElementById('nickname').value = '';
  document.getElementById('password').value = '';
  document.getElementById('content').value = '';
}

renderPosts();
