$(document).ready(function (){
    $.post("/gettopplayer", function(data){
        setLeaderboard(data)
    })
})

function setLeaderboard(data){
    console.log(data)
    var leaderboardList = document.getElementById('leaderboardList')
    for(var i=1; i <= 100; i++) {
        leaderboardList.innerHTML += '<tr>' + '<td>' + i + '</td>' + '<td>' + data[1].username + '</td>' + '<td>' + data[1].rating + '</td>' + '</tr>'
    }
}