import React, { memo, useState } from 'react'
import { Modal as MuiModal } from '@mui/material'

interface IModal {
  children: React.ReactElement
}

function Modal({ children }: IModal) {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <button className='btn btn-xs mx-4' onClick={handleOpen}>
        stats
      </button>
      <MuiModal open={open} onClose={handleClose}>
        <div className='w-full h-full flex flex-col items-center justify-center pointer-events-none'>
          <div className='flex flex-col bg-white dark:bg-sky-900 rounded-md pointer-events-auto'>
            <button
              className='btn btn-ghost btn-xs btn-square ml-auto'
              onClick={handleClose}
            >
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
            </button>
            {children}
          </div>
        </div>
      </MuiModal>
    </>
  )
}

export default memo(Modal)
