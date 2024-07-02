console.log("Welcome to Melody")

//Initialise the variables
let songIndex = 0 ; //means that 0th song is playing right now
let audioElement = new Audio('songs/1.mp3')
let masterPlay = document.getElementById('masterPlay')
let ProgressBar = document.getElementById('ProgressBar')
let gif = document.getElementById('gif')
let SongsCollection = Array.from(document.getElementsByClassName('SongsCollection'))
let masterSongname = document.getElementById('masterSongname')

let songs = [{songName : "Love Story" , filePath : "songs/1.mp3" , coverPath : "covers/cover1.jpg"},
{songName : "Criminal" , filePath : "songs/2.mp3" , coverPath : "covers/cover2.jpg"},
{songName : "Shape of You" , filePath : "songs/3.mp3" , coverPath : "covers/cover3.jpg"},
{songName : "Until I found You" , filePath : "songs/4.mp3" , coverPath : "covers/cover4.jpg"},
{songName : "Sanam Re" , filePath : "songs/5.mp3" , coverPath : "covers/cover5.jpg"},
{songName : "Uff Teri Adaa" , filePath : "songs/6.mp3" , coverPath : "covers/cover6.jpg"},
{songName : "Chal Waha Jaatein hai" , filePath : "songs/7.mp3" , coverPath : "covers/cover7.jpg"},
{songName : "Lambi Judaai" , filePath : "songs/8.mp3" , coverPath : "covers/cover8.jpg"},
{songName : "Hum Tumko Chura Lenge" , filePath : "songs/9.mp3" , coverPath : "covers/cover9.jpg"},
{songName : "The Night We Met" , filePath : "songs/10.mp3" , coverPath : "covers/cover10.jpg"}
]

SongsCollection.forEach((element,i)=>{
    // console.log(element,i)
    element.getElementsByTagName("img")[0].src=songs[i].coverPath
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName
})

//audioElement.play()

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play()
        //icon play convert to pause and vice versa
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity = 1
    }
    else{
        audioElement.pause()
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play')
        gif.style.opacity = 0
    }
}) 
//Listening to events
audioElement.addEventListener('timeupdate', ()=>{
    //console.log('timeupdate')->for seeing in console that whether timeupdate is working or not
    //updating seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    //console.log(progress)->for seeing in console that whether progress is working or not
    ProgressBar.value = progress //our seek bar will increase as amount of song progress will be done
})
ProgressBar.addEventListener('change' ,()=>{
    audioElement.currentTime = (ProgressBar.value*audioElement.duration)/100;
})

const makeAllplays=()=>{
    
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
    console.log(e.target)
    makeAllplays()
    songIndex=parseInt(e.target.id)
    e.target.classList.remove('fa-circle-play')
    e.target.classList.add('fa-circle-pause')
    //audioElement.src='songs/1.mp3'
    //template string needs backtick ` to work properly, I was using single quote '
    audioElement.src=`songs/${songIndex+1}.mp3`
    masterSongname.innerText = songs[songIndex].songName
    audioElement.currentTime=0 //song change hua h therefore
    audioElement.play()
    gif.style.opacity=1
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
    })
})
//In JS prefer backtick rather '' single colon
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex=0
    }
    else
    {
        songIndex+=1
    }
    audioElement.src=`songs/${songIndex+1}.mp3`
    masterSongname.innerText = songs[songIndex].songName
    audioElement.currentTime=0 //song change hua h therefore
    audioElement.play()
    gif.style.opacity=1
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex=0
    }
    else
    {
        songIndex-=1
    }
    audioElement.src=`songs/${songIndex+1}.mp3`
    masterSongname.innerText = songs[songIndex].songName
    audioElement.currentTime=0 //song change hua h therefore
    audioElement.play()
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
})