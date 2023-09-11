class Section {
    constructor(renderer, containerSelector) {      
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
      }
      
    
      // renderItems(items, user) {
      //   this._items.forEach(item => {
      //     this._renderer(item, user);
      //   });
      // }

  /**Отобразить контент */
      // renderItems(items, user) {
      //   items.forEach(item => {
      //   this._renderer(item, user);
      // });
      // }

      addCardFromServ(dataCard) {
        dataCard.forEach(element => {
            this._renderer(element);
        });
      }
    
      appendItem(cardElement) {
        this._container.append(cardElement);
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
      
    