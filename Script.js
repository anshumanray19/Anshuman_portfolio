var words = ['United States', 'India', 'France', 'Germany'];
var index = 0;
function changeWord(wordElement) {
  wordElement.textContent = words[index];
  index = (index + 1) % words.length; 
}
var wordElement = document.getElementById('word');
setInterval(function() {
  changeWord(wordElement);
}, 1000);
