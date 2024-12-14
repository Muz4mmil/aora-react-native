import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

const EmptyState = ({ title, subtitle }: { title: string, subtitle: string }) => {
  return (
    <View className='justify-center items-center px-4'>
      <Image source={images.empty} className='h-[215px] w-[270px]' resizeMode='contain' />
      <Text className="font-psemibold text-center text-white text-2xl mt-2">{title}</Text>
      <Text className="font-pmedium text-gray-100 text-sm">{subtitle}</Text>
      <CustomButton title='Create a video' handlePress={() => router.push('/create')} containerStyles='w-full my-5' />
    </View>
  )
}

export default EmptyState