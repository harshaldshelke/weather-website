const weatherForm= document.querySelector('form');
const searchInput=document.querySelector('input');
const msg1=document.querySelector('#msg-1');
const msg2=document.querySelector('#msg-2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();//to prevent default behavour of (getting refresh page and form)form

    const location=searchInput.value;
        msg1.textContent='loading..'
        msg2.textContent='';
    
    fetch('http://localhost:3000/weather?address='+ location).then((response)=>{
        
        console.log(location)
        response.json().then((data)=>{
          if(data.error){
            msg1.textContent=data.error;
          }
          else{
              msg1.textContent=data.location;
              msg2.textContent=data.weather;
          }  
        })
    })

})