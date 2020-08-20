var page = new Vue({
    el: '#page',
    data: function() {
        return {
            isValid: false,
            showBlog: false,
            showSuccess: false,
            formType: 'mail',
            formData: {
                formText: 'Мы отправим письмо по этому адресу:',
                inputPlaceholder: 'Ваш e-mail',
                inputType: 'email',
            },
            newFormData: {
                mail: {
                    formText: 'Мы отправим письмо по этому адресу:',
                    inputPlaceholder: 'Ваш e-mail',
                    inputType: 'email',
                },
                socials: {
                    formText: 'Мы отправим письмо по этому адресу:',
                    inputPlaceholder: 'Адрес страницы в соц.сетях',
                    inputType: 'text',
                },
                sms: {
                    formText: 'Мы отправим sms на телефон и мессенджеры:',
                    inputPlaceholder: 'Номер телефона',
                    inputType: 'tel',
                }
            }
        }
    },
    methods: {
        footerBtnClick: function(value) {
            this.formType = value;
            this.changeFormData(value);
        },
        changeFormData: function(value) {
            if(value === 'mail') {
                this.formData = this.newFormData.mail;
            }
            if(value === 'socials') {
                this.formData = this.newFormData.socials;
            }
            if(value === 'sms') {
                this.formData = this.newFormData.sms;
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
