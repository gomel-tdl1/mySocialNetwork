import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '6c3a4efe-d4a8-4320-a83f-28987b239f1b'
    }
});

export const usersAPI = {
    getUsers(pageSize = 5, pageNumber = 1){
        return instance.get(`users?count=${pageSize}&page=${pageNumber}`).then(response => response.data);
    },
    getProfile(id = 13857){
        return instance.get(`profile/${id}`)
            .then(response => response.data);
    },
    getStatus(id = 13857){
        return instance.get(`profile/status/${id}`)
            .then(response => response.data);
    },
    follow(id){
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${id}`)
            .then(response => response.data);
    },
    deleteFriend(id){
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${id}`)
            .then(response => response.data);
    },
    isAuth(){
        return instance.get(`https://social-network.samuraijs.com/api/1.0/auth/me`)
            .then(response => response.data);
    }
};
