import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import { getAllPosts, getLatestPosts } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import VideoCard from '@/components/VideoCard'

const Home = () => {
  const { data: posts, refetch, isLoading } = useAppwrite(getAllPosts)
  const { data: latestPosts } = useAppwrite(getLatestPosts)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

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
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start mb-6 flex-row ">
              <View>
                <Text className="font-pmedium text-gray-100 text-sm">Welcome Back</Text>
                <Text className="font-psemibold text-white text-2xl">Muzammil</Text>
              </View>
              <View className="mt-1.5">
                <Image source={images.logoSmall} className='h-10 w-9' resizeMode='contain' />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 py-8">
              <Text className="text-gray-100 text-lg mb-3 font-pregular">Latest Videos</Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Home