/* ============================================================
   PHOTOS — edit these paths to change the pictures.
   Put the image files inside the /photos folder.
   ============================================================ */

// "Memories" section — 4 slots, in order (01, 02, 03, 04).
// Recommended size: 1200 x 1200 px (square), JPG, under ~400 KB each.
// Leave a slot as "" to keep the "ADD YOUR PHOTO" placeholder.
const MEMORY_PHOTOS = [
  "photos/1.jpg",
  "photos/2.jpg",
  "photos/3.jpg",
  "photos/4.jpg"
];

// "Our song" music frame — her photo.
// Recommended size: 1080 x 1080 px (exact square), JPG.
const MENNA_PHOTO = "photos/5.jpg";

/* ============================================================ */

const START_DATE = new Date(2026, 7, 25);
const daysEl=document.getElementById("daysTogether"),hoursEl=document.getElementById("hoursTogether"),minsEl=document.getElementById("minsTogether"),secsEl=document.getElementById("secsTogether");
const noteEl=document.getElementById("counterNote");
function updateCounter(){
  const diff=Math.max(0,Math.floor((Date.now()-START_DATE.getTime())/1000));
  const d=Math.floor(diff/86400),h=Math.floor(diff%86400/3600),m=Math.floor(diff%3600/60),s=diff%60;
  daysEl.textContent=d.toLocaleString("en-US");hoursEl.textContent=h;minsEl.textContent=m;secsEl.textContent=s;
  noteEl.textContent=Date.now()<START_DATE.getTime()?"Our date is just around the corner.":(d===0?"Today is chapter one. ✧":"And every one is worth keeping. ♡");
}
updateCounter();setInterval(updateCounter,1000);
const ourSong=document.getElementById("ourSong"),audioPlay=document.getElementById("audioPlay"),musicButtonLabel=document.getElementById("musicButtonLabel"),musicFrame=document.getElementById("musicFrame");
const seekBar=document.getElementById("seekBar"),volBar=document.getElementById("volBar"),timeNow=document.getElementById("timeNow"),timeLeft=document.getElementById("timeLeft");
function setPlayingUI(on){musicFrame.classList.toggle("playing",on);audioPlay.setAttribute("aria-label",on?"Pause our song":"Play our song");musicButtonLabel.textContent=on?"Pause music":"Play our song"}
async function playOurSong(){try{await ourSong.play();setPlayingUI(true)}catch(e){showToast("Tap play to start our song ♡")}}
function pauseOurSong(){ourSong.pause();setPlayingUI(false)}
function toggleOurSong(){ourSong.paused?playOurSong():pauseOurSong()}
audioPlay.addEventListener("click",toggleOurSong);
const fmt=t=>{t=Math.max(0,Math.floor(t||0));return Math.floor(t/60)+":"+String(t%60).padStart(2,"0")};
let seeking=false;
function renderTime(){const dur=ourSong.duration,cur=ourSong.currentTime||0;if(!isFinite(dur)||!dur){timeNow.textContent=fmt(cur);return}
  if(!seeking){seekBar.value=cur/dur*1000;seekBar.style.setProperty("--p",(cur/dur*100)+"%")}
  timeNow.textContent=fmt(cur);timeLeft.textContent="-"+fmt(dur-cur)}
ourSong.addEventListener("timeupdate",renderTime);ourSong.addEventListener("loadedmetadata",renderTime);ourSong.addEventListener("durationchange",renderTime);
ourSong.addEventListener("play",()=>setPlayingUI(true));ourSong.addEventListener("pause",()=>setPlayingUI(false));
seekBar.addEventListener("pointerdown",()=>{seeking=true});
["pointerup","pointercancel"].forEach(ev=>seekBar.addEventListener(ev,()=>{seeking=false}));
seekBar.addEventListener("input",()=>{const dur=ourSong.duration;seekBar.style.setProperty("--p",(seekBar.value/10)+"%");if(isFinite(dur)&&dur){ourSong.currentTime=seekBar.value/1000*dur;timeNow.textContent=fmt(ourSong.currentTime);timeLeft.textContent="-"+fmt(dur-ourSong.currentTime)}});
volBar.addEventListener("input",()=>{ourSong.volume=volBar.value/100;volBar.style.setProperty("--p",volBar.value+"%")});volBar.style.setProperty("--p","100%");
document.getElementById("skipBack").addEventListener("click",()=>{ourSong.currentTime=Math.max(0,ourSong.currentTime-10)});
document.getElementById("skipFwd").addEventListener("click",()=>{const d=ourSong.duration;ourSong.currentTime=isFinite(d)?Math.min(d-.5,ourSong.currentTime+10):ourSong.currentTime+10});

/* Her photo in the music frame (set from MENNA_PHOTO above) */
const mennaBtn=document.getElementById("mennaPhotoBtn"),mennaImg=document.getElementById("mennaPhoto");
mennaBtn.classList.add("no-photo");
mennaImg.addEventListener("load",()=>mennaBtn.classList.remove("no-photo"));
mennaImg.addEventListener("error",()=>mennaBtn.classList.add("no-photo"));
if(MENNA_PHOTO)mennaImg.src=MENNA_PHOTO;

document.getElementById("musicJump").addEventListener("click",()=>{document.getElementById("song").scrollIntoView({behavior:"smooth"});toggleOurSong()});
function openStory(){playOurSong();document.getElementById("letter").scrollIntoView({behavior:"smooth"})}
document.getElementById("openLetter").addEventListener("click",openStory);
document.getElementById("envelopeBtn").addEventListener("click",openStory);
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

/* Memories gallery (photos come from MEMORY_PHOTOS above) */
const memoryButtons=[...document.querySelectorAll(".memory")],modal=document.getElementById("photoModal"),modalImage=document.getElementById("modalImage"),modalCaption=document.getElementById("modalCaption");
memoryButtons.forEach((b,i)=>{
  const src=MEMORY_PHOTOS[i],holder=b.querySelector(".photo-placeholder");
  if(!src)return;
  const img=new Image();
  img.alt="A memory of Ahmed and Menna";
  img.onload=()=>holder.replaceChildren(img); // only swaps in if the file really exists
  img.src=src;
});
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}
document.getElementById("closeModal").addEventListener("click",closeModal);modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
memoryButtons.forEach(b=>b.addEventListener("click",()=>{const img=b.querySelector("img");if(!img)return;modalImage.src=img.src;modalCaption.textContent=b.querySelector(".memory-caption").textContent;modal.classList.add("open");modal.setAttribute("aria-hidden","false")}));

document.getElementById("yesBtn").addEventListener("click",()=>{document.getElementById("answerMessage").textContent="Then let's make a thousand more memories. ♡";burstHearts(12)});
document.getElementById("secretBtn").addEventListener("click",()=>{document.getElementById("answerMessage").textContent="Psst... you're my favorite notification. Always. ♥";burstHearts(5)});
document.getElementById("heartButton").addEventListener("click",()=>{burstHearts(8);showToast("A little love sent to Menna ♡")});
function burstHearts(n){for(let i=0;i<n;i++){const h=document.createElement("span");h.className="floating-heart";h.textContent=Math.random()>.25?"♥":"♡";h.style.left=`${15+Math.random()*70}%`;h.style.bottom=`${10+Math.random()*18}px`;h.style.animationDelay=`${Math.random()*.45}s`;document.body.appendChild(h);setTimeout(()=>h.remove(),2100)}}
let toastTimer;function showToast(m){const t=document.getElementById("toast");t.textContent=m;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2400)}
document.querySelector(".hero").addEventListener("click",e=>{if(e.target.closest("button"))return;const h=document.createElement("span");h.className="floating-heart";h.textContent="♡";h.style.left=`${e.clientX}px`;h.style.top=`${e.clientY}px`;document.body.appendChild(h);setTimeout(()=>h.remove(),1600)});
