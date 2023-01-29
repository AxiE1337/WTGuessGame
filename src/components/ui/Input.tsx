import { memo } from 'react'

interface IInput {
  value: string
  autocomplete?: string[]
  onChange: (value: string) => void
  onSubmit: () => void
}

function Input({ value, autocomplete, onChange, onSubmit }: IInput) {
  const onChangeHandler = (value: string) => {
    onChange(value)
  }
  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.length > 1) {
      onSubmit()
    }
  }

  return (
    <form className='w-full relative' onSubmit={onSubmitHandler}>
      <input
        type='search'
        id='dM34b'
        className='input w-full max-w-xs border-none bg-gray-200 dark:bg-sky-900 dark:text-white focus:border-none md:w-11/12'
        onChange={(e) => onChangeHandler(e.target.value.toLowerCase())}
        value={value}
        list='items'
      />
      {value.length > 1 && (
        <datalist id='items'>
          {autocomplete
            ?.filter((item) => item.includes(value))
            .map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
        </datalist>
      )}
    </form>
  )
}

export default memo(Input)
