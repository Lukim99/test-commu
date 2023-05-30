document.getElementById('writeButton').addEventListener('click', function() {
  window.location.href = 'write.html';
});

function renderPosts() {
  var postList = document.getElementById('postList');
  postList.innerHTML = '';
  
  var posts = getSavedPosts();
  
  posts.forEach(function(post, index) {
    var postElement = document.createElement('div');
    postElement.classList.add('post');
    
    var titleElement = document.createElement('div');
    titleElement.classList.add('title');
    titleElement.innerText = post.title;
    titleElement.setAttribute('data-index', index);
    titleElement.addEventListener('click', viewPost);
    
    var detailsElement = document.createElement('div');
    detailsElement.innerText = '작성자: ' + post.nickname + ' | 작성일자: ' + post.date + ' | 조회수: ' + post.views;
    
    postElement.appendChild(titleElement);
    postElement.appendChild(detailsElement);
    
    postList.appendChild(postElement);
  });
}

function viewPost(event) {
  var index = event.target.getAttribute('data-index');
  var posts = getSavedPosts();
  var post = posts[index];
  
  localStorage.setItem('currentPost', JSON.stringify(post));
  window.location.href = 'post.html';
}

renderPosts();
