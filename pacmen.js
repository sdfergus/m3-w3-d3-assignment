const pacMen = []; // This array holds all the pacmen
let webPageWidth = window.innerWidth; //Provides width of webpage
let webPageHeight = window.innerHeight; //Provides height of webpage

// This function returns an object with random values
function setToRandom( scale ) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom( 10 ); // {x:?, y:?}
  let position = setToRandom( 200 );

  // Add image to div id = game
  let game = document.getElementById( 'game' );
  let newimg = document.createElement( 'img' );
  newimg.style.position = 'absolute';
  // newimg.src = './images/PacMan1.png';
  newimg.src = `./images/PacMan${ Math.floor( Math.random() * 4 + 1 ) }.png`;
  newimg.width = 100;

  // TODO: set position here
  newimg.style.left = position.x;
  newimg.style.top = position.y;

  // TODO add new Child image to game
  game.appendChild( newimg );

  // return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach( ( item ) => {
    checkCollisions( item );
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  } );
  setTimeout( update, 20 );
}

function checkCollisions( item ) {
  // TODO: detect collision with all walls and make pacman bounce
  const pacDiameter = item.newimg.width;

  if ( item.position.x + item.velocity.x > webPageWidth - pacDiameter ||
    item.position.x + item.velocity.x < 0 ) {

    item.velocity.x = -item.velocity.x;

  }
  if ( item.position.y + item.velocity.y > webPageHeight - pacDiameter ||
    item.position.y + item.velocity.y < 0 ) {
    // item.velocity.y = -Math.abs( item.velocity.y );
    item.velocity.y = -item.velocity.y
  }

  item.position.x += item.velocity.x;
  item.position.y += item.velocity.y;

}

function makeOne() {
  pacMen.push( makePac() ); // add a new PacMan
}

//don't change this line
if ( typeof module !== 'undefined' ) {
  module.exports = { checkCollisions, update, pacMen };
}
