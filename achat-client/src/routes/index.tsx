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
const GroupChat = lazy(() => import(/* webpackChunkName:'groupChat' */'../pages/Home/GroupChat'))
const PersonalInfo = lazy(() => import(/* webpackChunkName:'PersonalInfo' */'../pages/Home/PersonalInfo'))
const routes:Routes[] = [
    {
        path:'/',
        element:<Navigate to={'/home/base-chat'}></Navigate>,
    },
    {
        path:'/home',
        element:<Home></Home>,
        children:[
            {
                path:'/home/base-chat',
                element:<BaseChat></BaseChat>,
            },
            {
                path:'/home/group-chat/:chatId',
                element:<GroupChat></GroupChat>,
            },
            {
                path:'/home/my-home/:uid',
                element:<PersonalInfo></PersonalInfo>,
            }
        ]
    },
    {
        path:'/login',
        element:<Login></Login>,
    },
    {
        path:'/register',
        element:<Register></Register>,
    },
]
export default routes
