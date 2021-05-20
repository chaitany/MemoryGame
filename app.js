document.addEventListener('DOMContentLoaded', () => {
  
  //cards
  const cards = [
    {
      code: 'fox',
      src: 'images/fox.jpeg'
    },
    {
      code: 'fox',
      src: 'images/fox.jpeg'
    },
    {
      code: 'cat',
      src: 'images/cat.jpeg'
    },
    {
      code: 'cat',
      src: 'images/cat.jpeg'
    },
    {
      code: 'dog',
      src: 'images/dog.jpeg'
    },{
      code: 'dog',
      src: 'images/dog.jpeg'
    },
    {
      code: 'lemur',
      src: 'images/lemur.jpeg'
    },{
      code: 'lemur',
      src: 'images/lemur.jpeg'
    },
    {
      code: 'otter',
      src: 'images/otter.jpeg'
    },{
      code: 'otter',
      src: 'images/otter.jpeg'
    },
    {
      code: 'panda',
      src: 'images/panda.jpeg'
    },{
      code: 'panda',
      src: 'images/panda.jpeg'
    },
    {
      code: 'rabbit',
      src: 'images/rabbit.jpeg'
    },{
      code: 'rabbit',
      src: 'images/rabbit.jpeg'
    },
    {
      code: 'kangaroo',
      src: 'images/kangaroo.jpeg'
    },{
      code: 'kangaroo',
      src: 'images/kangaroo.jpeg'
    },
  ];

  // Shuffle Cards
  cards.sort(() => 0.5 - Math.random());

  let selectedCards = [];
  let selectedCardsIds = [];
  let matchedCards = [];
  let flipped = false; // Check to not to allow user to select other cards while there are two open

  const mainWrapper = document.querySelector('.memory-game__wrapper');
  const board = document.querySelector('.memory-game__board');
  const result = document.querySelector('.memory-game__result');

  // Creates the Memory Game board with appending <img/> into the parent div using blank image
  function createBoard() {
  	for(let i = 0; i<cards.length; i++) {
  	  let image = document.createElement('img');
  	  image.setAttribute('src', 'images/blank.jpeg');
  	  image.setAttribute('data-index', i);
  	  image.addEventListener('click', toggleCard);
  	  image.classList.add('memory-game__board-image');
  	  board.appendChild(image);
  	}
  };

  // Call to flip the card image
  function toggleCard() {
  	// If there are two cards flipped OR user has won, don't allow click
  	if(flipped || matchedCards.length === (cards.length/2)) return; 

  	let cardIndex = this.getAttribute('data-index');
  	selectedCards.push(cards[cardIndex].code);
  	selectedCardsIds.push(cardIndex);
  	
  	this.classList.add('memory-game__board-image--image');
  	
  	// Need this timeout to allow animation looks cool before setting the image src
  	setTimeout(() => this.setAttribute('src', cards[cardIndex].src), 200)

  	// If two cards are flipped, check if they are matched
  	if(selectedCards.length === 2) {
  	  flipped = true;

  	  //Timeout to let user see the cards
  	  setTimeout(checkCardsMatch, 1000);
  	}
  };

  // Function to check if the opened cards are a match and announce win if all cards matched
  function checkCardsMatch() {
  	let cards = document.querySelectorAll('.memory-game__board img');
  	let cardOneId = selectedCardsIds[0];
  	let cardTwoId = selectedCardsIds[1];

  	if(selectedCards[0] === selectedCards[1]) {
  	  matchedCards.push(selectedCards);
  	} else {
  	  cards[cardOneId].setAttribute('src', 'images/blank.jpeg');
  	  cards[cardOneId].classList.remove('memory-game__board-image--image');
  	  cards[cardTwoId].setAttribute('src', 'images/blank.jpeg');
  	  cards[cardTwoId].classList.remove('memory-game__board-image--image');
  	}

  	selectedCards = [];
  	selectedCardsIds = [];

  	// Game Win scenario
  	if(matchedCards.length === (cards.length/2)) {
  	  celebrate();
  	  mainWrapper.classList.add('memory-game__wrapper--end');
  	  result.classList.add('memory-game__result--active');
  	}

  	flipped = false;
  };

  // Function call to celebrate user win with confetti
  function celebrate() {
  	for(i=0; i<100; i++) {
	  // Random rotation
	  let randomRotation = Math.floor(Math.random() * 360);
	    // Random Scale
	  let randomScale = Math.random() * 1;
	  // Random width & height between 0 and viewport
	  let randomWidth = Math.floor(Math.random() * Math.max(document.documentElement.clientWidth, window.innerWidth || 0));
	  let randomHeight =  Math.floor(Math.random() * Math.max(document.documentElement.clientHeight, window.innerHeight || 500));
	  
	  // Random animation-delay
	  let randomAnimationDelay = Math.floor(Math.random() * 15);

	  // Random colors
	  let colors = ['#0CD977', '#FF1C1C', '#FF93DE', '#5767ED', '#FFC61C', '#8497B0']
	  let randomColor = colors[Math.floor(Math.random() * colors.length)];

	  // Create confetti piece
	  let confetti = document.createElement('div');
	  confetti.className = 'memory-game__confetti';
	  confetti.style.top=randomHeight + 'px';
	  confetti.style.right=randomWidth + 'px';
	  confetti.style.backgroundColor=randomColor;
	  // confetti.style.transform='scale(' + randomScale + ')';
	  confetti.style.obacity=randomScale;
	  confetti.style.transform='skew(15deg) rotate(' + randomRotation + 'deg)';
	  confetti.style.animationDelay=randomAnimationDelay + 's';
	  document.getElementsByClassName("memory-game__confetti-wrapper")[0].appendChild(confetti);
	}
  }

  createBoard();
});

