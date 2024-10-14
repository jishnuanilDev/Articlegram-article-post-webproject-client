import axios from "axios";
import toast, { Toaster } from 'react-hot-toast'
import axiosInstance from '../config/axiosInstance'
export const userLoginService = async (userloginData)=>{
    try {
      console.log('user login Service working');
        const response = await axiosInstance.post("/sign-in", userloginData);
        if (response.data.userToken) {
       localStorage.setItem("userToken", response.data.userToken);
        }
    console.log('resss user login:',response.data)
        return response.data;
      } catch (error) {
        if (error.response) {
          console.log('error response ind',error.response.data.message);
          toast.error(error.response.data.message);
        } else {
          toast.error("An unexpected error occurred in login. Please try again later.");
        }
      }
}

export const userSignUpService = async (userSignUpData)=>{
    try {
        const response = await axiosInstance.post("/sign-up", userSignUpData);
        if (response.data.userToken) {
       localStorage.setItem("userToken", response.data.userToken);
        }
    console.log('resss user sign up:',response.data)
        return response.data;
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An unexpected error occurred in sign up. Please try again later.");
        }
      }
}

export const userEditProfile = async (userData)=>{
  try {
    const userToken = localStorage.getItem('userToken');
      const response = await axiosInstance.put("/edit-profile",userData,{
        headers:{
          Authorization:userToken
        }
      });
      if (response.data) {
        return response.data;
      }

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred in Edit profile. Please try again later.");
      }
    }
}

export const userEditPassword = async (newPassword,currentPassword)=>{
  try {
    const userToken = localStorage.getItem('userToken');
      const response = await axiosInstance.put("/edit-password",{newPassword,currentPassword},{
        headers:{
          Authorization:userToken
        }
      });
      if (response.data) {
        return response.data;
      }

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred in Edit profile. Please try again later.");
      }
    }
}


export const userNewArticle = async (articleData)=>{
  try {
    const userToken = localStorage.getItem('userToken');
      const response = await axiosInstance.post("/add-new-article",articleData,{
        headers:{
          Authorization:userToken
        }
      });
      if (response.data) {
        return response.data;
      }

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred in adding new article. Please try again later.");
      }
    }
}

export const userEditArticle = async (articleData)=>{
  try {
    const userToken = localStorage.getItem('userToken');
      const response = await axiosInstance.put("/edit-article",articleData,{
        headers:{
          Authorization:userToken
        }
      });
      if (response.data) {
        return response.data;
      }

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred in editing article. Please try again later.");
      }
    }
}


