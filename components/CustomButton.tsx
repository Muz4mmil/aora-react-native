import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

interface ButtonProps {
  title: string,
  handlePress?: () => void,
  containerStyles?: string,
  textStyles?: string,
  isLoading?: boolean
}

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}: ButtonProps) => {
  return (
    <TouchableOpacity
    onPress={handlePress}
    activeOpacity={0.7}
    disabled={isLoading}
    className={`bg-secondary rounded-xl min-h-[62px] items-center justify-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
    >
      <Text className={`text-lg font-psemibold text-primary ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton