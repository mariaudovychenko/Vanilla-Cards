// Function to fetch data from a WordPress REST API
function rendercard() {
  fetch('https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts')
    .then(response => response.json())
    .then(data => processData(data));
}

// Function to convert the data retrieved from the API into HTML card elements
function processData(data) {
  const container = document.getElementById('posts');

  data.forEach(element => {
    console.log(element);
    const date = new Date(element.date);
    const formattedDate = date.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' });

    const div = document.createElement('div');
    div.setAttribute('class', 'col-4 col-medium-2 p-card--highlighted blog-p-card--post');

    div.innerHTML = `
      <header class="highlight--design ">
        <h5 class="p-muted-heading">${element._embedded['wp:term'][3][1]?.name ?? element._embedded['wp:term'][2][0]?.name 
        ?? "Topic not found"}</h5>  
      </header>
      <div class="blog-p-card__content">
        <a href="${element.link}"> 
          <img class="p-card__image" alt="" height="185" width="330" src="${element.featured_media}">
            <div class="p-card__inner u-no-padding">
              <h3>${element.title.rendered}"</h3>
              </a>
              <em>
              by <a href="#">${element._embedded.author[0].name}</a> on ${formattedDate}
              </em>
            </div> 
      </div>
      <p class="blog-p-card__footer u-no-margin--bottom">${element._embedded['wp:term'][0][0].name.endsWith('s') ? element._embedded['wp:term'][0][0].name.slice(0, -1) : element._embedded['wp:term'][0][0].name}</p>
    `;

// It appends the newly created <div> element to the container 
    container.appendChild(div);
  });
}

rendercard();

// Explanation to the line 22 and 23: If a header with the mentioned topic name is not available at this location,
// check the next location; otherwise, display "Topic not found".