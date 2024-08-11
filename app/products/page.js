"use client"

import React from 'react'
import { useProtectedRoute } from "@utils/protectedRoutes.js";
import Link from 'next/link';
import Button from '@components/Button';
const page = () => {
  const { session, renderLoader } = useProtectedRoute();
  
  if (!session) {
    return renderLoader(); 
  }
  
  return (
    <div className='h-cover padding py-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-outfit font-semibold'>All Products</h1>
        <Link href={'/products/create'} className='w-[170px]'>
          <Button style={'btn-1'} text={'Add Product'} icon={'plus'} type={'button'} />
        </Link>
      </div>
      <div></div>

    </div>
  )
}

export default page