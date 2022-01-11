
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');


console.log(context);

const cw = window.innerWidth;
const ch = window.innerHeight;

canvas.width = cw;
canvas.height = ch;

context.fillStyle = 'rgba(0,0,0,.7)';
context.fillRect(0, 0, cw, ch)


// Get symbols to drawing
const matrixChars = new Array();

for (let i = 48; i <= 122; i++) {
	matrixChars.push(String.fromCodePoint(i));
}


const fallingChars = new Array();
const maxCharCount = 200;
const fontSize = 13;
const maxColumns = Math.floor(cw / fontSize);

let frames = 0;


// Create class of falling char
class FallingChar {
	constructor (x, y) {
		this.x = x;
		this.y = y;
	}

	draw(ctx) {

		this.value = matrixChars[Math.floor(Math.random() * (matrixChars.length - 1))];
		this.speed = Math.random() * 21;

		ctx.fillStyle = '#00ff00';
		ctx.font = `${fontSize}px sans-serif`;
		ctx.fillText(this.value, this.x, this.y);
		this.y += this.speed;

		// WTF IS GOING ON
		if (this.y > ch) {
      this.y = (Math.random() * ch) / 2 - 50;
      this.x = Math.floor(Math.random() * maxColumns) * fontSize;
      this.speed = (-Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;
    }
	}
}


const update = () => {

	if (fallingChars.length < maxCharCount) {
		
		const fallingChar = new FallingChar(
									Math.floor(Math.random() * maxColumns) * fontSize,
      							(Math.random() * ch) / 2 - 50
      						);
		fallingChars.push(fallingChar);
	}

	context.fillStyle = 'rgba(0,0,0,0.05)';
	context.fillRect(0, 0, cw, ch);


	// WTF IS GOING ON 2 OH MY FUCKING GOD
	for (let i = 0; i < fallingChars.length && frames % 2 == 0; i++) {
   fallingChars[i].draw(context);
  }


	requestAnimationFrame(update);
	frames++
}

update()
