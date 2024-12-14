import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'
import { router, usePathname } from 'expo-router'


const SearchInput = ({ initialQuery }: { initialQuery?: string }) => {
  const pathname = usePathname()
  const [query, setQuery] = useState(initialQuery || '')

  return (
    <View className="border-2 border-black-200 h-16 w-full bg-black-100 rounded-2xl px-4 focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className='mt-0.5 flex-1 text-base text-white font-pregular'
        value={query}
        placeholder='Search for a video topic'
        placeholderTextColor={'#CDCDE0'}
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity onPress={() => {
        if (!query) return Alert.alert('Please enter a search query')

        if (pathname.startsWith('/search')) router.setParams({ query })
        else router.push(`/search/${query}`)
      }}>
        <Image source={icons.search} className='h-5 w-5' resizeMode='contain' />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput