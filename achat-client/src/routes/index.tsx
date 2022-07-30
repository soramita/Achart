import { Navigate, RouteObject } from 'react-router-dom'
import { lazy } from 'react'
import Home from '../pages/Home'
interface Routes extends RouteObject {
    meta?:{
        title:string
    },
    children?:Routes[]
}
const Login = lazy(()=>import(/* webpackChunkName:'login' */'../pages/Login'))
const Register = lazy(()=>import(/* webpackChunkName:'register' */'../pages/Register'))
const BaseChat = lazy(() => import(/* webpackChunkName:'baseChat' */'../pages/Home/BaseChat'))
const routes:Routes[] = [
    {
        path:'/',
        element:<Navigate to={'/home'}></Navigate>,
    },
    {
        path:'/home',
        element:<Home></Home>,
        meta:{
            title:'home'
        },
        children:[
            {
                path:'/home/base-chat',
                element:<BaseChat></BaseChat>,
                meta:{
                    title:'公共聊天室'
                }
            }
        ]
    },
    {
        path:'/login',
        element:<Login></Login>,
        meta:{
            title:'login'
        }
    },
    {
        path:'/register',
        element:<Register></Register>,
        meta:{
            title:'register'
        }
    },
]
export default routes
