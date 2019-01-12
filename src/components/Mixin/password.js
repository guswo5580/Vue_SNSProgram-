//password mixin

export default {
    computed : {
        Id() {
            let branch = this.email.indexOf('@');
            let dot1 = this.email.indexOf('.com');
            let dot2 = this.email.indexOf('.net');
            if( branch !== -1 && (dot1 !== -1 || dot2 !== -1) )
                return true
            else return false
        },
        invalidId() {
            let branch = this.email.indexOf('@');
            let dot1 = this.email.indexOf('.com');
            let dot2 = this.email.indexOf('.net');
            if( branch !== -1 && (dot1 !== -1 || dot2 !== -1) )
                return ''
            else return '이메일을 확인해주세요'
        },
        validId() {
            return this.Id === true ? '감사합니다' : ''
        },
        /////////////////////////////////////////////////////
        Password () {
            let pattern1 = /[0-9]/;	// 숫자 
            let pattern2 = /[a-zA-Z]/;	// 문자 
            let pattern3 = /[~!@#$%^&*()_+|<>?:{}]/;	// 특수문자
            if(!pattern1.test(this.password) || !pattern2.test(this.password) || !pattern3.test(this.password) || this.password.length < 8) { 
                return false; 
            } else {
                return true
            }

        },
        invalidPassword () {
            let pattern1 = /[0-9]/;	
            let pattern2 = /[a-zA-Z]/;	
            let pattern3 = /[~!@#$%^&*()_+|<>?:{}]/;	
            if(!pattern1.test(this.password) || !pattern2.test(this.password) || !pattern3.test(this.password) || this.password.length < 8) { 
                return '비밀번호는 8자리 이상 문자, 숫자, 특수문자로 구성하여야 합니다.'
            } else {
                return ''
            }
        },
        validPassword () {
            return this.Password === true ? '감사합니다' : ''
        }
    }
}