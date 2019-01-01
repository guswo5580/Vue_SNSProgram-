//filters mixin

export default {
    filters : {
        removeHashtag(value) {
            let branch = value.indexOf('#');
            if(!value) return ''
            else {
                if( branch == -1){
                    return value
                }else {        
                    return value.substring(0, branch); 
                }
            }   
        },
        removeContent(value) {
            let branch = value.indexOf('#');
            if(!value) return ''
            else {
                if(branch == -1){
                    return ''
                }
                else {
                    return value.substring( branch , value.length );
                }
            }        
        }
    },
}