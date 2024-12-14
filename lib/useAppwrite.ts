import { useEffect, useState } from "react"
import { Alert } from "react-native"
import { Models } from "react-native-appwrite"

const useAppwrite = (fn: () => Promise<Models.Document[]>) => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<Models.Document[]>([])

  const fetchPost = async () => {
    try {
      const response = await fn()
      setData(response)
    } catch (error) {
      Alert.alert('Error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPost()  
  }, [])

  const refetch = () => fetchPost()
  
  return { data, isLoading, refetch }
}

export default useAppwrite