import React from "react";
import { TextInput, TouchableOpacity, View, Text, Image } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import * as ImagePicker from "expo-image-picker";

interface Question {
  id: string;
  type: "text" | "checkbox" | "grid";
  label: string;
  options?: string[];
  image?: string | null;
}

interface Props {
  question: Question;
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

export const QuestionComponent = ({ question, setQuestions }: Props) => {
  const pickImage = async (questionId: string) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Image URI:", result.assets[0].uri); // Debugging line
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === questionId ? { ...q, image: result.assets[0].uri } : q
        )
      );
    }
  };

  const deleteQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const updateLabel = (id: string, text: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, label: text } : q))
    );
  };

  const addOption = (questionId: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: [
                ...(q.options || []),
                `Option ${q.options?.length + 1}`,
              ],
            }
          : q
      )
    );
  };

  const updateOption = (
    questionId: string,
    optionIndex: number,
    value: string
  ) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options?.map((opt, idx) =>
                idx === optionIndex ? value : opt
              ),
            }
          : q
      )
    );
  };

  return (
    <View className="mb-4 p-4 bg-gray-50 rounded-lg">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="font-bold">{question.type.toUpperCase()}</Text>
        <TouchableOpacity onPress={() => deleteQuestion(question.id)}>
          <IconSymbol name="x-circle" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center">
        <TextInput
          className="flex-1 border border-gray-300 rounded-lg p-2 mb-2"
          placeholder="Question Label"
          value={question.label}
          onChangeText={(text) => updateLabel(question.id, text)}
        />
        <TouchableOpacity onPress={() => deleteQuestion(question.id)}>
          <IconSymbol name="trash" size={24} color="#ff0000" />
        </TouchableOpacity>
      </View>

      {question.type === "text" && (
        <>
          <TouchableOpacity
            className="h-32 bg-gray-200 justify-center items-center rounded-lg mb-2"
            onPress={() => pickImage(question.id)}
          >
            {question.image ? (
              <Image
                source={{ uri: question.image }}
                className="w-full h-full rounded-lg"
              />
            ) : (
              <Text className="text-gray-500">Add Image (Optional)</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteQuestion(question.id)}
            className="mt-2 flex-row items-center"
          >
            <Text className="text-red-500">Delete Text</Text>
          </TouchableOpacity>
        </>
      )}

      {question.type === "checkbox" && (
        <>
          {question.options?.map((option, index) => (
            <View key={index} className="flex-row items-center mb-2">
              <TextInput
                className="flex-1 border border-gray-300 rounded-lg p-2 mr-2"
                value={option}
                onChangeText={(text) => updateOption(question.id, index, text)}
                placeholder={`Option ${index + 1}`}
              />
            </View>
          ))}
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => addOption(question.id)}
          >
            <IconSymbol name="plus.circle" size={24} color="#3b82f6" />
            <Text className="text-blue-500 ml-2">Add Option</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteQuestion(question.id)}
            className="mt-2 flex-row items-center"
          >
            <Text className="text-red-500">Delete Checkbox</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
