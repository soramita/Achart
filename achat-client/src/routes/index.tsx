import { Navigate, RouteObject } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Home from '../pages/Home'
import { Spin } from 'antd'
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
                element:<Suspense fallback={<Spin tip="loading..." className='center-spin'></Spin>}><BaseChat></BaseChat></Suspense>,
            },
            {
                path:'/home/group-chat/:chatId',
                element:<Suspense fallback={<Spin tip="loading..." className='center-spin'></Spin>}><GroupChat></GroupChat></Suspense>,
            },
            {
                path:'/home/my-home/:uid',
                element:<Suspense fallback={<Spin tip="loading..." className='center-spin'></Spin>}><PersonalInfo></PersonalInfo></Suspense>,
            }
        ]
    },
    {
        path:'/login',
        element: <Suspense fallback={<Spin tip="loading..." className='center-spin'></Spin>}><Login></Login></Suspense>,
    },
    {
        path:'/register',
        element: <Suspense fallback={<Spin tip="loading..." className='center-spin'></Spin>}><Register></Register></Suspense>,
    },
]
export default routes
