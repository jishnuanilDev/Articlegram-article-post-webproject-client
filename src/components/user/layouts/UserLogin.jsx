import { Input } from '@nextui-org/react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { userLoginService } from '../../../services/userServices'


export default function UserLogin () {
  const Navigate = useNavigate()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  useEffect(()=>{
    const userToken = localStorage.getItem('userToken');
    if(userToken){
      Navigate('/home')
    }
  },[])

  const handleUserLogin = async e => {
    console.log('handleUserLoginWorking');
    e.preventDefault()
    try {
      if (!email || !password) {
        return toast.error('Please enter both email and password.')
      }
      const userLoginData = { email, password }
      const result = await userLoginService(userLoginData);
      toast.success(result.message);
      if (result) {
        setTimeout(() => {
          Navigate('/home')
        }, 1000);
    
      }
    } catch (err) {
toast.error(err.data.message)
      console.error('Error occured in user login ', err)
    }
  }
  return (
    <>
      <section className='bg-login bg-cover bg-center h-screen w-full'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <a
            href='#'
            class='flex items-center mb-6 text-2xl font-semibold text-white'
          >
            <img
              className='w-8 h-8 mr-2'
              src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
              alt='logo'
            />
            Articlegram
          </a>

          <div className='w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white'>
                Sign in to your account
              </h1>
              <Toaster />
              <form
                className='space-y-4 md:space-y-6'
                onSubmit={handleUserLogin}
              >
                <div>
                  <label
                    for='email'
                    class='block mb-2 text-sm font-medium text-white'
                  >
                    Your email
                  </label>
                  <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type='email'
                    name='email'
                    id='email'
                    class=' border   rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Enter email'
                    required=''
                  />
                </div>
                <div>
                  <label
                    for='password'
                    class='block mb-2 text-sm font-medium text-white'
                  >
                    Password
                  </label>
                  <input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Enter password'
                    class='border   rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                    required=''
                  />
                </div>
                
                <button
                  type='submit'
                  class='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                >
                  Sign in
                </button>
                <p class='text-sm font-light text-gray-500 dark:text-gray-400'>
                  Don’t have an account yet?{' '}
                  <Link
                    to='/sign-up'
                    class='font-medium text-primary-600 hover:underline dark:text-primary-500'
                  >
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
