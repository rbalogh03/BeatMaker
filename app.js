class DrumKit {
    constructor(){
        this.beats = document.querySelectorAll(".beat");
        this.mutes = document.querySelectorAll(".mute");
        this.play = document.querySelector(".play")
        this.tempoSlider = document.querySelector("#tempo")
        this.tempoNrSpan = document.querySelector(".tempoNr")
        this.tempoControlButtons = document.querySelectorAll(".tempoControls button")
        this.index = 0;
        this.bpm = 90;
        this.isPlaying = null;
        this.kickAudio = document.querySelector(".kickSound")
        this.snareAudio = document.querySelector(".snareSound")
        this.clapAudio = document.querySelector(".clapSound")
        this.currentKick = "./sounds/kick-heavy.wav"
        this.currentSnare = "./sounds/cowbell-808.wav"
        this.currentClap = "./sounds/clap-fat.wav"
    }
    activeBeat() {
        this.classList.toggle("active")
    }
    mutedNote() {
        this.classList.toggle("active")
    }
    clickedBtn() {
        this.style.animation = "clickedBtn 0.2s alternate ease-in-out 2"
    }

    //change the tempo with buttons
    addTempo(value) {
        let convertedValue = parseInt(value)
        convertedValue += 10
        return convertedValue
    }
    slowTempo(value) {
        let convertedValue = parseInt(value)
        convertedValue -= 10
        return convertedValue
    }

    repeatIt() {
        console.log(this.kickAudio)
        let step = this.index % 8;
        console.log(step)
        let currentBeat = document.querySelectorAll(`.b${step}`);
        currentBeat.forEach(beat => {
            beat.style.animation = "beatDrop 0.3s alternate ease-in-out 2"
            beat.addEventListener("animationend",function(){
                this.style.animation = ""
            })
            if (beat.classList.contains("active")) {
                if (beat.classList.contains("kick-beat")) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (beat.classList.contains("snare-beat")) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (beat.classList.contains("clap-beat")) {
                    this.clapAudio.currentTime = 0;
                    this.clapAudio.play();
                }
            }
        })
        this.index++
    }

    startIt() {
        let interval = (60 / this.bpm) * 1000;
        if (this.isPlaying) {
            clearInterval(this.isPlaying);
            console.log(this.isPlaying);
            this.isPlaying = null;
            this.play.classList.remove("active")
            this.play.innerText = "Play"
          } else {
            this.isPlaying = setInterval(() => {
              this.repeatIt();
            }, interval);
            this.play.classList.add("active")
            this.play.innerText = "Stop"
          }
    }

    stopIt() {
        if (this.play.classList.contains("active")) {
            clearInterval(this.isPlaying);
            console.log(this.isPlaying);
            this.isPlaying = null;
            this.play.classList.remove("active")
            this.play.innerText = "Play"
        }
    }


}

const drumKit = new DrumKit()

drumKit.beats.forEach(beat=> {
    beat.addEventListener("click",drumKit.activeBeat);
})

drumKit.mutes.forEach(mute => {
    mute.addEventListener("click",drumKit.mutedNote)
    mute.addEventListener("click",drumKit.clickedBtn)
    mute.addEventListener("animationend",function(){
        this.style.animation = ""
    })
})

drumKit.play.addEventListener("click",drumKit.clickedBtn)
drumKit.play.addEventListener("animationend",function(){
    this.style.animation = ""
})

drumKit.tempoControlButtons.forEach(button => {
    button.addEventListener("click",drumKit.clickedBtn)
    button.addEventListener("animationend",function(){
        this.style.animation = ""
    })
})

drumKit.tempoControlButtons[1].addEventListener("click",function() {
    let sliderValue = drumKit.tempoSlider.value
    let newValue = drumKit.addTempo(sliderValue);
    if (newValue <= drumKit.tempoSlider.max) {
        drumKit.tempoSlider.value = newValue
        drumKit.tempoNrSpan.innerHTML = newValue
    } else {
        drumKit.tempoSlider.value = drumKit.tempoSlider.max
        drumKit.tempoNrSpan.innerHTML = drumKit.tempoSlider.max
    }
})

drumKit.tempoControlButtons[0].addEventListener("click",function() {
    let sliderValue = drumKit.tempoSlider.value
    let newValue = drumKit.slowTempo(sliderValue);
    if (newValue >= drumKit.tempoSlider.min) {
        drumKit.tempoSlider.value = newValue
        drumKit.tempoNrSpan.innerHTML = newValue
        drumKit.bpm = parseInt(newValue)
        drumKit.stopIt()

    } else {
        drumKit.tempoSlider.value = drumKit.tempoSlider.min
        drumKit.tempoNrSpan.innerHTML = drumKit.tempoSlider.min
        drumKit.bpm = parseInt(newValue)
        drumKit.stopIt()
    }
})


drumKit.tempoSlider.addEventListener("change",function(e){
    drumKit.bpm = parseInt(e.target.value)
    drumKit.tempoNrSpan.innerHTML = e.target.value
    drumKit.stopIt()
})

drumKit.play.addEventListener("click",function(){
    drumKit.repeatIt();
    drumKit.startIt();
})