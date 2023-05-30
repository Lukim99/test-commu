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
    'Authorization': 'token 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'
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

  return axios.put(`https://api.github.com/repos/Lukim99/test-commu/contents/posts/${Date.now()}.json`, {
    message: 'Add new post',
    content: encodedContent
  }, {
    headers: headers
  });
}
