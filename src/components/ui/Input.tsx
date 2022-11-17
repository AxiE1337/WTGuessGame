import React, { memo, useState } from 'react'

interface IInput {
  value: string
  autocomplete?: string[]
  onChange: (value: string) => void
}

function Input({ value, autocomplete, onChange }: IInput) {
  const [isShown, setIsShown] = useState<boolean>(false)
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
  return (
    <div className='w-60 relative'>
      <input
        type='text'
        className='input w-full max-w-xs'
        onChange={(e) => onChangeHandler(e.target.value)}
        value={value}
      />
      {isShown && (
        <div className='absolute w-full z-100 bg-gray-800'>
          {autocomplete
            ?.filter((item) => item.includes(value))
            .map((item, index) => (
              <h1
                className='text-white cursor-pointer'
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
