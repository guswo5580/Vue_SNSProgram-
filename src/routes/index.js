import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

import HomeView from '../views/HomeView.vue';
import JoinView from '../views/JoinView.vue';
import ProfileView from '../views/ProfileView.vue';
import LoginView from '../views/LoginView.vue';
import ExampleView from '../views/ExampleView.vue';
import UserPage from '@/components/ProfileView/UserPage/UserPage.vue';

export const router = new VueRouter({
    mode : 'history',

    routes : [
        {
            path : '/',
            name : 'login',
            component : LoginView
        },
        {
            path : '/home',
            name : 'home',
            component : HomeView
        },
        {
            path : '/join',
            name : 'join',
            component : JoinView
        },
        {   
            path : '/example',
            name : 'example',
            component : ExampleView
        },
        {
            path : '/profile',
            name : 'profile',
            component : ProfileView,
        },
        {
            path : '/profile/:id',
            name : 'userpage',
            component : UserPage
        }
    ]
});