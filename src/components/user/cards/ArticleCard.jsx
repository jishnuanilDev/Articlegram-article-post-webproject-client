import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@nextui-org/react'
import axios from 'axios';

function ArticleCard ({article}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
 
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
                  Read more
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
                  <ModalBody className='text-black overflow-y-auto overflow-x-hidden scrollbar-hide'>
                  <div className='h-96'>
                  <img
                    className='rounded-t-lg h-full w-full object-cover'
                    src={article.image}
                    alt=''
                  />
                </div>
                    <p>
               {article.description}
                    </p>
               
                  </ModalBody>
                  {/* <ModalFooter>
                    <Button color='danger' variant='light' onPress={onClose}>
                      Close
                    </Button>
                    <Button color='primary' onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter> */}
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
   </>
   
  )
}

export default ArticleCard
