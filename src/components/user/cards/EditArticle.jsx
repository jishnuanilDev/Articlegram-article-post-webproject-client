import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { userEditArticle } from '../../../services/userServices'
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react'

export default function EditArticle ({article,setListUpdate}) {

  const [articleName, setArticleName] = useState(article.name)
  const [tags, setTags] = useState(article.tags)
  const [selectedCategory, setSelectedCategory] = useState(article.category)
  const [description, setDescription] = useState(article.description)
  const [file, setFile] = useState(null)
  const [image, setImage] = useState('')

  const convertToBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }
  const handleFileChange = async event => {
    const maxSizeInMB = 5
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif']

    const selectedFile = event.target.files && event.target.files[0]
    setFile(selectedFile)
    if (selectedFile) {
      if (selectedFile.size > maxSizeInBytes) {
        toast.error('File is too large. Maximum size is 5MB.')
        return
      }

      if (!validImageTypes.includes(selectedFile.type)) {
        toast.error('Invalid file type. Please upload a JPEG, PNG, or GIF.')
        return
      }

      try {
        const base64Image = await convertToBase64(selectedFile)
        setImage(base64Image)
      } catch (error) {
        console.error('Error converting file to base64:', error)
      }
    }
  }

  const handleSubmit = async (onClose) => {
    try {

        if (
            !articleName ||
            !tags ||
            !selectedCategory ||
            !description 
          ) {
            return toast.error('Please fill out the all fields');
          } 
      const articleData = {
        articleName,
        tags,
        selectedCategory,
        description,
        image,
        articleId:article._id
      }
      const result = await userEditArticle(articleData)
      toast.success(result.message)
      if (result) {
        setTimeout(() => {
          onClose();
        }, 1000)
        setListUpdate(prev=>!prev);
      }
    } catch (err) {
      console.error('Error occured in submitting new article', err)
    }
  }
  return (
   <>
      <ModalContent className='mt-4 mb-4'>
        {onClose => (
          <>
            <ModalHeader className='flex flex-col gap-1 text-black'>
              Log in
            </ModalHeader>
            <ModalBody>
              <form>
                <Toaster />
                <div className='grid gap-6 mb-6 md:grid-cols-2'>
                  {/* Article Name */}
                  <div>
                    <label
                      htmlFor='article_name'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Article Name
                    </label>
                    <input
                      type='text'
                      value={articleName}
                      onChange={e => setArticleName(e.target.value)}
                      id='article_name'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='Enter article name'
                      required
                    />
                  </div>
  
                  {/* Tags */}
                  <div>
                    <label
                      htmlFor='tags'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Tags
                    </label>
                    <input
                      value={tags}
                      onChange={(e)=>setTags(e.target.value)}
                      type='text'
                      id='tags'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='Enter tags, separated by commas'
                    />
                  </div>
  
                  {/* Category */}
                  <div>
                    <label
                      htmlFor='category'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={e => setSelectedCategory(e.target.value)}
                      id='category'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      required
                    >
                      <option value='' disabled selected>
                        Select a category
                      </option>
                      <option value='Politics'>Politics</option>
                      <option value='Sports'>Sports</option>
                      <option value='Space'>Space</option>
                      <option value='Health'>Health</option>
                      <option value='Technology'>Technology</option>
                    </select>
                  </div>
                </div>
  
                {/* Description */}
                <div className='mb-6'>
                  <label
                    htmlFor='description'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    id='description'
                    rows='4'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Enter a brief description of the article'
                    required
                  ></textarea>
                </div>
  
                {/* Image Upload */}
                <div className='mb-6'>
                  <label
                    htmlFor='images'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Upload Images
                  </label>
                  <input
                    onChange={handleFileChange}
                    type='file'
                    id='images'
                    className='block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                    multiple
                    accept='image/*'
                  />
                  <p className='mt-1 text-sm text-gray-500 dark:text-gray-300'>
                    Upload images (optional)
                  </p>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='flat' onPress={onClose}>
                Close
              </Button>
              <Button color='primary' onClick={()=>handleSubmit(onClose)}>
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
   </>
  )
}
