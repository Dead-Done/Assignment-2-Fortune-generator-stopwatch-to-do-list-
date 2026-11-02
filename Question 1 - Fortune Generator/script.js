// Edit this list to change the fortunes.
const fortunes = [
  'Good news will reach you soon.',
  'An old friend will get in touch.',
  'You will find something you thought was lost.',
  'A short trip will be worth taking.',
  'Someone will ask for your advice.',
  'A new idea will solve an old problem.',
  'You will laugh at an unexpected moment.',
  'Be patient with a plan that is taking time.',
  'An invitation will lead to a good evening.',
  'You will learn something useful this week.',
  'A small purchase will turn out to be a good one.',
  'Today is a good day to start.'
];

// Edit these four objects to change the themes. Theme 1 matches the first button.
const themes = [
  {
    text: '#222222',
    background: '#ffffff',
    border: '#555555',
    size: '20px',
    font: "Georgia, 'Times New Roman', serif"
  },
  {
    text: '#183d2b',
    background: '#edf5ee',
    border: '#38724b',
    size: '21px',
    font: "'Palatino Linotype', Palatino, Georgia, serif"
  },
  {
    text: '#572739',
    background: '#f9edf1',
    border: '#964e68',
    size: '22px',
    font: "'Trebuchet MS', Arial, sans-serif"
  },
  {
    text: '#16324e',
    background: '#edf3f9',
    border: '#426985',
    size: '19px',
    font: 'Verdana, Arial, sans-serif'
  }
];

const fortuneBox = document.querySelector('#fortune-box');
const fortuneText = document.querySelector('#fortune-text');
const fortuneToggle = document.querySelector('#fortune-toggle');
const themeButtons = document.querySelectorAll('[data-theme]');

// Show one random fortune when the page loads.
let currentFortune = Math.floor(Math.random() * fortunes.length);
fortuneText.textContent = fortunes[currentFortune];

// Pick another message without repeating the one currently shown.
document.querySelector('#new-fortune').addEventListener('click', () => {
  const step = 1 + Math.floor(Math.random() * (fortunes.length - 1));
  currentFortune = (currentFortune + step) % fortunes.length;
  fortuneText.textContent = fortunes[currentFortune];
});

// Keep the box label in sync with whether it is open.
fortuneBox.addEventListener('toggle', () => {
  fortuneToggle.textContent = fortuneBox.open ? 'Close the box' : 'Open the box';
});

// Apply one theme's five values and mark its button as selected.
function applyTheme(themeNumber) {
  const theme = themes[themeNumber];
  fortuneBox.style.color = theme.text;
  fortuneBox.style.backgroundColor = theme.background;
  fortuneBox.style.borderColor = theme.border;
  fortuneText.style.fontSize = theme.size;
  fortuneText.style.fontFamily = theme.font;

  themeButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(Number(button.dataset.theme) === themeNumber));
  });
}

themeButtons.forEach((button) => {
  button.addEventListener('click', () => applyTheme(Number(button.dataset.theme)));
});

applyTheme(0);
