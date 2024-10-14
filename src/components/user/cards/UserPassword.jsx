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
import { userEditPassword } from '../../../services/userServices'

export default function UserPassword ({ user }) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword,setNewPassword ] = useState('')
  const [confirmPassword,setConfirmPassword ] = useState('')

  const handleSubmit = async (onClose) => {
    try {
        if(newPassword !== confirmPassword){
            return toast.error('Passwords not match');
        }else if(newPassword===currentPassword){
            return toast.error('Please enter different from your current password');
        }
      const result = await userEditPassword(newPassword,currentPassword);
      toast.success(result.message)
      if (result) {
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
           Change Your Password
            </ModalHeader>
            <ModalBody>
              <form>
                <div className=''>
                  <div>
                    <label
                      htmlFor='firstName'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                 Current password
                    </label>
                    <input
                      value={currentPassword}
                      onChange={e => setCurrentPassword(e.target.value)}
                      type='password'
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
                    New password
                    </label>
                    <input
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      type='password'
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
                      Confirm new password
                    </label>
                    <input
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      type='password'
                      id='phone'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='Enter your phone number'
                    />
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
