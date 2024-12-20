import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useForms } from "../context/FormsContext";

export default function FillForm() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { forms, addResponse } = useForms();
  const router = useRouter();

  const form = forms.find((f) => f.id === id);

  if (!form) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl">Form not found</Text>
      </View>
    );
  }

  const [responses, setResponses] = useState<string[]>(
    new Array(form.questions.length).fill("")
  );

  const handleChangeResponse = (index: number, value: string) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const handleSubmit = () => {
    addResponse(id, responses); // Calls the addResponse function from context to store responses
    router.push("/"); // Navigate to a confirmation page
  };

  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">
        {form.title} - Fill the Form
      </Text>
      {form.questions.map((question, index) => (
        <View key={index} className="mb-4">
          <Text className="text-lg font-bold mb-2">{question.label}</Text>
          {question.type === "text" && (
            <TextInput
              className="border border-gray-300 rounded-lg p-2"
              value={responses[index]}
              onChangeText={(text) => handleChangeResponse(index, text)}
              placeholder="Your answer"
            />
          )}
          {question.type === "checkbox" && (
            <View className="space-y-2">
              {question.options?.map((option, optIdx) => (
                <TouchableOpacity
                  key={optIdx}
                  className="flex-row items-center"
                  onPress={() => handleChangeResponse(index, option)}
                >
                  <Text>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ))}
      <TouchableOpacity
        className="bg-green-500 p-4 rounded-lg"
        onPress={handleSubmit}
      >
        <Text className="text-white text-center font-bold">Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
