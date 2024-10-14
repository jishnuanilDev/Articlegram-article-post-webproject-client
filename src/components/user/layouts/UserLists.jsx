import React, { useEffect, useState } from 'react'
import UserHomeHeader from './UserHomeHeader'
import {useNavigate } from 'react-router-dom';
import UserListCard from '../cards/UserListCard';
import axiosInstance from '../../../config/axiosInstance'
import axios from 'axios';

function UserLists () {
  const Navigate = useNavigate();
  const [user,setUser] = useState();
  const [update,setUpdate] = useState(false);
  const [listUpdate,setListUpdate] = useState(false);
  const [articles,setArticles] = useState([]);

  useEffect(()=>{
    const fetchArticles = async ()=>{
      try{
const userToken = localStorage.getItem('userToken');
const response = await axiosInstance.get('/get-user-lists',{
  headers:{
    Authorization:userToken
  }
});
if(response){
  console.log('articles in your lists',response.data.articles);
  setArticles(response.data.articles);
  setUser(response.data.user);
}
      }catch(err){
        console.error('Error occured in client side fetch articles',err)
      }
    }

    fetchArticles();
  },[listUpdate])
  return (
    <>
      <UserHomeHeader user={user} setUpdate={setUpdate}/>
      <section className='md:mt-5 ml-2 mt-2 mr-2'>
        <div className='grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-6'>
            {
                articles.map((article,index)=>(
                    <UserListCard setListUpdate={setListUpdate} key={index} article={article}/>
                ))
            }
     
        </div>
      </section>
    </>
  )
}

export default UserLists
