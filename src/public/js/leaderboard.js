$(document).ready(function (){
    $.post("/gettopplayer", function(data){
        setLeaderboard(data)
    })
})

function setLeaderboard(data){
    console.log(data)
}