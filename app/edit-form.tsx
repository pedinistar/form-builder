import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useForms } from "../context/FormsContext";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Question } from "../constants/Forms";

export default function EditForm() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { forms, updateForm } = useForms();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const form = forms.find((f) => f.id === id);
    if (form) {
      setTitle(form.title);
      setHeaderImage(form.headerImage);
      setQuestions(form.questions);
    }
  }, [id, forms]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setHeaderImage(result.assets[0].uri);
    }
  };

  const addQuestion = (type: "text" | "checkbox" | "grid") => {
    setQuestions([
      ...questions,
      {
        id: Date.now().toString(),
        type,
        label: "",
        options: type === "checkbox" ? ["Option 1"] : undefined,
      },
    ]);
  };

  const updateQuestionLabel = (id: string, label: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, label } : q)));
  };

  const addOption = (questionId: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: [
                ...(q.options || []),
                `Option ${(q.options?.length || 0) + 1}`,
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
    setQuestions(
      questions.map((q) =>
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

  const handleUpdate = () => {
    if (!title) {
      alert("Please add a title");
      return;
    }
    if (questions.length === 0) {
      alert("Please add at least one question");
      return;
    }

    updateForm({
      id,
      title,
      headerImage,
      questions,
    });
    router.back();
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Edit Form</Text>
      <TouchableOpacity
        className="h-48 bg-gray-200 justify-center items-center mb-4 rounded-lg"
        onPress={pickImage}
      >
        {headerImage ? (
          <Image
            source={{ uri: headerImage }}
            className="w-full h-full rounded-lg"
          />
        ) : (
          <Text className="text-lg text-gray-500">Add Header Image</Text>
        )}
      </TouchableOpacity>
      <TextInput
        className="border border-gray-300 rounded-lg p-2 mb-4"
        placeholder="Form Title"
        value={title}
        onChangeText={setTitle}
      />
      <View className="flex-row justify-between mb-4">
        <TouchableOpacity
          className="bg-blue-500 p-2 rounded"
          onPress={() => addQuestion("text")}
        >
          <Text className="text-white">Add Text</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-blue-500 p-2 rounded"
          onPress={() => addQuestion("checkbox")}
        >
          <Text className="text-white">Add Checkbox</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-blue-500 p-2 rounded"
          onPress={() => addQuestion("grid")}
        >
          <Text className="text-white">Add Grid</Text>
        </TouchableOpacity>
      </View>
      {questions.map((question) => (
        <View key={question.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
          <Text className="font-bold mb-2">{question.type.toUpperCase()}</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-2 mb-2"
            placeholder="Question Label"
            value={question.label}
            onChangeText={(text) => updateQuestionLabel(question.id, text)}
          />
          {question.type === "checkbox" && (
            <View className="ml-4">
              {question.options?.map((option, index) => (
                <View key={index} className="flex-row items-center mb-2">
                  <TextInput
                    className="flex-1 border border-gray-300 rounded-lg p-2 mr-2"
                    value={option}
                    onChangeText={(text) =>
                      updateOption(question.id, index, text)
                    }
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
            </View>
          )}
        </View>
      ))}
      <TouchableOpacity
        className="bg-green-500 p-4 rounded-lg mb-4"
        onPress={handleUpdate}
      >
        <Text className="text-white text-center font-bold">Update Form</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
