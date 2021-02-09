import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '6c3a4efe-d4a8-4320-a83f-28987b239f1b'
    }
});

export const usersAPI = {
    getUsers(pageSize = 5, pageNumber = 1) {
        return instance.get(`users?count=${pageSize}&page=${pageNumber}`).then(response => response.data);
    },
    follow(id) {
        return instance.post(`follow/${id}`)
            .then(response => response.data);
    },
    deleteFriend(id) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data);
    },
    getProfile(id = 13857) {
        console.warn('Obsolete method. Please use profileAPI object.');
        return profileAPI.getProfile(id);
    },
    getStatus(id = 13857) {
        console.warn('Obsolete method. Please use profileAPI object.');
        return profileAPI.getStatus(id);
    }
};
export const profileAPI = {
    getProfile(id = 13857) {
        return instance.get(`profile/${id}`)
            .then(response => response.data);
    },
    getStatus(id = 13857) {
        return instance.get(`profile/status/${id}`)
            .then(response => response.data);
    },
    updateStatus(status){
        return instance.put('profile/status', {status: status});
    }
};

export const authAPI = {
    isAuth() {
        return instance.get(`auth/me`)
            .then(response => response.data);
    },
    loginOnSite(email, password, rememberMe = false, captcha){
        return instance.post('auth/login', {
            email,
            password,
            rememberMe,
            captcha
        });
    },
    logout(){
        return instance.delete('auth/login');
    },
    getCaptcha(){
        return instance.get('security/get-captcha-url').then(response => response.data);
    }
};
