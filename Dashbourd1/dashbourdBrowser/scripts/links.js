export let links

 export function loadFromLoacatStorag(){
   links = JSON.parse(localStorage.getItem('Links'))||[]
 }
 loadFromLoacatStorag();


 export function deleteLink(linkId){
  const newArray = []
  links.forEach((linkelemnt)=>{
   if(linkelemnt.link!==linkId){
     newArray.push(linkelemnt)
   }
  })
 localStorage.setItem('Links',JSON.stringify(newArray))
 loadFromLoacatStorag();
 }

 export function addLink(newLink){
  console.log(links);
  links.push(newLink)
  localStorage.setItem('Links',JSON.stringify(links))
  console.log(links)
 }


