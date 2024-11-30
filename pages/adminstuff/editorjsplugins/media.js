class Mediajs{
    self;
    constructor({data,api,config}){
        this.config = config || {};
        this.api = api
        this.cont = document.createElement("div");
        this.label = document.createElement("label");
        this.media = document.createElement('input');
        this.preview = undefined
        this.file = undefined
        this.ismedia = false;
        self = this;
    }
    static get toolbox() {
        return {
          title: 'Image',
          icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
        };
    }
    static get hasmedia(){
        if(self)
        return self.ismedia;
    } 
    render(){
        
        this.media.type = "file"
        this.media.id= "mdsf"
        this.media.hidden = true;
        this.label.setAttribute("for", this.media.id)
        this.label.innerText = "Upload Media"
        this.cont.innerHTML=""
        this.cont.append(this.label)
        this.cont.append(this.media)
        this.onEvent();
        this.api.ui.wrapper = this.cont
        self = this;
        return this.cont;
    }
    static set  updata(vale){
        self.cont.innerHTML = vale;
    }
    static get up(){
        if(self)
        return self;
    }
    onEvent(d = ()=>{}){
       
        this.api.listeners.on(this.media, 'change', (ev)=>{
            console.log(ev.target.files,"datachanged")
            this.file = ev.target.files[0];
            this.ismedia = true;
                if (this.file) {
                    const reader = new FileReader();
                    this.cont.innerHTML = "";
                    reader.onload = (e) => {
                    // Handle the file data here
                        if (this.file.type.startsWith('image/')) {
                            this.preview = document.createElement("img");
                            this.preview.src = e.target.result;
                        } else  
                        if (this.file.type.startsWith('video/')) {
                            this.preview = document.createElement("video");
                            this.preview.controls = true;
                            this.src = document.createElement("source");
                             
                            this.src.src = e.target.result;
                            this.src.type = this.file.type;
                            this.preview.append(this.src);
                            
                        } else
                        if (this.file.type.startsWith('audio/')) {
                            this.preview = document.createElement("audio");
                            this.src = document.createElement("source"); 
                            this.preview.controls = true;
                            this.src.src = e.target.result;
                            this.src.type = this.file.type;
                            this.preview.append(this.src);
                            
                        } else {
                            this.preview.textContent = "Not Right data type"
                        }
                        this.cont.append(this.preview);
                    };

                    // Read the file as a data URL
                    reader.readAsDataURL(this.file);
                    //this.save(this.cont);
                }
            d(ev)
        },false)
    }
    destroy(){
        this.api.listeners.off(this.media,'change',()=>{

        },false);
    }
    renderSettings(){
        const wrapper = document.createElement('div');

        // this.settings.forEach( tune => {
        //   let button = document.createElement('div');
    
        //   button.classList.add('cdx-settings-button');
        //   button.innerHTML = tune.icon;
        //   wrapper.appendChild(button);
    
        //   button.addEventListener('click', () => {
        //     this._toggleTune(tune.name);
        //     button.classList.toggle('cdx-settings-button--active');
        //   });
        // });
    
        return wrapper;
      }
    save(blockContent){
        
        //console.log(blockContent,this.file);
        return {
          url: blockContent.value,
          raw:String(blockContent.innerHTML),
          type:String(this.preview.tagName).toLowerCase(),
          file:this.file

        }
    }
}

export default Mediajs;