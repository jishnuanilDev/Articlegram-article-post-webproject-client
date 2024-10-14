import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../../../config/axiosInstance'
import EditArticle from './EditArticle'
import Swal from 'sweetalert2'
import { FcLikePlaceholder } from "react-icons/fc";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@nextui-org/react'
import axios from 'axios'


function UserListCard ({ article,setListUpdate }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    isOpen: eIsOpen,
    onOpen: eOnOpen,
    onOpenChange: eOnOpenchange
  } = useDisclosure()



  const handleDeleteConfirm = async ()=>{
    try{
      console.log('ewfnwenfoiewfoweo weifoiew open randome')
        // const result = await userDeleteArticle();
        const userToken = localStorage.getItem('userToken');
        const articleId = article._id
        console.log('articleId',articleId);
        const userData = {
          articleId
        }
        const response = await axios.post("http://localhost:5000/delete-article",{userData},{
          headers:{
            Authorization:userToken
          }
        });
        if (response.data.success) {
          setListUpdate(prev=>!prev);

        }
      
    }catch(err){
        console.error('Error occured in client side delete confirm list',err)
    }
  }

  const handleDelete = ()=>{
    try{
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          handleDeleteConfirm();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
    }catch(err){
      console.error('Error occured in client side delete list',err)
    }
  }
  return (
    <>
      <div >
        <section className='mb-2 '>
          <div className=' max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <Link to='#'>
              <div className='h-64'>
                <img
                  className='rounded-t-lg h-full w-full object-cover'
                  src={article.image}
                  alt=''
                />
              </div>
            </Link>
            <div className='p-5'>
              <Link to='#'>
                <h5 className='mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white'>
                  {article.name}
                </h5>
              </Link>
              <p className='mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2'>
                {article.description}
              </p>
              <Link
             onClick={onOpen}
                to='#'
                className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                View more
                <svg
                  className='rtl:rotate-180 w-3.5 h-3.5 ms-2'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 10'
                >
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M1 5h12m0 0L9 1m4 4L9 9'
                  />
                </svg>
              </Link>
              <div className='flex gap-3 mt-4' >
                <Button onClick={eOnOpen} color='warning'>Edit</Button>

                <Button onClick={handleDelete} color='danger'>Delete</Button>
              </div>
            </div>
          </div>
        </section>
        {/* <Button onPress={onOpen}>Open Modal</Button> */}
        <Modal size='full' isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {onClose => (
              <>
                <ModalHeader className='flex flex-col gap-1 text-black font-extrabold text-3xl'>
                  {article.name}
                </ModalHeader>
                <div className='flex justify-end mr-12'><FcLikePlaceholder style={{fontSize:'26px'}}/></div>
                <ModalBody className='text-black overflow-y-auto overflow-x-hidden scrollbar-hide'>
                  <div className='h-96'>
                    <img
                      className='rounded-t-lg h-full w-full object-cover'
                      src={article.image}
                      alt='img'
                    />
                  </div>
                  <p>{article.description}</p>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>

        <Modal size='5xl' isOpen={eIsOpen} onOpenChange={eOnOpenchange} placement='top-center'>
          <EditArticle setListUpdate={setListUpdate} article={article} />
        </Modal>
      </div>
    </>
  )
}

export default UserListCard
