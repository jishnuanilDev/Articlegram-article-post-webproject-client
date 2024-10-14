import { Input } from '@nextui-org/react'
import { Checkbox } from '@nextui-org/react'
import { useState } from 'react'
import axiosInstance from '../../../config/axiosInstance'
import { userSignUpService } from '../../../services/userServices'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

export default function UserSignUp () {
  const Navigate = useNavigate()
  const [selectedArticles, setSelectedArticles] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleCheckboxChange = article => {
    setSelectedArticles(
      prevSelectedArticles =>
        prevSelectedArticles.includes(article)
          ? prevSelectedArticles.filter(a => a !== article) // Remove if unchecked
          : [...prevSelectedArticles, article] // Add if checked
    )
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (
        !email ||
        !password ||
        !confirmPassword ||
        !dob ||
        !phone ||
        !lastName ||
        !firstName ||
        !selectedArticles
      ) {
        return toast.error('Please fill out the fields');
      } else if (password != confirmPassword) {
        return toast.error('Password not match')
      } else if (selectedArticles.length == 0) {
        return toast.error('select atleast one article')
      }
      const UserSignUpData = {
        firstName,
        lastName,
        phone,
        email,
        dob,
        password,
        confirmPassword,
        articlePreferences: selectedArticles
      }

      const result = await userSignUpService(UserSignUpData)
      toast.success(result.message)

      if (result) {
        setTimeout(() => {
          Navigate('/home')
        }, 2000)
      }
    } catch (err) {
      console.error('Error occured in user sign up ', err)
    }
  }

  return (
    <>
      <section className='bg-login bg-cover bg-center md:h-screen w-full'>
        <div className='flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0'>
          <a
            href='#'
            class='flex items-center mb-1 text-2xl font-semibold text-white'
          >
            <img
              className='w-8 h-8 mr-2'
              src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
              alt='logo'
            />
            Articlegram
          </a>
          <Toaster />
          <div className='w-full rounded-lg shadow border md:mt-0 sm:max-w-md md:max-w-lg  xl:p-0 bg-gray-800 border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white'>
                Sign Up to create account
              </h1>
              <form
                onSubmit={handleSubmit}
                className='space-y-4 md:space-y-6'
                action='#'
              >
                <div className='md:grid grid-cols-2 gap-2'>
                  <div>
                    <label
                      for='firstName'
                      class='block mb-1 text-sm font-medium text-white'
                    >
                      Firstname
                    </label>
                    <input
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      type='text'
                      name='firstname'
                      id='firstname'
                      className=' border   rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                      placeholder='Enter your firstname'
                      required=''
                    />
                  </div>
                  <div>
                    <label
                      for='firstName'
                      class='block mb-1 text-sm font-medium text-white'
                    >
                      Lastname
                    </label>
                    <input
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      type='text'
                      name='Lastname'
                      id='Lastname'
                      className=' border   rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                      placeholder='Enter your lastname'
                      required=''
                    />
                  </div>
                </div>
                <div className='md:grid grid-cols-2 gap-2'>
                  <div>
                    <label
                      for='Lastname'
                      class='block mb-1 text-sm font-medium text-white'
                    >
                      Phone
                    </label>
                    <input
                      type='tel'
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      name='Phone'
                      id='Phone'
                      className=' border   rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                      placeholder='Enter your phone number'
                      required=''
                    />
                  </div>
                  <div>
                    <label
                      for='email'
                      class='block mb-1 text-sm font-medium text-white'
                    >
                      Your email
                    </label>
                    <input
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      type='email'
                      name='email'
                      id='email'
                      className=' border   rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                      placeholder='Enter email'
                      required=''
                    />
                  </div>
                </div>
                <div>
                  <label
                    for='DOB'
                    class='block mb-1 text-sm font-medium text-white'
                  >
                    Date Of Birth
                  </label>
                  <input
                    value={dob}
                    onChange={e => setDob(e.target.value)}
                    type='date'
                    name='DOB'
                    id='DOb'
                    className=' border   rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Enter your DD/MM/YYYY'
                    required=''
                  />
                </div>
                <div className='md:grid grid-cols-2 gap-2'>
                  <div>
                    <label
                      for='password'
                      class='block mb-1 text-sm font-medium text-white'
                    >
                      Password
                    </label>
                    <input
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      type='password'
                      name='Password'
                      id='Password'
                      placeholder='create new password'
                      className='border   rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                      required=''
                    />
                  </div>
                  <div>
                    <label
                      for='ConfirmPassword'
                      class='block mb-1 text-sm font-medium text-white'
                    >
                      Confirm Password
                    </label>
                    <input
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      type='password'
                      name='ConfirmPassword'
                      id='ConfirmPassword'
                      placeholder='Confirm your password'
                      className='border rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                      required=''
                    />
                  </div>

                  <div>
                    <label
                      for='ConfirmPassword'
                      class='block mb-1 text-sm font-medium text-white'
                    >
                      Article Preference
                    </label>
                    <div className='flex gap-4 text-white'>
                      <Checkbox
                        onChange={() => handleCheckboxChange('Politics')}
                        color='primary'
                      >
                        <span className='text-white'>Politics</span>
                      </Checkbox>
                      <Checkbox
                        onChange={() => handleCheckboxChange('Sports')}
                        color='primary'
                      >
                        <span className='text-white'>Sports</span>
                      </Checkbox>
                      <Checkbox
                        onChange={() => handleCheckboxChange('Space')}
                        color='primary'
                      >
                        <span className='text-white'>Space</span>
                      </Checkbox>
                      <Checkbox
                        onChange={() => handleCheckboxChange('Technology')}
                        color='primary'
                      >
                        <span className='text-white'>Technology</span>
                      </Checkbox>
                      <Checkbox
                        onChange={() => handleCheckboxChange('Health')}
                        color='primary'
                      >
                        <span className='text-white'>Health</span>
                      </Checkbox>
                    </div>
                  </div>
                </div>

                <div className='flex items-center justify-between'>
                  <a
                    href='#'
                    className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type='submit'
                  className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                >
                  Sign Up
                </button>
                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  Don’t have an account yet?{' '}
                  <Link
                    to='/'
                    className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                  >
                    Sign In
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
