const TypeWriter = function(txtElement, words, wait =300){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait,10);
    this.type();
    this.isDeleting = false;
    
}

// Type Method
TypeWriter.prototype.type = function(){
   // current index of word
   const current = this.wordIndex % this.words.length;
   // Get full text of current word
   const fullTxt = this.words[current];
   
   // check if deleting
   if(this.isDeleting){


    //remove char

       
      this.txt = fullTxt.substring(0, this.txt.length -1);

   }else{
       // Add char

       this.txt = fullTxt.substring(0, this.txt.length +1);

   }

   // insert txt into element
   this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

   // initial Type speed
   let typespeed = 300;

   if(this.isDeleting){
       typespeed /= 2;
   }

   // if word is complete
   if(!this.isDeleting && this.txt === fullTxt){
       // make pause end
       typespeed = this.wait;
       // set delete to true
       this.isDeleting = true;

   }else if(this.isDeleting && this.txt === ''){
       this.isDeleting=false;
       //move to next word
       this.wordIndex++;
       // pause before start typing
       typespeed = 500;
   }

    setTimeout(() => this.type(), typespeed)
}

// Init on DOM Load

document.addEventListener('DOMContentLoaded', init);

// Init App

function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);

}