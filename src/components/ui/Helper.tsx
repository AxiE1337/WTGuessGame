import React, { memo } from 'react'

interface IHelper {
  children: React.ReactElement
  hover?: boolean
}

function Helper({ children, hover }: IHelper) {
  return (
    <div
      className={`dropdown ${
        hover && 'dropdown-hover'
      } dropdown-end md:dropdown-right`}
    >
      <label tabIndex={0} className='btn btn-circle btn-ghost btn-xs text-info'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          className='w-5 h-5 stroke-current'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          ></path>
        </svg>
      </label>
      <div
        tabIndex={0}
        className='card compact dropdown-content bg-sky-900 text-white shadow rounded-box w-64'
      >
        <div className='card-body'>{children}</div>
      </div>
    </div>
  )
}

export default memo(Helper)
