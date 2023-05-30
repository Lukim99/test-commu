document.getElementById('postForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  var nickname = document.getElementById('nickname').value;
  var password = document.getElementById('password').value;
  var title = document.getElementById('title').value;
  var content = document.getElementById('content').value;
  
  var date = new Date().toLocaleString();
  
  var post = {
    nickname: nickname,
    password: password,
    title: title,
    content: content,
    date: date,
    views: 0
  };
  
  savePost(post);
  clearPostForm();
});

function savePost(post) {
  var posts = getSavedPosts();
  posts.push(post);
  localStorage.setItem('posts', JSON.stringify(posts));
}

function getSavedPosts() {
  var postsString = localStorage.getItem('posts');
  var posts = JSON.parse(postsString) || [];
  return posts;
}

function clearPostForm() {
  document.getElementById('nickname').value = '';
  document.getElementById('password').value = '';
  document.getElementById('title').value = '';
  document.getElementById('content').value = '';
}

