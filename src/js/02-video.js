import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

let throttledTimeUpdate = throttle(timeUpdate, 1000, { trailing: false });

function onPlay() {
  console.log('played the video!');
  player.on('timeupdate', throttledTimeUpdate);
}

function onPause() {
  console.log('paused the video!');
}

function timeUpdate({ seconds }) {
  localStorage.setItem(STORAGE_KEY, seconds);
  console.log(seconds);
}

player.on('pause', onPause);
player.on('play', onPlay);

//after reload page

function continuePLay() {
  const seconds = localStorage.getItem(STORAGE_KEY);
  if (seconds) {
    //modal window
    const modalHTML = `
        <div class="modal--bg">
            <div class="modal--window">
                <h3>Wellcome!</h3>
                <span>Would you like to conitnue wathing video from ${seconds} seconds?</span>
                <div id="modal--buttons">
                    <button class="button-5" data-answer="false">No way!</button>
                    <button class="button-5" data-answer="true">Ofcourse!</button>
                </div>
            </div>
        </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    //buttons
    const buttons = document.getElementById('modal--buttons');
    buttons.addEventListener('click', () => {
      const answer = event.target.dataset.answer;
      if (answer === 'true') {
        document.querySelector('.modal--bg').remove();
        player.setCurrentTime(seconds);
        player.play();
      } else if (answer === 'false') {
        document.querySelector('.modal--bg').remove();
      }
    });
  }
}

window.addEventListener('load', continuePLay);

//css
const style = document.createElement('STYLE');
style.type = 'text/css';
style.innerHTML = `.modal--bg {background: linear-gradient(0deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 131, 0, 0.5) 100%);
    width: 100vw;
    height: 100vh;
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
  }
  .modal--window {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 256px;
    height: 192px;
    border: dashed 2px orange;
    border-radius: 16px;
    transform: translate(-50%, -50%);
    background: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fb8332;
  }

.button-5 {
  align-items: center;
  background-clip: padding-box;
  background-color: #fa6400;
  border: 1px solid transparent;
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
}

.button-5:hover,
.button-5:focus {
  background-color: #fb8332;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
}

.button-5:hover {
  transform: translateY(-1px);
}

.button-5:active {
  background-color: #c85000;
  box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
  transform: translateY(0);
}
  
  `;
document.body.append(style);
