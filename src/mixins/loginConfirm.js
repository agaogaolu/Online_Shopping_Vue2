export default{
    methods:{
        loginConfirm() {
            if (!this.$store.getters.token) {
                console.log("add")
                this.$dialog.confirm({
                    title: 'Waring',
                    message: "Please Login First!",
                    confirmButtonText: 'Login',
                    cancelButtonText: 'Exit',
                    cartTotal: 0
                })
                    .then(() => {
                        this.$router.replace({
                            path: '/login', 
                            query: {
                                backUrl: this.$route.fullPath
                            }
                        })
                    })
                    .catch(() => {

                    })
                return true
            }
            return false
        },
    }
}