const BASE_URL = 'https://api.frontendexpert.io/api/fe/glossary-suggestions';
const DEBOUCE_DELAY = 500;

const typeahead = document.getElementById('typeahead');
const suggestionsList = document.getElementById('suggestions-list');
let timeoutID;

function resetSuggestionsList() {
  clearInterval(timeoutID);
  suggestionsList.innerHTML = '';
}

function selectSuggestionItem() {
  typeahead.value = this.textContent;
  resetSuggestionsList();
}

function createSuggestionsItems(suggestions) {
  const fragment = document.createDocumentFragment();
  suggestions.forEach((suggestionText) => {
    const li = document.createElement('li');
    li.textContent = suggestionText;
    li.addEventListener('click', selectSuggestionItem);
    fragment.append(li);
  });

  return fragment;
}

function appendToSuggestionsList(suggestions) {
  resetSuggestionsList();
  const suggestionsItems = createSuggestionsItems(suggestions);
  suggestionsList.append(suggestionsItems);
}

async function requestGlossarySuggestions(value) {
  try {
    const url = new URL(BASE_URL);
    url.searchParams.set('text', value);
    const response = await fetch(url);
    const suggestions = await response.json();

    appendToSuggestionsList(suggestions);
  } catch (error) {
    console.log(error);
  }
}

function onInputType() {
  const value = typeahead.value;
  if (!value) {
    resetSuggestionsList();
    return;
  }
  clearTimeout(timeoutID);

  timeoutID = setTimeout(() => {
    requestGlossarySuggestions(value);
  }, DEBOUCE_DELAY);
}

function init() {
  typeahead.addEventListener('input', onInputType);
}
init();
