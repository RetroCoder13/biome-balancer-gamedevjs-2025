class AudioManager{
    constructor(){
        this.sounds = {}
        this.totalSounds = 0
        this.loadedSounds = 0
        this.loaded = false
    }

    createGroup(group){
        this.sounds[group] = {}
    }

    createState(group,sound){
        this.sounds[group][sound] = {
            "playing":false,
            "sounds":[]
        }
    }

    addSound(path,group,state,loop,volume){
        let sound = new Audio()
        sound.src = path
        sound.loop = loop
        sound.volume = volume
        this.sounds[group][state].sounds.push(sound)
        let that = this
        this.sounds[group][state].sounds[this.sounds[group][state].sounds.length-1].oncanplaythrough = function(){that.loadedSounds++;that.loaded = that.loadedSounds >= that.totalSounds}
        this.totalSounds++
    }

    play(group,state){
        if(!this.sounds[group][state].playing){
            this.sounds[group][state].playing = true
            this.sounds[group][state].sounds[0].play()
        }
    }

    pause(group,state){
        if(this.sounds[group][state].playing){
            this.sounds[group][state].playing = false
            this.sounds[group][state].sounds[0].pause()
        }
    }

    stop(group,state){
        this.sounds[group][state].playing = false
        this.sounds[group][state].sounds[0].pause()
        this.sounds[group][state].sounds[0].currentTime = 0
    }
}