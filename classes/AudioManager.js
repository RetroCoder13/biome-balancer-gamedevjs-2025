class AudioManager{
    constructor(){
        this.sounds = {}
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

    addSound(path,group,state,loop){
        let sound = new Audio()
        sound.src = path
        sound.loop = loop
        this.sounds[group][state].sounds.push(sound)
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