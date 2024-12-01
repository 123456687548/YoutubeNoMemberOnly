// ==UserScript==
// @name         YoutubeNoMemberOnly
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Hides member only content on the Youtube frontpage
// @author       123456687548
// @match        https://www.youtube.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @updateURL    https://github.com/123456687548/YoutubeNoMemberOnly/raw/master/YoutubeNoMemberOnly.user.js
// @downloadURL  https://github.com/123456687548/YoutubeNoMemberOnly/raw/master/YoutubeNoMemberOnly.user.js
// @grant        none
// ==/UserScript==
var memberOnlyCounterValue = -1;

var memberOnlyCounter = document.createElement('div');
window.memberOnlyCounterDiv = memberOnlyCounter;
memberOnlyCounter.setAttribute('id', 'memberOnlyCounter');
memberOnlyCounter.setAttribute('title', '');
memberOnlyCounter.setAttribute('style', 'color:white; font-size:10px;');

var memberOnlyCounterAdded = false;
var uniqueVideos = new Set();

updateCounter();

function addCounter(){
    var divButtons = document.getElementById('buttons');

    divButtons.insertBefore(memberOnlyCounter, divButtons.firstChild)
}

window.addCounter = addCounter;

function updateCounter(){
    memberOnlyCounterValue++;
    memberOnlyCounter.textContent = `Removed ${memberOnlyCounterValue} member only Videos`;

    var videos = '';
    for (const video of uniqueVideos.values()) {
        videos = `${videos}\n${video}`;
    }
    memberOnlyCounter.title = videos;
}

window.updateCounter = updateCounter;

function findMemberOnlyStuff(){
    return document.getElementsByClassName('badge-style-type-members-only');
}

window.findMemberOnlyStuff = findMemberOnlyStuff;

window.destroyMemberOnly = true;

function hideMemberOnlyStuff(){
    var items = findMemberOnlyStuff();

    if (items.length == 0){
        return;
    }

    if (!memberOnlyCounterAdded){
        addCounter();
    }

    for (var i = 0; i < items.length; i++){
        var title = items[i].parentElement.parentElement.firstChild.children[1].firstChild.textContent;
        var channel = items[i].parentElement.parentElement.children[1].children[0].children[0].children[0].children[0].children[0].children[0].textContent;
        var video = `${channel} : ${title}`;

        if(!uniqueVideos.has(video)){
            uniqueVideos.add(video);
            updateCounter();

            console.log(items[i])
            console.log(title)
            console.log("Removed member only shit!");
        }

        if(window.destroyMemberOnly){
            items[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
        }
    }
}

window.hideMemberOnlyStuff = hideMemberOnlyStuff;

var interval = setInterval(hideMemberOnlyStuff, 100);