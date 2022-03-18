import { Dispatch, SetStateAction, useCallback, useState } from 'react'

type ReturnType<T> = [
	T,
	(event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
	Dispatch<SetStateAction<T>>
]

const useInput = <T>(initialValue: T): ReturnType<T> => {
	const [value, setValue] = useState<typeof initialValue>(initialValue)
	const handleChange = useCallback(({ target: { value } }) => {
		setValue(value)
	}, [])
	return [value, handleChange, setValue]
}

export default useInput
