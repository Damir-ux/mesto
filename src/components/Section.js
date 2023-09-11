class Section {
    constructor(renderer, containerSelector) {      
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
      }
      
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

    