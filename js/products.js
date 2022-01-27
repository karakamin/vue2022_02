import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.28/vue.esm-browser.min.js";

const app = createApp({
    data() {
        return {
            url: "https://vue3-course-api.hexschool.io/v2",
            path: "karakamin-hex",
            products:[],
            oneProduct:[],
        }
    },
    methods:{
        checkUser(){
            axios.post(`${this.url}/api/user/check`)
            .then((res) => {
                // console.log(res.data);
                if(res.data.success) {
                    // console.log(this);
                    // console.log(12345);
                    this.getProdList();
                } else {
                    // console.log(res);
                    console.log(res.data.success)
                    alert("無管理權限");
                }
               
            }).catch((err) => {
                console.log(err);
                alert("權限異常");
                // window.location = "index.html";
            })
        },
        getProdList() {
            // console.log(`${this.url}/api/${this.path}/admin/products`);
            axios.get(`${this.url}/api/${this.path}/admin/products`)
            .then((res) => {
                if(res.data.success) {
                    this.products = res.data.products;
                    console.log(this.products);
                } else {
                    alert(res.data.success);
                }
                
            }).catch((err) =>{
                alert("產品清單取得異常");
            })
        },
        showDetails(item){
            console.log(item);
            this.oneProduct = item; 
        }
    },
    created() {
        //存放token 只需要設定一次
        const tmpToken = document.cookie.replace(
            /(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
        );
        // console.log(tmpToken);
        //axios預設headers
        axios.defaults.headers.common["Authorization"] = tmpToken;

        this.checkUser()
    },
})

app.mount("#app");
