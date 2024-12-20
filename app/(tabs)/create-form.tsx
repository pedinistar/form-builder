import React, { useState } from "react";
import {
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useForms } from "../../context/FormsContext";
import { QuestionComponent } from "@/components/QuestionComponent";

interface Question {
  id: string;
  type: "text" | "checkbox" | "grid";
  label: string;
  options?: string[];
  image?: string | null;
}

export default function CreateForm() {
  const [title, setTitle] = useState<string>("");
  const [headerImage, setHeaderImage] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const router = useRouter();
  const { addForm } = useForms();

  const pickHeaderImage = async () => {
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
        image: null,
      },
    ]);
  };

  const saveForm = () => {
    if (!title) {
      alert("Please add a title");
      return;
    }
    if (questions.length === 0) {
      alert("Please add at least one question");
      return;
    }

    const newForm = {
      id: Date.now().toString(),
      title,
      headerImage: headerImage || "https://picsum.photos/800/400",
      questions,
    };
    addForm(newForm);
    router.push("/");
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Create New Form</Text>

      {/* Header Image Section */}
      <TouchableOpacity
        className="h-48 bg-gray-200 justify-center items-center mb-4 rounded-lg"
        onPress={pickHeaderImage}
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

      {/* Title Input */}
      <TextInput
        className="border border-gray-300 rounded-lg p-2 mb-4"
        placeholder="Form Title"
        value={title}
        onChangeText={setTitle}
      />

      {/* Add Question Buttons */}
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

      {/* Question Components */}
      {questions.map((question) => (
        <QuestionComponent
          key={question.id}
          question={question}
          setQuestions={setQuestions}
        />
      ))}

      {/* Save Button */}
      <TouchableOpacity
        className="bg-green-500 p-4 rounded-lg mb-4"
        onPress={saveForm}
      >
        <Text className="text-white text-center font-bold">Save Form</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
