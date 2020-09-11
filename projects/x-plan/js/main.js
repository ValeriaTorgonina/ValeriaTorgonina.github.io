var page = new Vue({
    el: '#page',
    data: function() {
        return {
            showBlog: false,
            showSuccess: false,
            formType: 'mail',
        }
    },
    methods: {
        footerBtnClick: function(value) {
            this.formType = value;
            this.changeFooterBtns(value);
        },
        changeFooterBtns: function(value) {
            if(value === 'socials' || value === 'sms') {
                this.openPopup('blog');
            }
        },
        openPopup: function(value) {
            if(value === 'blog') {
                this.showBlog = true;
            }
            if(value === 'success') {
                event.preventDefault();
                this.showSuccess = true;
            }
        },
        closePopup: function() {
            this.showBlog = false;
            this.showSuccess = false;
        }
    },
})

document.addEventListener("DOMContentLoaded", function() {
    window.scrollTo(0,0);
});