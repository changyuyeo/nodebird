/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useCallback,
	useState
} from 'react'

type ReturnType<T = any> = [
	T,
	(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
	Dispatch<SetStateAction<T>>
]

const useInput = <T = any>(initialData: T): ReturnType => {
	const [value, setValue] = useState(initialData)
	const onChangeValue = useCallback(
		(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setValue(e.currentTarget.value as unknown as T)
		},
		[]
	)
	return [value, onChangeValue, setValue]
}

export default useInput
