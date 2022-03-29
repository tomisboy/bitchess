$(document).ready(function (){
    $.post("/gettopplayer", function(data){
        setLeaderboard(data)
    })
})

function setLeaderboard(data){
    console.log(data)
    var leaderboardList = document.getElementById('leaderboardList')
    for(var i=1; i <= data.length; i++) {
        leaderboardList.innerHTML += '<li>' + i + data[i-1].username + data[i-1].rating + '</li>'
    }
}