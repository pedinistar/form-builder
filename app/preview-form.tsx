import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useForms } from "../context/FormsContext";
import { Form, Question } from "../constants/Forms";

export default function PreviewForm() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { forms } = useForms();
  const router = useRouter();

  const form = forms.find((f) => f.id === id);

  if (!form) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl">Form not found</Text>
      </View>
    );
  }

  const handleFill = () => {
    router.push({
      pathname: "/fill-form",
      params: { id: form.id },
    });
  };

  const handleEdit = () => {
    router.push({
      pathname: "/edit-form",
      params: { id: form.id },
    });
  };

  const handleViewResponses = () => {
    router.push({
      pathname: "/view-responses",
      params: { id: form.id },
    });
  };

  const renderQuestion = (question: Question) => (
    <View key={question.id} className="mb-4">
      <Text className="text-lg font-bold mb-2">{question.label}</Text>
      {question.type === "text" && (
        <View className="border border-gray-300 rounded-lg p-2">
          <Text className="text-gray-500">Text input field</Text>
        </View>
      )}
      {question.type === "checkbox" && (
        <View className="space-y-2">
          {question.options?.map((option, index) => (
            <View key={index} className="flex-row items-center">
              <View className="w-6 h-6 border border-gray-300 rounded mr-2" />
              <Text>{option}</Text>
            </View>
          ))}
        </View>
      )}
      {question.type === "grid" && (
        <View className="flex-row justify-between">
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
          <Text>4</Text>
          <Text>5</Text>
        </View>
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-4">{form.title}</Text>
        <Image
          source={{ uri: form.headerImage }}
          className="w-full h-48 rounded-lg mb-4"
        />
        {form.questions.map(renderQuestion)}
      </ScrollView>
      <View className="flex-row justify-between p-4 border-t border-gray-200">
        <TouchableOpacity
          className="flex-1 bg-blue-500 p-4 rounded-lg mr-2"
          onPress={handleEdit}
        >
          <Text className="text-white text-center font-bold">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 bg-green-500 p-4 rounded-lg ml-2"
          onPress={handleFill}
        >
          <Text className="text-white text-center font-bold">Fill</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 bg-yellow-500 p-4 rounded-lg ml-2"
          onPress={handleViewResponses}
        >
          <Text className="text-white text-center font-bold">Responses</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
