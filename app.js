class DrumKit {
    constructor(){
        this.beats = document.querySelectorAll(".beat");
        this.mutes = document.querySelectorAll(".mute")
    }
    activeBeat() {
        this.classList.toggle("active")
    }
    mutedNote() {
        this.classList.toggle("active")
    }
}

const drumKit = new DrumKit()

drumKit.beats.forEach(beat=> {
    beat.addEventListener("click", function() {
        drumKit.activeBeat
        console.log(this)
        beat.style.animation = `beatDrop 0.3s alternate ease-in-out 2`;
        beat.addEventListener("animationend", function() {
            beat.style.animation = ""
        })
    });
})

drumKit.mutes.forEach(mute => {
    mute.addEventListener("click",function(){
        console.log(this)
        drumKit.mutedNote
    })
})