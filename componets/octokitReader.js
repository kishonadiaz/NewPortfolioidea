import { Octokit, App } from "https://esm.sh/octokit";
import data from '../config.json' with { type: "json" };

class OctokitApiReader{
    constructor(){
        this.ar = [];
        this.octokitap = new Octokit({ auth: data.ockokitapi });
    }
    add(val){
        this.ar.push(val);
    }
    clear(){
        this.ar = [];
    }
    getquery(){
        return this.ar.join("/").replaceAll(",");
    }
    async getAllrepos(){
        return await this.octokitap.request(`/users/kishonadiaz/repos`);
    }
    async OctRepoRequest(method,query=''){
        var args = [...arguments];
        var data = '';
        
        if(args.length > 2){
            
            data = args.slice(2)
            
        }
        console.log(args,data.join("/").replaceAll(",","/"));
        
        
        return await this.octokitap.request(`${method} /repos/kishonadiaz/${query}/${data.join("/").replaceAll(",","/")}`,{
            owner:'kishonadiaz',
            repo: query,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
    }
    async retiverepo(method,repo,query) {
        return await this.OctRepoRequest(method,repo,query);
    }
    decodeData(data){
        return decodeURIComponent(window.atob(data));
    }
    
}

export default OctokitApiReader;