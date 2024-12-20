import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useForms } from "../context/FormsContext";

export default function ViewResponses() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { forms } = useForms();

  const form = forms.find((f) => f.id === id);

  if (!form) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl">Form not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">{form.title} - Responses</Text>
      {/* Display all responses */}
      {form.responses?.map((response, index) => (
        <View key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
          <Text className="text-lg font-bold mb-2">Response {index + 1}</Text>
          {form.questions.map((question, idx) => (
            <View key={idx} className="mb-2">
              <Text className="text-sm">{question.label}:</Text>
              <Text>{response[idx]}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}
