export interface Question {
  id: string;
  type: "text" | "checkbox" | "grid";
  label: string;
  options?: string[]; // For checkbox questions
}

export interface Form {
  id: string;
  title: string;
  headerImage: string;
  questions: Question[];
}

export const SAMPLE_FORMS: Form[] = [
  {
    id: "1",
    title: "Sample Form 1",
    headerImage: "https://picsum.photos/800/400",
    questions: [
      {
        id: "q1",
        type: "text",
        label: "What is your name?",
      },
      {
        id: "q2",
        type: "checkbox",
        label: "Select your interests",
        options: ["Reading", "Writing", "Coding", "Design"],
      },
    ],
  },
];
