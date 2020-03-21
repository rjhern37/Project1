//Google Maps API Key
// AIzaSyAjby3pU0mhZRvOI5WS5YoOkWUpd6XJ27o

// Delay Button display for effect
document.addEventListener("DOMContentLoaded", function() {
    let box = document.getElementById("scale");
    setTimeout(function() {
      box.classList.add("scale-in");
    }, 500);
  });
  
  /* hide when expanded*/
  document.querySelector(".search-field").addEventListener("focus", function() {
    let hidden = document.querySelectorAll(".search-hide");
  
    for (let i = 0; i < hidden.length; ++i) {
      hidden[i].style.display = "none";
    }
  });
  
  /* show when expanded*/
  document
    .querySelector(".search-field")
    .addEventListener("focusout", function() {
      let hidden = document.querySelectorAll(".search-hide");
      for (let i = 0; i < hidden.length; ++i) {
        hidden[i].style.display = "block";
      }
    });
  
  
  
  
  // Event listener for keypress in search box/open
  document.getElementById('search-input').addEventListener('keyup', searchEngine);
  document.getElementById('search-input').addEventListener('focus', searchEngine);
  
    
    // Local Search Engine *Basic
  function searchEngine(e){
    
    let input = document.getElementById('search-input');
    let html = '';
    let matchingResults = [];
    let heading = document.querySelector('.search-heading');
    
  //   Find Matching Results
    if(input.value === ''){
      
      searchResults.forEach(function(obj){
        heading.textContent = 'Most Visited';
        
        if(obj.frequent === true){
          matchingResults.push(obj);
        }
      })
    } else {
      
      heading.textContent = 'Search Results';
      searchResults.forEach(function(obj){
        if(obj.title.toUpperCase().includes(input.value.toUpperCase())){
          matchingResults.push(obj);
        }
      })
    }
    
  
  
    if(matchingResults.length > 0){
  
      matchingResults.forEach(function(el){
        html += `<li><a class="grey-text" href="${el.link}">${boldString(el.title, input.value)}</a></li>`
      })
      document.querySelector('.popup-list').innerHTML = html;
    } else{
      html = `<li>There are no suggestions for your query.</li>`
      document.querySelector('.popup-list').innerHTML = html;
    }
  
  }
  
