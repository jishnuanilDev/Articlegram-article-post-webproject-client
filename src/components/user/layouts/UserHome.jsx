import React, { useEffect, useState } from 'react'
import UserHomeHeader from './UserHomeHeader'
import ArticleCard from '../cards/ArticleCard'
import {useNavigate } from 'react-router-dom';
import axiosInstance from '../../../config/axiosInstance';
function UserHomeLayout () {
  const Navigate = useNavigate();
  const [user,setUser] = useState();
  const [update,setUpdate] = useState(false);
  const [articles,setArticles] = useState([]);

  useEffect(()=>{
    const userToken = localStorage.getItem('userToken');
    if(!userToken){
      Navigate('/');
    }
    const fetchArticles = async ()=>{
      try{
const userToken = localStorage.getItem('userToken');
const response = await axiosInstance.get('/get-articles',{
  headers:{
    Authorization:userToken
  }
});
if(response){
  console.log('articles in home',response.data.articles);
  setArticles(response.data.articles);
  setUser(response.data.user);
}
      }catch(err){
        console.error('Error occured in client side fetch articles',err)
      }
    }

    fetchArticles();
  },[update])
  // useEffect(()=>{
  //   const userToken = localStorage.getItem('userToken');
  //   if(!userToken){
  //     Navigate('/')
  //   }

  //   const fetchProfile = async ()=>{
  //     try{
  //       console.log('fetching profile.... in client')
  //       const userToken = localStorage.getItem('userToken');
  //       const response = await axios.get('http://localhost:5000/get-profile',{
  //         headers:{
  //           Authorization:userToken
  //         }
  //       });
  //       if(response){
  //         console.log('user fetched in articlegram',response.data.user);
  //         setUser(response.data.user);
  //         localStorage.setItem('user',response.data.user);
  //       }
  //     }catch(err){
  //       console.error("error occured in fetching profile client side ",err)
  //     }
    
  //   }

  //   fetchProfile();
   
  // },[update,update])
  return (
    <>
      <UserHomeHeader user={user} setUpdate={setUpdate} />
      <section className='md:mt-5 ml-2 mt-2 mr-2'>
        <div className='grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-6'>
          {
            articles.map((article,index)=>(
              <ArticleCard key={index} article={article} />
            ))
          }
         
        </div>
      </section>
    </>
  )
}

export default UserHomeLayout
