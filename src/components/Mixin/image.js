// sample image mixin
import axios from 'axios';

export default {
    data(){
        return {
            selectedFile : null
        }
    },
    methods : {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
            const fd = new FormData();
            fd.append('img', this.selectedFile, this.selectedFile.name);
            axios.post('/post/img', fd)
                .then(response => {
                    if(response.status === 200){
                        let url = response.data.url;
                        this.$store.state.postimage = url;
                    }
                })
                .catch()
        },
    }
}