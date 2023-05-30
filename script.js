// index.html
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

function getPosts() {
  const headers = {
    'Authorization': 'Bearer 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'
  };

  return axios.get('https://api.github.com/repos/Lukim99/test-commu/contents/posts', {
    headers: headers
  })
    .then(response => {
      const posts = response.data.map(post => {
        const content = atob(post.content);
        const parsedContent = JSON.parse(content);
        return {
          title: parsedContent.title,
          nickname: parsedContent.nickname,
          date: parsedContent.date,
          views: parsedContent.views,
          url: post.html_url
        };
      });
      return posts;
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
      return [];
    });
}

// write.html
document.getElementById('postForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var nickname = document.getElementById('nickname').value;
  var password = document.getElementById('password').value;
  var title = document.getElementById('title').value;
  var content = document.getElementById('content').value;

  savePost(nickname, password, title, content)
    .then(() => {
      window.location.href = 'index.html';
    })
    .catch(error => {
      console.error('Error saving post:', error);
    });
});

function savePost(nickname, password, title, content) {
  const headers = {
    'Authorization': 'Bearer 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'
  };

  const fileContent = JSON.stringify({
    nickname: nickname,
    password: password,
    title: title,
    content: content,
    date: new Date().toISOString(),
    views: 0
  });

  const encodedContent = btoa(fileContent);

  return axios.put('https://api.github.com/repos/Lukim99/test-commu/contents/posts/' + Date.now() + '.json', {
    message: 'Add new post',
    content: fileContent
  }, {
    headers: headers
  });
}

// Common
function goToWritePage() {
  window.location.href = 'write.html';
}

renderPosts();
