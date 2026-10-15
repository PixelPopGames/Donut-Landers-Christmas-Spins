(function(){
'use strict';
const $ = id => document.getElementById(id);
const reels = [$('reel0'),$('reel1'),$('reel2')];
const symbols = [
 {e:'🍩',name:'Classic Donut',weight:19,pay:5},
 {e:'🎄',name:'Christmas Tree',weight:14,pay:4},
 {e:'🎁',name:'Gift',weight:14,pay:4},
 {e:'⭐',name:'Golden Star',weight:12,pay:5},
 {e:'🍬',name:'Candy',weight:12,pay:4},
 {e:'🦌',name:'Reindeer',weight:9,pay:7},
 {e:'🔔',name:'Jingle Bell',weight:8,pay:8},
 {e:'🌈',name:'Sprinkles',weight:5,pay:10},
 {e:'👻',name:'Ghost',weight:4,pay:12},
 {e:'🍫',name:'Chocolate Von Donut',weight:3,pay:15}
];
let coins=1000, bet=25, lastWin=0, busy=false, soundOn=true, audioCtx=null, spinToken=0;
const fmt=n=>Math.floor(n).toLocaleString('en-US');
function drawStats(){ $('coins').textContent=fmt(coins); $('bet').textContent=fmt(bet); $('lastWin').textContent=fmt(lastWin); $('minus').disabled=busy||bet<=5; $('plus').disabled=busy||bet>=100; $('maxBet').disabled=busy; $('spin').disabled=busy||coins<bet; }
function setStatus(s){$('status').textContent=s;}
function setMessage(s){$('message').textContent=s;}
function audio(){if(!soundOn)return;try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;if(!audioCtx)audioCtx=new C();if(audioCtx.state==='suspended')audioCtx.resume();return audioCtx;}catch(e){return null;}}
function tone(freq,duration=.12,wave='sine',volume=.055,delay=0){const c=audio();if(!c)return;try{const o=c.createOscillator(),g=c.createGain();o.type=wave;o.frequency.setValueAtTime(freq,c.currentTime+delay);g.gain.setValueAtTime(.0001,c.currentTime+delay);g.gain.exponentialRampToValueAtTime(volume,c.currentTime+delay+.012);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+delay+duration);o.connect(g);g.connect(c.destination);o.start(c.currentTime+delay);o.stop(c.currentTime+delay+duration+.025);}catch(e){}}
function soundSpin(){[330,390,460,550].forEach((f,i)=>tone(f,.08,'triangle',.025,i*.07));}
function soundWin(){[523,659,784,1047].forEach((f,i)=>tone(f,.22,'sine',.07,i*.11));}
function soundJackpot(){[523,659,784,1047,1318,1568].forEach((f,i)=>tone(f,.32,'triangle',.075,i*.095));}
function pick(){let total=symbols.reduce((a,s)=>a+s.weight,0),n=Math.random()*total;for(const s of symbols){n-=s.weight;if(n<0)return s;}return symbols[0];}
function weightedResult(){return [pick(),pick(),pick()];}
function renderResult(result){result.forEach((s,i)=>{reels[i].textContent=s.e;reels[i].setAttribute('aria-label',s.name);});}
function evaluate(r){let payout=0,text='No match this time — give it another spin!';const jackpot=r[0].e==='🌈'&&r[1].e==='👻'&&r[2].e==='🍫';const three=r[0].e===r[1].e&&r[1].e===r[2].e;if(jackpot){payout=bet*500;text='🌟 500× GLEAMING JACKPOT! 🌟';$('machine').classList.add('jackpot');soundJackpot();}else if(three){payout=bet*r[0].pay;text='🎉 THREE '+r[0].name.toUpperCase()+'S! BIG WIN!';$('machine').classList.remove('jackpot');soundWin();}else if(r[0].e===r[1].e||r[1].e===r[2].e||r[0].e===r[2].e){payout=bet*2;text='✨ TWO MATCH — NICE WIN!';$('machine').classList.remove('jackpot');tone(740,.2,'sine',.06);}else{$('machine').classList.remove('jackpot');tone(220,.13,'sine',.035);}
coins+=payout;lastWin=payout;setStatus(payout?'🎁 '+text:'🎄 '+text);setMessage(payout?'+'+fmt(payout)+' COINS!':'');drawStats();}
function spin(){if(busy||coins<bet)return;audio();busy=true;spinToken++;const token=spinToken;coins-=bet;lastWin=0;drawStats();setMessage('');setStatus('✨ Reels spinning… good luck!');$('machine').classList.remove('jackpot');reels.forEach(r=>r.classList.add('spinning'));soundSpin();const result=weightedResult();const delays=[700,1050,1400];delays.forEach((delay,i)=>{window.setTimeout(()=>{if(token!==spinToken)return;reels[i].classList.remove('spinning');reels[i].textContent=pick().e;},delay-170);});window.setTimeout(()=>{if(token!==spinToken)return;renderResult(result);busy=false;evaluate(result);drawStats();},1500);}
$('spin').addEventListener('click',spin);
$('minus').addEventListener('click',()=>{if(busy)return;bet=Math.max(5,bet-5);drawStats();tone(420,.08);});
$('plus').addEventListener('click',()=>{if(busy)return;bet=Math.min(100,bet+5);drawStats();tone(520,.08);});
$('maxBet').addEventListener('click',()=>{if(busy)return;bet=Math.max(5,Math.min(100,Math.floor(coins/5)*5));drawStats();tone(700,.1);});
$('sound').addEventListener('click',()=>{soundOn=!soundOn;$('sound').textContent=soundOn?'🔊 SOUND ON':'🔇 SOUND OFF';$('sound').setAttribute('aria-pressed',String(soundOn));if(soundOn){audio();tone(660,.14);}});
$('newGame').addEventListener('click',()=>{spinToken++;busy=false;coins=1000;bet=25;lastWin=0;reels.forEach((r,i)=>{r.classList.remove('spinning');r.textContent=['🍩','🎄','⭐'][i];r.setAttribute('aria-label','Slot reel '+(i+1));});$('machine').classList.remove('jackpot');setStatus('🎁 Fresh coins! Good luck and Merry Christmas!');setMessage('');drawStats();tone(600,.12);});
document.addEventListener('keydown',e=>{if((e.code==='Space'||e.code==='Enter')&&e.target.tagName!=='BUTTON'){e.preventDefault();spin();}});
// Audio is deliberately started only after a user gesture, as browsers block unsolicited audio.
drawStats();
})();
