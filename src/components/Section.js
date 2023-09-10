class Section {
    constructor({ items, renderer }, containerSelector) {
      this._items = items;
      this.renderer = renderer;
      this._container = document.querySelector(containerSelector);
      }
      
    
      renderItems() {
        this._items.forEach(item => {
          this.addItem(this.renderer(item));
        });
      }
    
      addItem(cardElement) {
        this._container.prepend(cardElement);
      }


      prependItem(element) {
        this._container.prepend(element);
      }

      
    }
    
    export default Section;



    // class Section {
    //   constructor(renderer, containerSelector) {        
    //     this.renderer = renderer;
    //     this._container = document.querySelector(containerSelector);
    //     }
        
      
    //    addCardFromArray(dCard) {
    //     dCard.forEach(element => {
    //         this._renderer(element);
    //       });
    //     }
      
    //     addItem(cardElement) {
    //       this._container.prepend(cardElement);
    //     }
  
        
    //   }
      
    //   export default Section;
      
    