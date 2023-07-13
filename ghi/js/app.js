function createCard(name, description, pictureUrl, startDate, endDate, locationName) {
  return `
    <div class="col-md-4">
      <div class="shadow-lg p-3 mb-5 bg-white rounded">
        <div class="card">
          <img src="${pictureUrl}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${locationName}</h6>
            <p class="card-text">${description}</p>
            <div class="card-footer">${startDate} - ${endDate}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

window.addEventListener('DOMContentLoaded', async () => {

  function createPlaceholderCard() {
    return `
      <div class="col-md-4">
        <div class="shadow-lg p-3 mb-5 bg-white rounded">
          <div class="card">
            <div class="card-img-top placeholder-img"></div>
            <div class="card-body">
              <h5 class="card-title placeholder-text"></h5>
              <h6 class="card-subtitle mb-2 text-muted placeholder-text"></h6>
              <p class="card-text placeholder-text"></p>
              <div class="card-footer placeholder-text"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  const url = 'http://localhost:8000/api/conferences/';

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const column = document.querySelector('.row');

      for (let i = 0; i < data.conferences.length; i++) {
        const placeholderCard = createPlaceholderCard();
        column.innerHTML += placeholderCard;
      }

      for (let i = 0; i < data.conferences.length; i++) {
        const conference = data.conferences[i];
        const detailUrl = `http://localhost:8000${conference.href}`;
        const detailResponse = await fetch(detailUrl);
        if (detailResponse.ok) {
          const details = await detailResponse.json();
          const title = details.conference.name;
          const description = details.conference.description;
          const pictureUrl = details.conference.location.picture_url;
          const startDate = new Date(details.conference.starts).toLocaleDateString();
          const endDate = new Date(details.conference.ends).toLocaleDateString();
          const locationName = details.conference.location.name;

          const placeholderCards = document.querySelectorAll('.col-md-4');
          const placeholderCard = placeholderCards[i];
          const realCard = createCard(title, description, pictureUrl, startDate, endDate, locationName);
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = realCard.trim();
          const realCardElement = tempDiv.firstChild;
          placeholderCard.replaceWith(realCardElement);
        }
      }
    } else {
      throw new Error('Response not ok');
    }
  } catch (e) {
    console.error(e);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger alert-dismissible fade show';
    errorDiv.innerHTML = `
      <strong>Error!</strong> ${e}.
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    const container = document.querySelector('.container');
    container.insertBefore(errorDiv, container.firstChild);
  }
});
