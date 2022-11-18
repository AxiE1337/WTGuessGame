import React, { memo, useState } from 'react'

interface IInput {
  value: string
  autocomplete?: string[]
  onChange: (value: string) => void
}

function Input({ value, autocomplete, onChange }: IInput) {
  const [isShown, setIsShown] = useState<boolean>(false)
  const [selectIndex, setSelectIndex] = useState<number>(0)

  const autocompleteHandler = (item: string) => {
    onChange(item)
    setIsShown(false)
  }
  const onChangeHandler = (value: string) => {
    onChange(value)
    if (value.length > 2) {
      setIsShown(true)
    } else {
      setIsShown(false)
    }
  }
  // const selectHandler = (key: string) => {
  //   if (key === 'ArrowUp' && isShown) {
  //     setSelectIndex((prev) => prev - 1)
  //   } else if (key === 'ArrowDown' && isShown) {
  //     setSelectIndex((prev) => prev + 1)
  //   } else if (key === 'Enter') {
  //     setIsShown(false)
  //     setSelectIndex(0)
  //     const item = autocomplete && (autocomplete[selectIndex] as string)
  //     onChange(item as string)
  //   }
  // }

  return (
    <div className='w-60 relative'>
      <input
        type='text'
        className='input w-full max-w-xs'
        onChange={(e) => onChangeHandler(e.target.value)}
        // onKeyUp={(e) => selectHandler(e.key)}
        value={value}
      />
      {isShown && (
        <div className='absolute w-full z-100 bg-gray-800'>
          {autocomplete
            ?.filter((item) => item.includes(value))
            .map((item, index) => (
              <h1
                className={`flex items-center pl-1 text-white cursor-pointer h-10 ${
                  selectIndex === index && 'bg-slate-400'
                }`}
                key={index}
                onClick={() => autocompleteHandler(item)}
              >
                {item}
              </h1>
            ))}
        </div>
      )}
    </div>
  )
}

export default memo(Input)
