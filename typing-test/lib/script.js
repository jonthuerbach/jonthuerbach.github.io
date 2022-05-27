let words = ['man', 'tree', 'come', 'six', 'lay', 'own', 'park', 'lamp', 'grass', 'with', 'you', 'first', 'after', 'game', 'force', 'from', 'the', 'dream', 'world', 'rib', 'limbo', 'original', 'subtract', 'burden', 'still', 'here', 'conductor', 'tasty', 'speech', 'precision', 'bang', 'fuel', 'specimen', 'weapon', 'metal', 'plead', 'powder', 'photocopy', 'purpose', 'timber', 'archive', 'joint', 'ride', 'nail', 'pie', 'crossing', 'amuse', 'trousers', 'delicate', 'star', 'decline', 'tough', 'spend', 'serve', 'scale', 'grief', 'penetrate', 'differ', 'candidate', 'deny', 'serious', 'compensation', 'peanut', 'continental', 'novel', 'conceive', 'trivial', 'bread', 'insurance', 'technology', 'site', 'achieve', 'mosquito', 'polite', 'plane', 'quota', 'truck', 'amount', 'warn', 'slide', 'instinct', 'explode', 'economic', 'display', 'security', 'cathedral', 'bark', 'pain', 'research', 'friendly', 'minor', 'proper', 'couple', 'smile', 'ignite', 'award'],
    spentWords = [],
    currentWord = words[0],
    correctWords = 0,
    completedWords = 0,
    charactersTyped = 0,
    isTestInProgress = false,
    pageIsLoaded = false,
    resultsModal = new bootstrap.Modal(document.getElementById('resultsModal'), {'keyboard': false}),
    editor = document.getElementById('editor'),
    wordContainer = document.getElementById('word-container'),
    spentWordsElem = document.getElementById('spent-words'),
    testTimeElem = document.getElementById('test-time'),
    testWordsPerMinElem = document.getElementById('test-words-per-min'),
    testCharsTypedElem = document.getElementById('test-chars-typed'),
    testAccuracyElem = document.getElementById('test-accuracy'),
    resultsWordsCorrectElem = document.getElementById('results-words-correct'),
    resultsWordsCompleteElem = document.getElementById('results-words-complete'),
    resultsCharactersElem = document.getElementById('results-characters'),
    resultsWordsAccuracyElem = document.getElementById('results-words-accuracy');

editor.addEventListener('input', function(event) {
    if (!isTestInProgress) {
      startTimer();
      isTestInProgress = true;
    }
    if (event.data === ' ') {
      let currentWord = words[0];
      let span = document.createElement('span');
      span.innerHTML = editor.innerHTML.replace(/\&nbsp;/g, '');
      document.getElementById(currentWord).remove();
      spentWords.push(words.shift());
      if (currentWord === span.innerHTML) {
        span.className = 'pe-2 test-spent-word';
        correctWords++;
      } else {
        span.className = 'pe-2 text-danger text-decoration-line-through';
      }
      document.getElementById('spent-words').appendChild(span);
      editor.innerHTML = '';
      completedWords++;
      testWordsPerMinElem.innerHTML = completedWords; // Update completed words
      testAccuracyElem.innerHTML = Math.round((correctWords / completedWords) * 100) + '%'; // Update word accuracy
    } else {
      handleInput();
      charactersTyped++;
      testCharsTypedElem.innerHTML = charactersTyped;
    }
    spentWordsElem.style.marginRight = editor.offsetWidth + 'px';
}, false);

function handleInput() {
  let userInput = editor.innerHTML,
      userInputLength = userInput.length,
      currentWord = words[0],
      wordElement = document.getElementById(words[0]);
  if (compare(userInput, words[0])) {
    editor.className = 'text-primary float-end';
    currentWord = currentWord.substring(userInputLength);
    wordElement.innerHTML = currentWord;
  } else {
    editor.className = 'text-danger text-decoration-line-through float-end';
  }
}

function compare(userInput, word) {
  let userInputLength = userInput.length;
  return userInput == word.substring(0,userInputLength);
}

function generateWords() {
  shuffle(words);
  for (let i=0; i < words.length; i++) {
    let span = document.createElement('span');
    span.innerHTML = words[i];
    span.className = 'pe-2';
    span.id = words[i];
    wordContainer.appendChild(span);
  }
}

function handleEditorFocus() {
  editor.focus();
}

function initializeStats() {
  testTimeElem.innerHTML = 60.0;
  testWordsPerMinElem.innerHTML = completedWords;
  testCharsTypedElem.innerHTML = charactersTyped;
  testAccuracyElem.innerHTML = 100 + '%';
}

function timerLoop(startTime) {
  setTimeout(function() {
    let date = new Date(),
        timeRemaining = (60 - ((date.getTime() - startTime.getTime())/1000)).toFixed(1);
    if (timeRemaining > 0) {
      testTimeElem.innerHTML = timeRemaining;
      timerLoop(startTime);
    } else {
      testTimeElem.innerHTML = '0.0'
      editor.contentEditable = false;
      generateStatistics();
    }
  }, 10);
}

function startTimer() {
  let testStartTime = new Date();
  timerLoop(testStartTime);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function init() {
  generateWords();
  initializeStats();
  handleEditorFocus();
}

function generateStatistics() {
  resultsWordsCorrectElem.innerHTML = correctWords + ' WPM';
  resultsWordsAccuracyElem.innerHTML = Math.round((correctWords / completedWords) * 100) + '%';
  resultsCharactersElem.innerHTML = charactersTyped;
  resultsModal.show();
}

function restartTypingTest() {
  window.location.reload();
}

// init app
document.addEventListener("DOMContentLoaded", function(event) {
  pageIsLoaded = true;
  init();
});