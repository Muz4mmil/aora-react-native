import { Redirect, router } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from '../constants'
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function Index() {

  const { isLoading, isLoggedIn } = useGlobalContext()

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />
  
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full h-full items-center justify-center px-4">
          <Image source={images.logo} resizeMode="contain" className="w-[130px] h-[84px]" />
          <Image source={images.cards} className="max-w-[380px] w-full h-[300px]" resizeMode="contain" />
          <View className="relative mt-5">
            <Text className="font-bold text-white text-center text-4xl">
              Discover Endless{'\n'}Possibilities with <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image source={images.path} className="w-[136px] h-[15px] absolute -bottom-2 -right-8" resizeMode="contain" />
          </View>

          <Text className="text-sm font-pregular mt-7 text-center text-gray-200">Where creativity meets innovation: embark on a journey with limitless exploration with Aora</Text>

          <CustomButton title='Continue with Email' handlePress={() => router.push('/sign-in')} containerStyles='w-full mt-7'/>
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
}
