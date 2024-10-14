import { Checkbox } from '@nextui-org/react'
import toast, { Toaster } from 'react-hot-toast'
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { userEditProfile } from '../../../services/userServices'
export default function UserInfo ({ user,setUpdate }) {
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [phone, setPhone] = useState(user.phone)
  const [email, setEmail] = useState(user.email)
  const [selectedArticles, setSelectedArticles] = useState([
    ...user.articlePreferences
  ])

  const isCategorySelected = category => {
    return selectedArticles.includes(category)
  }

  const handleCheckboxChange = article => {
 
    setSelectedArticles(
      prevSelectedArticles =>
        prevSelectedArticles.includes(article)
          ? prevSelectedArticles.filter(a => a !== article) // Remove if unchecked
          : [...prevSelectedArticles, article] // Add if checked
    )
  }

  const handleSubmit = async (onClose) => {
    try {
      const UserEditedData = {
        firstName,
        lastName,
        phone,
        email,
        articlePreferences: selectedArticles
      }

      const result = await userEditProfile(UserEditedData)
      toast.success(result.message)
      if (result) {
        setUpdate(prev=>!prev)
        
        setTimeout(() => {
    onClose();
        }, 1000)
       
      }
    } catch (err) {
      console.error('Error occured in user edit profile ', err)
    }
  }
  return (
    <>
      <Toaster />
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Edit Your Profile
            </ModalHeader>
            <ModalBody>
              <form>
                <div className=''>
                  <div>
                    <label
                      htmlFor='firstName'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      First Name
                    </label>
                    <input
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      type='text'
                      id='firstName'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='Enter your first name'
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='lastName'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Last name
                    </label>
                    <input
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      type='text'
                      id='lastName'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='Enter your last name'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='phone'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Phone Number
                    </label>
                    <input
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      type='number'
                      id='phone'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='Enter your phone number'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='email'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Email
                    </label>
                    <input
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      type='text'
                      id='email'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='Enter your email'
                    />
                  </div>

                  <div className='mt-4'>
                    <label
                      for='ConfirmPassword'
                      class='block mb-1 text-sm font-medium'
                    >
                      Article Preference
                    </label>
                    <div className='flex gap-4 mt-3'>
                      <Checkbox
                        defaultSelected={isCategorySelected('Politics')}
                        onChange={() => handleCheckboxChange('Politics')}
                        color='primary'
                      >
                        Politics
                      </Checkbox>
                      <Checkbox
                        defaultSelected={isCategorySelected('Sports')}
                        onChange={() => handleCheckboxChange('Sports')}
                        color='primary'
                      >
                        Sports
                      </Checkbox>
                      <Checkbox
                        defaultSelected={isCategorySelected('Space')}
                        onChange={() => handleCheckboxChange('Space')}
                        color='primary'
                      >
                        Space
                      </Checkbox>
                      <Checkbox
                        defaultSelected={isCategorySelected('Technology')}
                        onChange={() => handleCheckboxChange('Technology')}
                        color='primary'
                      >
                        Technology
                      </Checkbox>
                      <Checkbox
                        defaultSelected={isCategorySelected('Health')}
                        onChange={() => handleCheckboxChange('Health')}
                        color='primary'
                      >
                        Health
                      </Checkbox>
                    </div>
                  </div>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='flat' onPress={onClose}>
                Close
              </Button>
              <Button onClick={()=>handleSubmit(onClose)} color='primary'>
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </>
  )
}
