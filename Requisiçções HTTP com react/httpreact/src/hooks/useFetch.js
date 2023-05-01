import { useState, useEffect } from 'react'

// 4 - custom hook
// resgatando dados
export const useFetch = (url) => {
  const [data, setData] = useState(null)

  // 5 - refatorando post
  const [config, setConfig] = useState(null)
  const [method, setMethod] = useState(null)
  const [callFetch, setCallFetch] = useState(null)
  
  // 6 - loading
  const [loading, setLoading] = useState(false)

  const httpConfig = (data, method) => {
    if (method === 'POST') {
      setConfig({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      setMethod('POST')
    }
  }

  useEffect(() => {
    const fetchData = async () => {

      // 6 - loading
      setLoading(true)

      const res = await fetch(url)
      const json = await res.json()

      setData(json)
      setLoading(false)
    }
    fetchData()
  }, [url, callFetch])

  // 5 - refatorando post

  useEffect(() => {
    const httpRequest = async () => {
      if (method === 'POST') {
        let fecthOptions = [url, config]

        const res = await fetch(...fecthOptions)

        const json = await res.json()

        setCallFetch(json)
      }
    }
    httpRequest()
  }, [config, method, url])

  return { data, httpConfig, loading }
}
