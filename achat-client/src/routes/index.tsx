import { Navigate, RouteObject } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Home from '../pages/Home'
import { Spin } from 'antd'
interface Routes extends RouteObject {
    children?:Routes[]
}
const Login = lazy(()=>import(/* webpackChunkName:'login' */'../pages/Login'))
const Register = lazy(()=>import(/* webpackChunkName:'register' */'../pages/Register'))
const GroupChat = lazy(() => import(/* webpackChunkName:'groupChat' */'../pages/Home/GroupChat'))
const PersonalInfo = lazy(() => import(/* webpackChunkName:'PersonalInfo' */'../pages/Home/PersonalInfo'))
const routes:Routes[] = [
    {
        path:'/',
        element:<Navigate to={'/home/my-home'}></Navigate>,
    },
    {
        path:'/home',
        element:<Home></Home>,
        children:[
            {
                path:'/home/group-chat/:chatId/:chatName',
                element:<Suspense fallback={<Spin tip="loading..." className='center-spin'></Spin>}><GroupChat></GroupChat></Suspense>,
            },
            {
                path:'/home/my-home',
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
