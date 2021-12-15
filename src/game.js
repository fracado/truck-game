kontra.init();
kontra.initKeys();

kontra.setImagePath('assets/images');
kontra.setAudioPath('assets/sounds');

/*
const animateBg = function (img) {
  let cvs = document.getElementById('bg');
  let ctx = cvs.getContext('2d');
  let offsetLeft = 0;

  setInterval(function () {
    offsetLeft += 1;
    if (offsetLeft > width) {
      offsetLeft = 0;
    }

    ctx.drawImage(img, -offsetLeft, 0);
    ctx.drawImage(img, img.width-offsetLeft, 0);

  }, 1000/30);
};
*/

kontra.load('truckspritesheet.png','background.png','roadsign.png','rock.png', 'music.ogg', 'jump.wav', 'crash.ogg').then(function() {
  kontra.audioAssets.music.loop = true;
  kontra.audioAssets.music.volume = 0.5;

  const background = kontra.Sprite({
    x: 0,
    y: 0,
    image: kontra.imageAssets.background
  });

    let spriteSheet = kontra.SpriteSheet({
      frameWidth: 126,
      frameHeight: 66,
      image: kontra.imageAssets.truckspritesheet,
      animations: {
        drive: {
          frames: [0, 1],
          frameRate: 8
        },
        crash: {
          frames: 2
        }
      }
    });

    let truck = kontra.Sprite({
      x: 120,
      y: 250,
      animation: 'drive',
      animations: spriteSheet.animations
    });

  // global mechanic variables
  y_origin = truck.y;
  spawner_ground = y_origin;
  spawner_max = y_origin+24;

  loop = kontra.GameLoop({
        update: function() {
          if (!isRunning) {
            isRunning = true;
            truck.playAnimation('drive');
            talk(dialogue_intro1);
          }
          else if (isOver) {
            truck.y = y_origin; // reset truck position
            isOver = false;
          }

          time++;

          if (kontra.keyPressed('up')) { // JUMP
            kontra.audioAssets.jump.play();
            jump(truck);
          }
          else {
            stop_jump();
          }

          if (kontra.keyPressed('left')) {
            truck.x -= 1;
          }

          if (kontra.keyPressed('right')) {
            truck.x += 1;
          }

          if (truck.y < y_origin) { // GRAVITY
            gravity(truck);
          }

          else if (truck.y === y_origin) { // TOUCHED GROUND
            jump_cooloff();
          }

          if (time % spawn_period === 0) {
            score++;
            const obstacle = spawn_obstacle();
            obstacles.push(obstacle);
          }

          else if (time % talk_period === 0) {
            talk_decision();
          }

          truck.update();
          background.update();

          obstacles.forEach(function(obstacle, index) {
            obstacle.update();

            if (kontra.collides(obstacle, truck)) {
              kontra.audioAssets.crash.play();
              truck.playAnimation('crash');
              screen_write(2);
            }
            else if (obstacle.x <= obstacle.width) {
              count_score(obstacle);
              obstacles.splice(index,1);
            }
          });

          score_html.innerHTML = score;
          check_score();
        },

        render: function() {
          background.render();
          // animateBg(kontra.imageAssets.background);
          kontra.audioAssets.music.play();
          truck.render();

          if (obstacles.length > 0) {
            for (let i = 0; i < obstacles.length; i++)
              obstacles[i].render();
          }
        }
      });

  isLoaded = true;
});


// Start Screen

document.addEventListener('keyup',function(k){start_game(k);});

function start_game(k) {
  if (isLoaded && !isRunning && k.code === "Enter") {
    canvas.style.backgroundColor = "lightblue";
    text_box.innerHTML = "";
    loop.start();
  }
  else if (isLoaded && isOver && k.code === "Enter") {
    canvas.style.backgroundColor = "lightblue";
    text_box.innerHTML = "";
    isRunning = false; // to reset inner text
    reset();
  }
}

