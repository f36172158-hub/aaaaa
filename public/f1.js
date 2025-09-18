let holdTimer=null,taps=0,box=null;

async function fetchMsg(){
  try{
    const r=await fetch('/latest');
    const j=await r.json();
    if(j&&j.success&&j.message){
      if(!box){
        box=document.createElement('div');
        Object.assign(box.style,{
          position:'fixed',bottom:'0',left:'0',
          maxWidth:'300px',maxHeight:'40%',
          overflow:'auto',zIndex:999999,
          background:'#111',color:'#fff',
          padding:'6px 10px',
          font:'14px sans-serif',
          borderRadius:'8px 8px 0 0',
          display:'none',whiteSpace:'pre-line'
        });
        document.body.appendChild(box);
      }
      box.textContent=j.message;
      box.style.display='block';
    }
  }catch(e){console.log('❌',e)}
}

document.addEventListener('mousedown',e=>{
  if(e.button===0){
    holdTimer=setTimeout(fetchMsg,3000);
  }
});

document.addEventListener('mouseup',()=>clearTimeout(holdTimer));

document.addEventListener('click',e=>{
  if(e.button===0){
    taps++;
    if(taps>=3){
      taps=0;
      if(box) box.style.display=box.style.display==='none'?'block':'none';
    }
  }
});
