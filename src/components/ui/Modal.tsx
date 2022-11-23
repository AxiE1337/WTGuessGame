import React, { memo } from 'react'

interface IModal {
  children: React.ReactElement
}

const closeBtn = (
  <label htmlFor='my-modal-4' className='btn-xs btn-square cursor-pointer'>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M6 18L18 6M6 6l12 12'
      />
    </svg>
  </label>
)

function Modal({ children }: IModal) {
  return (
    <>
      <input type='checkbox' id='my-modal-4' className='modal-toggle' />
      <label htmlFor='my-modal-4' className='modal cursor-pointer'>
        <label
          className='modal-box rounded-md relative p-0 h-4/6 bg-sky-900 text-white'
          htmlFor=''
        >
          <div className='absolute w-full flex justify-end'>{closeBtn}</div>
          <div className='w-full h-full flex items-center justify-center'>
            {children}
          </div>
        </label>
      </label>
    </>
  )
}

export default memo(Modal)
