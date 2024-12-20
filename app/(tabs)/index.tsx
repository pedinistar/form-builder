import React from "react";
import { FlatList, TouchableOpacity, Text, Image, View } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useForms } from "../../context/FormsContext";
import { Form } from "../../constants/Forms";

export default function HomeScreen() {
  const router = useRouter();
  const { forms } = useForms();

  const renderForm = ({ item }: { item: Form }) => (
    <TouchableOpacity
      className="bg-gray-100 rounded-lg p-4 mb-4"
      onPress={() => {
        router.push({ pathname: "/preview-form", params: { id: item.id } });
      }}
    >
      <Image
        source={{ uri: item.headerImage }}
        className="w-full h-32 rounded-lg mb-2"
      />
      <Text className="text-lg font-bold">{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white p-4">
      <StatusBar style="auto" />
      <Text className="text-2xl font-bold mb-4">My Forms</Text>
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-lg mb-4"
        onPress={() => router.push("/create-form")}
      >
        <Text className="text-white text-center font-bold">
          Create New Form
        </Text>
      </TouchableOpacity>
      <FlatList
        data={forms}
        renderItem={renderForm}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text className="text-gray-500 text-center">No forms available</Text>
        }
      />
    </View>
  );
}
