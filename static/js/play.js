vidID = 0;
var app;
var vidID = 0;

$(document).ready(function () {
    app = new Vue({
        el: '#app',
        data: function() {
            return {
                board: board,
                thread: thread,
                tname: tname,
                paused: false,
                looped: false,
                duration: 0,
                currentTime: 0,
                tim: posts[0].tim,
                filename: posts[0].filename,
                no: posts[0].no
            }
        },
        computed: {
            VideoURL: function () {
                return "https://i.4cdn.org/"+this.board+"/"+this.tim+".webm";
            },

            BoardURL: function () {
                return 'https://boards.4chan.org/'+this.board+'/';
            },

            ThreadURL: function () {
                return 'https://boards.4chan.org/'+this.board+'/thread/'+this.thread;
            },

            PostURL: function () {
                return 'https://boards.4chan.org/'+this.board+'/thread/'+this.thread + '#p'+ this.no;
            },

            MP3URL: function () {
                return '/mp3/'+this.board+"/"+this.tim
            },

            PercentageComplete: function () {
                return (this.currentTime / this.duration) * 100
            }
        }
    });

    var vid = document.getElementById("mainvid");
    vid.addEventListener('timeupdate',function(){
        app.currentTime = vid.currentTime;
        app.duration = vid.duration;
    });

    vid.addEventListener('ended', function () {
        nextVideo();
    })


});

function nextVideo() {
    vidID++;
    updateVid()
}

function prevVideo() {
    vidID--;
    updateVid()
}


function toggleVideo() {
    var vid = document.getElementById("mainvid");
    app.paused = !app.paused;

    if(!vid.paused){
       vid.pause()
    }  else {
        vid.play()
    }
}

function toggleRepeat() {
    app.looped = !app.looped;
    document.getElementById("mainvid").loop = app.looped;
}

function updateVid(){
    app.tim = posts[vidID % posts.length].tim;
    app.filename = posts[vidID % posts.length].filename;
    app.no = posts[vidID % posts.length].no;
    document.getElementById("mainvid").load()
    app.paused = false;
}