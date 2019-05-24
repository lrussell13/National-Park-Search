'use strict';

const apiKey = 'ZOucE8PPq2pWUvolaAOMzmv0INjf4BEo1TeaGvCd'

const url = 'https://developer.nps.gov/api/v1/parks';

function displayResults(responseJson){
    $('#results-list').empty();

    let fullHTML = responseJson.map(item => {
      return `
      <li>
      <h3>${item.fullName}</h3>
      <p>${item.description}</p>
      <a href="${item.url}">${item.url}</a>
      </li>
      `
    }).join("");

    $('#results-list').html(fullHTML);

    $('#results').removeClass('hidden');
}

function formatQueryParams(stateCode, limit = 10, api_key) {
  const queryParams = {
    stateCode, 
    limit,
    api_key,
  };
  return Object.keys(queryParams)
  .map((key) => `${key}=${queryParams[key]}`) 
  .join('&');
}

function getResults(searchState, maxResults, apiKey){

  const params = formatQueryParams(searchState, maxResults, apiKey);
  

  fetch(url + '?' + params)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson.data))
    .catch(err => {
      console.log(err);
    });

}

function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const searchState = $('#js-search-state').val();
        const maxResults = ($('#js-max-number').val() - 1);
        getResults(searchState, maxResults, apiKey);
      });
}

$(watchForm);