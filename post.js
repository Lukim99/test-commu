var currentPost = JSON.parse(localStorage.getItem('currentPost'));

document.getElementById('postTitle').innerText = currentPost.title;

var detailsElement = document.getElementById('postDetails');
detailsElement.innerText = '작성자: ' + currentPost.nickname + ' | 작성일자: ' + currentPost.date + ' | 조회수: ' + currentPost.views;

document.getElementById('postContent').innerText = currentPost.content;

var commentForm = document.getElementById('commentForm');
commentForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  var nickname = document.getElementById('nickname').value;
  var commentContent = document.getElementById('commentContent').value;
  
  var comment = {
    nickname: nickname,
    content: commentContent
  };
  
  saveComment(comment);
  clearCommentForm();
});

function saveComment(comment) {
  var comments = getSavedComments();
  comments.push(comment);
  localStorage.setItem('comments', JSON.stringify(comments));
  
  renderComments();
}

function getSavedComments() {
  var commentsString = localStorage.getItem('comments');
  var comments = JSON.parse(commentsString) || [];
  return comments;
}

function renderComments() {
  var comments = getSavedComments();
  var commentList = document.getElementById('commentList');
  commentList.innerHTML = '';
  
  comments.forEach(function(comment) {
    var commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.innerText = '작성자: ' + comment.nickname + ' | 댓글 내용: ' + comment.content;
    
    commentList.appendChild(commentElement);
  });
}

function clearCommentForm() {
  document.getElementById('nickname').value = '';
  document.getElementById('commentContent').value = '';
}

renderComments();
