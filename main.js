/*search  */
var UI ={};
UI.enterPress=function(){
    document.querySelector('.js-search').addEventListener('keypress',function(e){
        if (e.which==13)
        {
            var inputValue=e.target.value;
            SoundCloudAPI.getTrack(inputValue);
        }
    });
}

UI.enterPress();

UI.clickSubmit=function(){
    document.querySelector('.js-search').addEventListener('click',function(e){
        var inputValue=document.querySelector('.js-search').value;
      SoundCloudAPI.getTrack(inputValue);
    });
}

UI.clickSubmit();


/*Query Soundcloud API  */

var SoundCloudAPI={};

SoundCloudAPI.init =function(){
    SC.initialize({
        client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
      });
}
SoundCloudAPI.init();

// find all sounds of buskers licensed under 'creative commons share alike'
SoundCloudAPI.getTrack =function(inputValue){
    SC.get('/tracks', {
        q: inputValue
      }).then(function(tracks) {
        console.log(tracks);

        var searchResult=document.querySelector('.js-search-results');
        searchResult.innerHTML=" ";
        SoundCloudAPI.renderTracks(tracks,searchResult);
      });
}




/*display the cards  button.setAttribute('data-id', track.id) /////THIS COMES DURING PLAY() !!*/
SoundCloudAPI.renderTracks =function(tracks,searchResult){
    tracks.forEach(function(track){
        var card = document.createElement('div');
        card.classList.add('card');

        // image
        var imageDiv = document.createElement('div');
        imageDiv.classList.add('image');

        var image_img = document.createElement('img');
        image_img.classList.add('image_img');
        image_img.src =track.artwork_url || 'http://lorempixel.com/100/100/abstract/';

        imageDiv.appendChild( image_img );

        // content
        var content = document.createElement('div');
        content.classList.add('content');

        var header = document.createElement('div');
        header.classList.add('header');
        header.innerHTML = '<a href="' + track.permalink_url + '" target="_blank"> '+track.title+ '</a>';

        content.appendChild( header );


        // button
        var button = document.createElement('div');
            
        button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

        var icon = document.createElement('i');
        icon.classList.add('add', 'icon');

        var buttonText = document.createElement('span');
        buttonText.innerHTML = 'Add to playlist';

        button.appendChild( icon );
        button.appendChild( buttonText );

        button.addEventListener('click',function(){
           SoundCloudAPI.getEmbed(track.permalink_url);
        });

        // card
        card.appendChild( imageDiv );
        card.appendChild( content );
        card.appendChild( button );

        searchResult.appendChild( card );
    });
}

/*add to playlist and play*/


SoundCloudAPI.getEmbed= function(trackURL) {
    SC.oEmbed(trackURL, {
        auto_play: true
      }).then(function(embed){
        console.log('oEmbed response: ', embed);
        var sideBar= document.querySelector('.js-playlist');
    
        var box =document.createElement('div');
        box.innerHTML= embed.html;

        sideBar.insertBefore(box, sideBar.firstChild);
        localStorage.setItem("key",sideBar.innerHTML);
      });
}
var sideBar=document.querySelector('.js-playlist');
sideBar.innerHTML=localStorage.getItem("key");

UI.resetButton = function(){

    var main = document.querySelector(".col-right");
   
    var resetBtn = document.createElement('i');
   
    resetBtn.classList.add("ui", "bottom", "attached", "button", "js-button");
   
    resetBtn.textContent = "reset";
   
    resetBtn.type = "submit";
    resetBtn.style="background-color:green";
   
    main.insertBefore(resetBtn,main.firstChild);
   
    resetBtn.addEventListener("click",function(){
   
    localStorage.clear();
   
    sideBar.innerHTML = "";
   
     });
   
   }
   
   UI.resetButton(); 