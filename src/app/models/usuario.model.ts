import { environment } from "src/environments/environment"


export class Usuario{
    public constructor(
        public nombre:string,
        public email:string,
        public password?:string,
        public img?:string,
        public google?:boolean,
        public role?:string,
        public id?:string
    ){}
    get getImgUrl(){
        if(this.img.includes('https')){
            return this.img;
        }
        if(this.img){
            return environment.base_url+"/upload/usuarios/"+this.img;
        }else{
            return environment.base_url+"/upload/usuarios/not-found.png";
        }
    }
}