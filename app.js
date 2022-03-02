class DrumKit {
    constructor(){
        this.beats = document.querySelectorAll(".beat");
    }
    activeBeat() {
        this.classList.toggle("active")
    }
}

const drumKit = new DrumKit()

drumKit.beats.forEach(beat=> {
    beat.addEventListener("click", function() {
        console.log(this)
        drumKit.activeBeat
        beat.style.animation = `beatDrop 0.3s alternate ease-in-out 2`;
        beat.addEventListener("animationend", function() {
            beat.style.animation = ""
        })
    });
})