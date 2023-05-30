// index.html
document.addEventListener('DOMContentLoaded', function() {
  renderPosts();
});

// post.html
document.addEventListener('DOMContentLoaded', function() {
  var urlParams = new URLSearchParams(window.location.search);
  var postId = urlParams.get('id');
  if (postId) {
    getPost(postId)
      .then(post => {
        renderPost(post);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }
});

function getPosts() {
  const headers = {
    'Authorization': 'Bearer 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'
  };

  return axios.get('https://api.github.com/repos/Lukim99/test-commu/contents/posts', {
    headers: headers
  })
  .then(response => {
    return response.data.map(item => {
      const content = atob(item.content);
      const post = JSON.parse(content);
      post.url = item.html_url;
      return post;
    });
  })
  .catch(error => {
    console.error('Error fetching posts:', error);
    return [];
  });
}

function renderPosts() {
  var postList = document.getElementById('postList');
  postList.innerHTML = '';

  getPosts()
    .then(posts => {
      posts.forEach(function(post) {
        var postElement = document.createElement('div');
        postElement.classList.add('post');

        var titleElement = document.createElement('div');
        titleElement.classList.add('title');
        titleElement.innerText = post.title;
        titleElement.setAttribute('data-url', post.url);
        titleElement.addEventListener('click', viewPost);

        var detailsElement = document.createElement('div');
        detailsElement.innerText = '작성자: ' + post.nickname + ' | 작성일자: ' + post.date + ' | 조회수: ' + post.views;

        postElement.appendChild(titleElement);
        postElement.appendChild(detailsElement);

        postList.appendChild(postElement);
      });
    });
}

function viewPost(event) {
  var url = event.target.getAttribute('data-url');
  window.location.href = url;
}

function getPost(postId) {
  const headers = {
    'Authorization': 'Bearer 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'
  };

  return axios.get('https://api.github.com/repos/Lukim99/test-commu/contents/posts/' + postId + '.json', {
    headers: headers
  })
  .then(response => {
    const content = atob(response.data.content);
    const post = JSON.parse(content);
    return post;
  })
  .catch(error => {
    console.error('Error fetching post:', error);
    return null;
  });
}

function renderPost(post) {
  var postTitle = document.getElementById('postTitle');
  var postDetails = document.getElementById('postDetails');
  var postContent = document.getElementById('postContent');

  postTitle.innerText = post.title;
  postDetails.innerText = '작성자: ' + post.nickname + ' | 작성일자: ' + post.date + ' | 조회수: ' + post.views;
  postContent.innerText = post.content;
}

// write.html
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

  savePost(post)
    .then(response => {
      console.log('Post created successfully:', response.data);
      window.location.href = 'index.html';
    })
    .catch(error => {
      console.error('Error creating post:', error);
    });
});

function savePost(post) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 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'
  };

  const content = JSON.stringify(post);
  const encodedContent = btoa(content);

  return axios.put('https://api.github.com/repos/Lukim99/test-commu/contents/posts/' + Date.now() + '.json', {
    message: 'Create new post',
    content: encodedContent
  }, {
    headers: headers
  });
}
