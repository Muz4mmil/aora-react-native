import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '@/components/SearchInput'
import EmptyState from '@/components/EmptyState'
import { searchPosts } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import VideoCard from '@/components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  const { query } = useLocalSearchParams()
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query))
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    refetch()
  }, [query])

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={{
            title: item.title,
            thumbnail: item.thumbnail,
            video: item.video,
            creator: {
              username: item.creator.username,
              avatar: item.creator.avatar,
            },
          }} />
        )}

        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-gray-100 text-sm">Search Results</Text>
            <Text className="font-psemibold text-white text-2xl">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="BNo videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Search