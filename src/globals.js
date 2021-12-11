// used in game.js
let loop;
let isOver = false;
let isRunning = false;
let isLoaded = false;
let obstacles = [];
const canvas = document.getElementById("screen");
const score_html = document.getElementById("score");
const text_box = document.getElementById("text-box");
const width = canvas.width;
const height = canvas.height;
let score = 0;
let time = 0;
const talk_period = 250;
let spawn_period = 300;

const context = canvas.getContext("2d");
context.font = "20px Arial";
context.fillStyle = "#ffffff";

let isScoreChecked = false;
let difficulty_level = 1;
const scoreCheck = 10;
const max_speed = 10;
const min_period = 120;

// used in mechanic.js
let y_origin;

const gravity_power = 1;
const jump_power = 6;

let up_score = 0;

const max_up = 30;

let spawner_ground;
let spawner_max;

let game_speed = 1;
