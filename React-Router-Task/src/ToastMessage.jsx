import React from 'react'
import { toast } from 'react-toastify'
const ToastMessage = (message,toastType) => {
        toast(message,{
            type: toastType,
            autoClose :3000,
            closeOnClick:true,
        })
    
  return (
    <>
    
    </>
  )
}

export default ToastMessage