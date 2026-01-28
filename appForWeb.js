import { AutoCompleteTrie } from "./model/Trie.js";
const trie = new AutoCompleteTrie();

const wordInput = document.getElementById("add-word-input");
const addBtn = document.getElementById("add-word-button");
const wordCountDisplay = document.getElementById("dictionary-count");
const errorBox = document.getElementById("error-box");
const errorText = document.getElementById("error-text");
const successBox = document.getElementById("success-box");
const successText = document.getElementById("success-text");
const searchBox = document.getElementById("autocomplete-input");
const suggestionsPanel = document.getElementById("suggestions-panel");
const suggestionsList = document.getElementById("suggestions-list");

let wordsCounter = 0;

addBtn.addEventListener("click", () => {
  const word = wordInput.value.trim();
  if (word) {
    // check if word already exists
    const exists = trie.findWord(word);

    if (exists) {
      // show duplicate error
      errorText.textContent = `'${word}' already exists in the dictionary`;
      errorBox.classList.remove("hidden");
      // hide success if previously shown
      successBox.classList.add("hidden");
    } else {
      // add new word
      trie.addWord(word);
      wordsCounter++;
      wordCountDisplay.innerText = wordsCounter;
      wordInput.value = "";
      console.log(`Added: ${word}`);
      // hide error if previously shown
      errorBox.classList.add("hidden");
      // show success message
      successText.textContent = `Added '${word}' to dictionary`;
      successBox.classList.remove("hidden");
    }
  } else {
    // show error for empty input
    errorText.textContent = "Cannot add empty word";
    errorBox.classList.remove("hidden");
    // hide success if previously shown
    successBox.classList.add("hidden");
  }
});

searchBox.addEventListener("input", () => {
  const prefix = searchBox.value.trim();
  if (prefix.length > 0) {
    const suggestions = trie.predictWord(prefix);
    renderSuggestions(suggestions, prefix);
  } else {
    clearSuggestions();
  }
});

const clearSuggestions = () => {
  suggestionsList.innerHTML = "";
  suggestionsPanel.classList.add("hidden");
};

const renderSuggestions = (suggestions, prefix) => {
  clearSuggestions();

  if (!suggestions || suggestions.length === 0) {
    return;
  }

  suggestionsPanel.classList.remove("hidden");

  suggestions.forEach((word) => {
    const li = document.createElement("li");
    li.className = "px-4 py-2 hover:bg-slate-50 cursor-pointer";

    const prefixSpan = document.createElement("span");
    prefixSpan.textContent = prefix;
    prefixSpan.className =
      "bg-rose-100 text-slate-900 font-semibold px-0.5 rounded-sm mr-0.5";

    const restSpan = document.createElement("span");
    restSpan.textContent = word.slice(prefix.length);
    restSpan.className = "text-slate-800";

    li.appendChild(prefixSpan);
    li.appendChild(restSpan);

    li.addEventListener("click", () => {
      searchBox.value = word;
      clearSuggestions();
    });

    suggestionsList.appendChild(li);
  });
};
