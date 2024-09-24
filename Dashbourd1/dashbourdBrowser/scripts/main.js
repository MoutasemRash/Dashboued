// start the timer js 
import { addLink, deleteLink, links } from "./links.js"




setInterval(()=>{
  const today = dayjs()
  const hour = today.format('H')
  const minutes = today.format('m')
  const seconds  = today.format('s')

const timer = document.querySelector('.js-timer')
timer.innerHTML = `${hour} : ${minutes} : ${seconds}`
},1000)

const today = dayjs()
const day = today.format('D')
const month = today.format('MMM')
const year = today.format('YYYY')

const date = document.getElementById('date').innerHTML = `${day} ${month} ${year}`

// start the links js

function renderLinksSection(){
  let totalHtml = ''

  links.forEach((link)=>{
  const Html = `<div class="dashboard-menu-item--links--link">
  <a href="${link.link}"  target="_blank" class="link--link">
  <div class="link-icon">
    <img src="./images/${link.icon}.png" alt="link imag">
  </div>
  <div class="link-name">
    ${link.name}
  </div>
  </a>
  
  <div class="link-delete-btn js-delete-btn" data-link-id =${link.link}>
    <button>-</button>
  </div>
  </div>`
    totalHtml+= Html;
  })
  
  document.getElementById('links-box').innerHTML= totalHtml;
  
  /// add js for delete buttons  
  const deleteButtons = document.querySelectorAll('.js-delete-btn')
  deleteButtons.forEach((deleteButton)=>{
    deleteButton.addEventListener('click',()=>{
     const linkId = deleteButton.dataset.linkId
      deleteLink(linkId);
     
     renderLinksSection();


    })
  })
}


renderLinksSection()
const addLinkForm = document.getElementById('add-new-link-form')
document.getElementById('add-form-link-btn').addEventListener('click',()=>{
  if(addLinkForm.classList.contains('hide-add-new-link-form'))
        addLinkForm.classList.remove('hide-add-new-link-form')
  else
  addLinkForm.classList.add('hide-add-new-link-form');
})

addLinkForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  const name = document.getElementById('link-name').value;
  const icon = document.getElementById('link-icon').value;
  const link = document.getElementById('link-link').value;
 const newLink = {
  name:name,
  icon:icon,
  link:link
 }
 addLink(newLink);
 renderLinksSection();
 document.getElementById('link-name').value = '';
 document.getElementById('link-icon').value = ''
 document.getElementById('link-link').value = '';
addLinkForm.classList.add('hide-add-new-link-form');

  
})


// add js to weather column 

const weathercards = document.getElementById('weather-cards')
const dayjss = dayjs();
const dayarr = []
dayarr[0] = dayjss.add(0,'day').format('dddd')
dayarr[1] = dayjss.add(1,'day').format('dddd')
dayarr[2] = dayjss.add(2,'day').format('dddd')
dayarr[3] = dayjss.add(3,'day').format('dddd')



async function  fetchWeatherData(url){
  fetch(url).then(respone=>respone.text()).then(data =>{
   const Weather =  JSON.parse(data);
   let totalHTml = ''
console.log(Weather)
 for(let i = 0 ;i<3;i++){
  const Html = `  
 <div class="dashboard-menu-item-weather-cards-card">      
           <div class="weather-icon">
             <img src="${Weather.forecast.forecastday[i].day.condition.icon}" alt="link imag">
           </div>
           <div class="weather-info">
             <div class="weather-day">
               ${dayarr[i]}
             </div>
             <div class="weather-describtion">
               <span class="weather-state">
                 ${Weather.forecast.forecastday[i].day.maxtemp_c}
               </span>
               <span class="weather-dgree">
                 ${Weather.forecast.forecastday[i].day.condition.text}
               </span>
             </div>
           </div>
         
         </div>`
 
 totalHTml+=Html;
 }
 weathercards.innerHTML = totalHTml
   
  })
 
 }



function getLocation(){
  navigator.geolocation.getCurrentPosition((position)=>{
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  const url = `http://api.weatherapi.com/v1/forecast.json?key=e559ff74f5234beeaf3122252242409&q=${lat},${long}&days=5&aqi=no&alerts=no`
  fetchWeatherData(url)
  })
}
getLocation()





// start the js for the news card 

function renderTheNewsCard (news){
  const newsElement = document.getElementById('news-container');
  const random = Math.random()*100;
  const ranIntger = parseInt(random)

  const html = `  
  <div class="dashboard-menu-item-news-card">
     <div class="news-img">
       <img src="${news.articles[ranIntger].urlToImage}" alt="news img">
     </div>
     <div class="news-info">
       <div class="news-author">
         ${news.articles[ranIntger].author}
       </div>
       <div class="news-describtion">
         ${news.articles[ranIntger].description}
       </div>
     </div>
   </div>`

   newsElement.innerHTML = html;
}


async function fetchNewsData(){
  fetch('https://newsapi.org/v2/everything?q=tesla&from=2024-08-24&sortBy=publishedAt&apiKey=a9c16493c4894acfa64ac2a3b018aadd')
  .then(respone=>respone.text())
  .then(data =>{

    const news = JSON.parse(data)
setInterval(()=>{
  renderTheNewsCard(news)
},10000)
       
  })
}


fetchNewsData();

// add js for chang bg button 
const body = document.getElementById('body')
document.getElementById('change-bg-button').addEventListener('click',()=>{
  const random = Math.random()*200;
  const integerNum = parseInt(random);
  body.style.cssText = ` 
   background-image: url('https://picsum.photos/id/${integerNum}/1350/1800');
  background-repeat: no-repeat;`
})

// add js for note column 


const input = document.querySelector('.js-note-input')
input.innerHTML = JSON.parse(localStorage.getItem('note'))

input.addEventListener('input',function(){
   localStorage.setItem('note',JSON.stringify(this.innerHTML))
})








// const array = [{icon: 'google', name: 'google', link: 'htttp:dsfksfhhfowhf'},
//   {icon: 'facebook', name: 'facebook', link: 'htttp:dsfkhhfowhf'},
//   {icon: 'instagram', name: 'instagram', link: 'htttp:sfksfhhfowf'}]


