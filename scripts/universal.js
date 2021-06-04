includeHTML();

//Get the button
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
   document.body.style.overflow="hidden";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
   document.body.style.overflow="visible";
}


/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}





function buttonToggle() {
    document.getElementById('calculateButton').style.display = "none";
    document.getElementById('resetButton').style.display = "block";
}

function spinLoader() {
    document.getElementById("loader").style.display = "block";
    document.getElementById('outputContainer').style.visibility = "collapse";
    setTimeout(function() {
        document.getElementById('outputContainer').style.visibility = "visible";
        document.getElementById("loader").style.display = "none";
    }, 500);
}

function numberWithCommas(x) {
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '') lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
};
function goalCal() {
    buttonToggle();
    spinLoader();
    var tot = parseInt(document.getElementById('input1').value);
    var t = parseInt(document.getElementById('input2').value);
    var r = (document.getElementById('input3').value);

    document.getElementById("showip1").innerHTML = numberWithCommas(tot);
    document.getElementById("showip2").innerHTML = numberWithCommas(t);
    document.getElementById("showip3").innerHTML = numberWithCommas(r);
    
    goalCallumpsum(tot, t, r);
    goalCalSip(tot, t, r);
}

function goalCallumpsum(tot, t, r) {
    var p = tot / (Math.pow(1 + 0.01 * r, t));
    p = Math.round(p);
    document.getElementById('goalls').innerHTML=numberWithCommas(p);
    
}

function goalCalSip(tot, t, r) {
    var n = t * 12;
    var i = r / 1200;
    var mi = tot / (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
    mi = Math.round(mi);
    
    document.getElementById('goalsip').innerHTML=numberWithCommas(mi);
    
}

function retireCal() {
    buttonToggle();    spinLoader();
    var me = parseInt(document.getElementById('input1').value);
    var t= (document.getElementById('input2').value);
    var inflation=document.getElementById('input3').value;
    var adjMe=me*(Math.pow(1 + 0.01 * inflation,t));
    document.getElementById('showip1').innerHTML=numberWithCommas(me);
    document.getElementById('showip2').innerHTML=t+" years";
    document.getElementById('showip3').innerHTML=inflation+"%";
    document.getElementById('resultInfAdj').innerHTML=numberWithCommas(Math.round(adjMe));
    document.getElementById('corpusReq').innerHTML=numberWithCommas(Math.round(adjMe*12/0.05));
}

//Code for PWA
window.addEventListener('load', () => {
  registerSW();
});

async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('../sw.js');
    } catch (e) {
      console.log(`SW registration failed`);
    }
  }
}

// Code for Web Share API
function shareMe(){
   if (navigator.share) {
     navigator.share({
       title: 'fincal.in',
       text: 'This is an awesome website that i found online, hope you will love it too',
       url: 'https://web.dev/',
     })
       .then(() => console.log('Successful share'))
       .catch((error) => console.log('Error sharing', error));
   }
}

//Code for Slide Show
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}