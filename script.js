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
    Authorization: "Token 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",
    Accept: "application/vnd.github.nightshade-preview+json"
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

// Common
function goToWritePage() {
  window.location.href = 'write.html';
}

renderPosts();
