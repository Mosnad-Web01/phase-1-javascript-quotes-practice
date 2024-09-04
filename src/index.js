document.addEventListener("DOMContentLoaded", () => {
    const quoteList = document.getElementById('quote-list');
  
    fetch('http://localhost:3000/quotes?_embed=likes')
      .then(response => response.json())
      .then(quotes => {
        quotes.forEach(quote => {
          renderQuote(quote);
        });
      });
  
    function renderQuote(quote) {
      const li = document.createElement('li');
      li.classList.add('quote-card');
      li.innerHTML = `
        <blockquote class="blockquote">
          <p class="mb-0">${quote.quote}</p>
          <footer class="blockquote-footer">${quote.author}</footer>
          <br>
          <button class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
          <button class='btn-danger'>Delete</button>
        </blockquote>
      `;
      quoteList.appendChild(li);
  
      const likeBtn = li.querySelector('.btn-success');
      const deleteBtn = li.querySelector('.btn-danger');
  
      likeBtn.addEventListener('click', () => {
        handleLike(quote, li);
      });
  
      deleteBtn.addEventListener('click', () => {
        handleDelete(quote.id, li);
      });
    }
  
    function handleLike(quote, li) {
      fetch('http://localhost:3000/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          quoteId: quote.id,
          createdAt: Math.floor(Date.now() / 1000)
        })
      })
      .then(response => response.json())
      .then(() => {
        const likesSpan = li.querySelector('span');
        likesSpan.textContent = parseInt(likesSpan.textContent) + 1;
      });
    }
  
    function handleDelete(id, li) {
      fetch(`http://localhost:3000/quotes/${id}`, {
        method: 'DELETE'
      })
      .then(() => {
        li.remove();
      });
    }
  });
  