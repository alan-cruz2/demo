export default (limit, offset) => (
  fetch(`https://portfolium.com/proxy/entries/expert?limit=${limit}&offset=${offset}&sort=recent`)
    .then(response => {
      console.log(response);
      if (response.ok && response.status === 200) {
        return response.json();
      } else {
        console.log('Response error handler', response);
        return;
      }
    })
    .catch(err => console.log('Fetch error handler', err)));
