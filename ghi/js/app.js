// window.addEventListener('DOMContentLoaded', async () => {
//   const url = 'http://localhost:8000/api/conferences/';
//   const response = await fetch(url);
//   console.log(response);

//   const data = await response.json();
//   console.log(data);

// });


// window.addEventListener('DOMContentLoaded', async () => {
//   const url = 'http://localhost:8000/api/conferences/';

//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       // Figure out what to do when the response is bad
//       throw new Error('Response not ok');
//     } else {
//       const data = await response.json();
     //  const conference = data.conferences[0];
     //  console.log(conference);
     //  const nameTag = document.querySelector('.card-title');
      // nameTag.innerHTML = conference.name;

      // const detailUrl = `http://localhost:8000${conference.href}`;
      // const detailResponse = await fetch(detailUrl);
      // if (detailResponse.ok) {
        // const details = await detailResponse.json();
        // console.log(details);
      // }

//     }
//   } catch (e) {
//     console.error('error', e)
//     // Figure out what to do if an error is raised
//   }

// });


// my code makes better sense, but their code is above
window.addEventListener('DOMContentLoaded', async () => {
  const url = 'http://localhost:8000/api/conferences/';

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const conference = data.conferences[0];
      // console.log(conference);
      const nameTag = document.querySelector('.card-title');
      nameTag.innerHTML = conference.name;

      const detailUrl = `http://localhost:8000${conference.href}`;
      const detailResponse = await fetch(detailUrl);
      if (detailResponse.ok) {
        const details = await detailResponse.json();
        console.log(details);
        const descriptionTag = document.querySelector('.card-text');
        descriptionTag.innerHTML = details.conference.description;

        // console.log(details.conference.picture_url)
        const imgTag = document.querySelector('.card-img-top');
        imgTag.src = details.conference.location.picture_url;

      }

    } else {
      throw new Error('Response not ok');
    }
  } catch (e) {
    console.error('error', e);
  }
});
