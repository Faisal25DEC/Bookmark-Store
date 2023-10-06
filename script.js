const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = []; //array for bookmarks
// show modal, focus on input
function showModal(){
    modal.classList.add('show-modal');
    websiteNameEl.focus();

}
//Modal event Listerner
modalShow.addEventListener('click',showModal);
modalClose.addEventListener('click', () => 
    modal.classList.remove('show-modal')
);
window.addEventListener('click',(e)=> (e.target === modal ? modal.classList.remove('show-modal'):false ) );

//Validate Form
function validate(nameValue, urlValue) {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

    const regex = new RegExp(expression);
    if(!nameValue || !urlValue){
        alert('Please fill both fields');
        return false;
    }
    if(urlValue.match(regex)){
        window.alert('match');
    }
    if(!urlValue.match(regex)){
        window.alert('Please type correct url');
        return false;
    }
    return true;
}
//Build bookmarks DOM
function buildBookmarks(){
    //Remove all bookmmark elements
    bookmarksContainer.textContent = '';
    //build items
    //using bookmarks array 
    //run a function on each item
    bookmarks.forEach((bookmark)=> {//->function for each object
    //this is arrow fucntion which will run for each object within the bookmarks array
    //structuring
    const {name,url} = bookmark;
    //recreating the item 
    //some people inner html
    //for our purpose we will do it in different way and create element one at at time
    const item = document.createElement('div');
    item.classList.add('item');
    //Close Icon
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas','fa-times');
    closeIcon.classList.add('close-icon');
    closeIcon.setAttribute('title', 'Delete Bookmark');
    closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
    //favicon / Link container
    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');
    const favicon = document.createElement('img');
    favicon.setAttribute('src',`https://www.google.com/s2/u/0/favicons?domain=${url}`);
    favicon.setAttribute('alt', 'Favicon'); 
    // Link 
    const link = document.createElement('a');
    link.setAttribute('href', `${url}`);
    link.setAttribute('target','_blank');
    link.textContent = name;
    //appending the div
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);

    });
}

function fetchBookmarks() {
    if(localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }
    else{
        bookmarks = [{
            name: 'Infinity Scroll',
            url: 'https://faisal-25.github.io/Infinity_Scroll/',}

        ];
        localStorage.setItem('bookmarks', bookmarks);
    }
    buildBookmarks();
}

//Delete Bookmarks
function deleteBookmark(url){
    console.log(url);
    bookmarks.forEach((bookmark,i) =>{
        if (bookmark.url === url) {
            bookmarks.splice(i, 1);
        }
    });
    console.log(bookmarks);
  //Update bookmarks array in localStorage , repopulate the DOM
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));  
  fetchBookmarks();
}
//Handle data from Form
function storeBookmark(e){
    e.preventDefault();
    // pull values
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if(!urlValue.includes('http://', 'https://')){
    //bactick allowing us to pass a  variable into the string    
        urlValue = `https://${urlValue}`;

    }
    //regular expression to validate the url
    //it allows u to match a string to a certain pattern
    //i.e. for example if url don't have spaces it will allow us to match that expression
    //get a regex expression for url pattern
    //and it can be used to validate url
    if(!validate(nameValue,urlValue)){
    return false;
  }   
//   bookmark object
  const bookmark = {
      name:nameValue,
      url: urlValue,
  }  
  bookmarks.push(bookmark);
  //Json.stringify->convert object to a json string thats going to be stored in a web server
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  fetchBookmarks();
 
  bookmarkForm.reset();
  websiteNameEl.focus();
}
//Local storage->saves data on browser session
//localStorage.setItem('key',value);
// localStorage.getItem(key);
//Event Listerner

bookmarkForm.addEventListener('submit', storeBookmark);


//On Load , Fetch Bookmarks
fetchBookmarks();