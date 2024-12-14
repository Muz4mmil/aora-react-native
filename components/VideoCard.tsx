import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'
import { useVideoPlayer, VideoView } from 'expo-video'
import { useEvent } from 'expo'

interface VideoProps {
  title: string
  thumbnail: string
  video: string
  creator: {
    username: string
    avatar: string
  }
}

const VideoCard = ({ video: { title, thumbnail, video, creator: { username, avatar } } }: { video: VideoProps }) => {
  const [play, setPlay] = useState(false)

  const player = useVideoPlayer(video, (player) => {
    player.loop = false;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', {
    isPlaying: player.playing
  });

  return (
    <View className='flex-col items-center px-4 mb-14'>
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image source={{ uri: avatar }} className="w-full h-full rounded-lg" resizeMode='cover' />
          </View>

          <View className="flex-1 justify-center ml-3 gap-y-1">
            <Text className="text-white font-psemibold text-sm" numberOfLines={1}>{title}</Text>
            <Text className="text-gray-100 font-pregular text-xs" numberOfLines={1}>{username}</Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className='w-5 h-5' resizeMode='contain' />
        </View>
      </View>

      {play ? (
        <View className="relative w-full">
          <VideoView
            style={{
              width: '100%',
              height: 288,
              borderRadius: 33,
              marginTop: 12,
              backgroundColor: 'rgba(255,255,255,0.1)'
            }}
            player={player}
            contentFit='cover'
          />
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
        >
          <Image source={{ uri: thumbnail }} className='w-full h-full rounded-xl mt-3' resizeMode='cover' />
          <Image source={icons.play} className='w-10 h-10 absolute' resizeMode='contain' />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default VideoCard