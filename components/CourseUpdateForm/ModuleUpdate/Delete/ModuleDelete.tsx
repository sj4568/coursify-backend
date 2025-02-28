"use client"
import LoadingButton from '@/components/Common/Button/Button'
import { CourseType } from '@/components/Courses/CourseCard/CourseCard'
import { CourseModel } from '@/lib/Database/Models'
import { getSingleCourse } from '@/lib/Helper/getSingleCourse'
import { updateCourse } from '@/lib/Helper/UpdateCourse'
import React, { useRef } from 'react'
import toast from 'react-hot-toast'
import { courseStatus } from '../ModuleUpdate'

export default function ModuleDelete({moduleId,courseId}:{moduleId:string,courseId:string}) {
    const myLabel = useRef<any>(null)
   async function DeleteModule(){
    const course:CourseType = await getSingleCourse(courseId,true)

    const moduleData = course?.module?.filter(data=>data.moduleId!=moduleId)
    const obj = {
        module:moduleData
    }
    const res = await updateCourse(obj,courseId,true)
    if(res.isOk){
        toast.success('data delete successfully')
     
        courseStatus()
        myLabel.current?.click()
    }else{
        toast.error(res.massage)
    }
    
    }
  return (
    <div className='w-full'>
        <input type="checkbox" name="" id={moduleId+"delete"} className='peer/deletemodule hidden' />
    <div className='fixed w-full hidden  h-screen bg-[rgba(0,0,0,0.3)] top-0 left-0 peer-checked/deletemodule:flex justify-center place-items-center'>
    <form action={DeleteModule} className='p-5 rounded-md md:w-[40%] w-[80%] bg-white relative z-10'>
   <div>
    <h1 className='text-3xl px-3 text-center py-3 text-primary'>Are You Sure to Delete this module <span className='text-secondary'>?</span></h1>
   </div>
    <div className='py-2'>
    <LoadingButton className='flex justify-center py-2 bg-secondary text-white rounded-md w-full'>Delete Module</LoadingButton>
    </div>
    </form>
    <label ref={myLabel} htmlFor={moduleId+"delete"} className='absolute w-full h-full left-0 top-0 z-0 cursor-pointer'></label>
    </div>

    </div>
  )
}
