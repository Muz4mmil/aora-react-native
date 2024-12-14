import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'

interface FormFieldProps {
  title: string,
  value: string,
  handleChange: (e: any) => void,
  otherStyles?: string,
  keyboardType?: string,
  placeholder?: string
}

const FormField = ({ title, value, placeholder, handleChange, otherStyles, keyboardType, ...props }: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-gray-100 text-base font-pmedium'>{title}</Text>

      <View className="border-2 border-black-200 h-16 w-full bg-black-100 rounded-2xl px-4 focus:border-secondary items-center flex-row">
        <TextInput
          className='flex-1 w-full text-base text-white font-psemibold'
          value={value}
          placeholder={placeholder}
          placeholderTextColor={'#7b7b8b'}
          onChangeText={handleChange}
          secureTextEntry={title === 'Password' && !showPassword}
        />

        { title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className='h-6 w-6' resizeMode='contain'/>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField