let chatOverlayEnabled=false,origParent=null,origNext=null,overlay=null;
function toggleChatOverlay(){
  const video=document.querySelector('div[class*="DivVideoContainer"]'),
        chat=document.querySelector('div[class*="DivChatMessageList"]');
  if(!chat){console.log("Chat container not found.");return;}
  if(chatOverlayEnabled){
    if(overlay){overlay.remove();overlay=null;}
    if(origParent){origNext?origParent.insertBefore(chat,origNext):origParent.appendChild(chat);}
    if(video)video.style.display="";
    chat.style.position="";chat.style.width="";chat.style.height="";chat.style.overflowY="";
  } else {
    if(video)video.style.display="none";
    origParent=chat.parentNode;origNext=chat.nextSibling;
    overlay=document.createElement("div");
    overlay.style.position="fixed";
    overlay.style.top="0";
    overlay.style.left="0";
    overlay.style.width="100vw";
    overlay.style.height="100vh";
    overlay.style.backgroundColor="#333";
    overlay.style.display="flex";
    overlay.style.justifyContent="center";
    overlay.style.alignItems="center";
    overlay.style.zIndex="9999";
    document.body.appendChild(overlay);
    overlay.appendChild(chat);
    chat.style.position="relative";
    chat.style.width="300px";
    chat.style.height="80vh";
    chat.style.overflowY="auto";
  }
  chatOverlayEnabled=!chatOverlayEnabled;
}
chrome.runtime.onMessage.addListener(msg=>{if(msg.action==="toggleChat")toggleChatOverlay();});
