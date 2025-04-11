let board;
let bigCube;
let smallCube;
let colidingCount = 0;

const mass = 10000;

function setup() {
  createCanvas(windowWidth, windowHeight);

  board = new Board();
  bigCube = new Cube(100, mass * 100, 100, 10);
  smallCube = new Cube(10, mass, width / 2, 0);
}

function draw() {
  background(255);

  board.paint();

  /** If 2 cubes are coliding */
  if (smallCube.x - bigCube.size === bigCube.x) {
    colidingCount++;

    /** Find resolution */

    const bigCubeMass = bigCube.mass;
    const bigCubeVelocity = bigCube.velocity;

    bigCube.hit(smallCube.mass, smallCube.velocity);
    smallCube.hit(bigCubeMass, bigCubeVelocity);
  }

  /** If small cube colides with the wall */
  if (smallCube.x + smallCube.size === width - 50) {
    colidingCount++;

    smallCube.hitWall();
  }

  bigCube.move(-Infinity, smallCube.x - bigCube.size);
  smallCube.move(bigCube.x + bigCube.size, width - 50 - smallCube.size);
}

class Cube {
  constructor(size, mass, initialX, initialVelocity) {
    this.size = size;
    this.mass = mass;
    this.x = initialX;
    this.velocity = initialVelocity;
  }

  hit(mass, velocity) {
    this.velocity =
      ((this.mass - mass) * this.velocity + 2 * mass * velocity) /
      (this.mass + mass);
  }

  hitWall() {
    this.velocity *= -1;
  }

  move(minX, maxX) {
    this.x = min(maxX, max(this.x + this.velocity, minX));

    this.paint();
  }

  paint() {
    rect(this.x, height * 0.8 - this.size, this.size, this.size);
  }
}

class Board {
  constructor() {}

  paint() {
    background(200);

    /** Floor */
    rect(0, height * 0.8, width, height * 0.2);

    /** Wall */
    rect(width - 50, 0, 50, height * 0.8);
  }
}
