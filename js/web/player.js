$('.player').click(function() {
  var yid = $(this).data('yid');
  var htitle = $(this).html();
  $('#video header h1').html(htitle);
  var vUrl = 'http://www.youtube.com/v/' + yid + '?version=3';
  player.loadVideoByUrl(vUrl);
  //player.loadVideoById(yid);
  player.playVideo();
});

$('#video').unload(function(){
  player.stopVideo();
});

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '100%',
    width: '100%',
    videoId: 'U88nQ16Bm1M',
    html5: 1,
  });
}