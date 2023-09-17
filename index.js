const main = document.getElementById("main");
const voicesSelect = document.getElementById("voices");
const toggleButton = document.getElementById("toggle");
const closeButton = document.getElementById("close");
const textarea = document.getElementById("text");
const readButton = document.getElementById("read");

// 
const data = [
    {
        image:"drink",
        text:"I'm very Thirsty",
    },
    {
        image:"food",
        text:"I'm Hungry",
    },
    {
        image:"tired",
        text:"I'm Tired",
    },
    {
        image:"hurt",
        text:"I'm Hurt",
    },
    {
        image:"happy",
        text:"I'm happy",
    },
    {
        image:"angry",
        text:"I'm Angry",
    },
    {
        image:"sad",
        text:"I'm Sad",
    },
    {
        image:"scared",
        text:"I'm Scared",
    },
    {
        image: "outside",
        text: "I Want To Go Outside",
    },
    {
        image: "home",
        text: "I Want To Go Home",
    },
    {
        image: "school",
        text: "I Want To Go To School",
    },
    {
        image: "grandma",
        text: "I Want To Go To Grandmas",
    }
    
];
// console.log(data);

// Creating box to store the above data Array

function createBox(item){
    const box = document.createElement("div")
    const { image, text } = item;
    box.classList.add("box");
    box.innerHTML = `<img src='https://github.com/bradtraversy/vanillawebprojects/blob/master/speech-text-reader/img/${image}.jpg?raw=true'/>
    <p class="info">${text}</p>`;
    
    // console.log(box);

    box.addEventListener("click", () => handleSpeech(text, box));
    main.appendChild(box);
}

data.forEach(createBox);

let voices = [];

function getVoices(){
    voices = speechSynthesis.getVoices();
    // console.log(voices);

    voices.forEach((voice)=>{
        const option = document.createElement("option")
        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;
        voicesSelect.appendChild(option)
    });
}

function handleSpeech(text,box){
     setTextMessage(text);
     speakTest();
     box.classList.add("active");
     setTimeout(()=>box.classList.remove("active"),800);
}

const message = new SpeechSynthesisUtterance();
 function setTextMessage(text){
    message.text = text;
 }
 function speakTest(){
    speechSynthesis.speak(message);
 }
 function setVoice(e) {
    message.voice = voices.find((voice) => voice.name === e.target.value);
  }

  // Event listeners

  toggleButton.addEventListener("click", () => {
    document.getElementById("text-box").classList.toggle("show");
  });
  closeButton.addEventListener("click", () => {
    document.getElementById("text-box").classList.remove("show");
  });
  speechSynthesis.addEventListener("voiceschanged", getVoices);
  voicesSelect.addEventListener("change", setVoice);
  readButton.addEventListener("click", () => {
    setTextMessage(textarea.value);
    speakTest();
  });
  
  getVoices();
