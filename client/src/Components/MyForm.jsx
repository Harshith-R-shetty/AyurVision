import { useState, useEffect } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MyForm = () => {
  const [formData, setFormData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const data = {
      "What is your gender?": ["Female", "Male"],
      "How is your body frame?": ["Broad", "Medium", "Thin/Narrow"],
      "What is the nature of your skin?": ["Dry", "Normal", "Oily", "Seasonal/Variable"],
      "What is the colour of your skin?": [
        "Dark",
        "Fair, Pale, Yellowish",
        "Fair, Pink",
        "Fair, Reddish",
        "Whitish",
      ],
      "How often does your weight change?": [
        "Difficulty in gaining",
        "Gain and lose easily",
        "Gain easily and lose with difficulty",
        "Stable",
      ],
      "What is the colour of your nails?": ["Pale Yellow", "Pink", "Reddish"],
      "What is the colour of your teeth?": ["Dull/Blackish", "Milky White", "Yellowish"],
      "What is the shape of your teeth": ["Irregular", "Regular"],
      "How fast can you recall past memories?": ["Moderately", "Quickly", "Slowly"],
      "How fast can you memorize new concepts?": ["Moderately", "Quickly", "Slowly"],
      "How much sleep do you get on average?": ["High", "Low", "Medium"],
      "How well do you sleep once you fall asleep?": ["Deep sleep", "Shallow sleep", "Not deep but sound sleep"],
      "How much do you speak on average?": ["Excessive", "Less", "Moderate"],
      "How fast do you speak?": ["Medium", "Quick", "Slow"],
      "How fast do you walk?": ["Medium", "Quick", "Slow"],
      "How frequently do you pass bowels?": ["Irregular", "Regular"],
      "What is the status of old friendships?": ["Good", "Medium", "Poor"],
      "How often do you dream in your sleep?": ["High", "Low", "Medium"],
      "Is your voice and speaking clear?": ["Yes, clear", "No, not clear"],
      "What is the colour of your eyes?": ["Black", "Dark Brown", "Greyish", "Light Brown"],
      "What kind of weather would you avoid?": ["Both", "Cold", "Warm"],
      "How would you describe your hair?": ["Dense", "Moderate", "Scanty"],
      "Is you hair thick or thin?": ["Thick", "Thin"],
      "Do you suffer from hair fall?": ["Yes, hair falling", "No hair fall"],
      "What kind of appetite do you have?": ["High", "Low", "Medium"],
      "What is the regularity of your food consumption?": ["Irregular", "Regular"],
      "How frequently do you usually need to go to the bathroom?": ["Irregular", "Regular"],
      "How much do you sweat?": ["High", "Low", "Medium"],
      "What is the consistency of your stool?": ["Hard", "Semisolid", "Medium"],
      "What would you rate your mental strength?": ["Good", "Okay", "Bad"],
      "What would you rate your physical strength?":["Good", "Okay", "Bad"],
      "How is your anger tolerance": ["Good", "Medium", "Poor"],
      "When you do get angry, how long does it take?": ["Moderately", "Quickly", "Slowly"],
      "Are you an argumentative person?": ["Argumentative", "Non Argumentative"],
    };

    const questionsArray = Object.entries(data).map(([key, options]) => ({
      key,
      label: key.replace(/_/g, " "),
      options,
    }));

    setQuestions(questionsArray);
    const initialFormData = {};
    questionsArray.forEach((question) => {
      initialFormData[question.key] = "";
    });
    setFormData(initialFormData);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const dataArray = [];
    for (const key in formData) {
      dataArray.push(parseInt(formData[key], 10));
    }
    let res = "";
    axios
      .post("http://localhost:3000/predict", { data: dataArray })
      .then(async (response) => {
        res = response.data.data;
        console.log(res);
        axios.get(`http://localhost:3000/chatbot/?msg=${res}`);

        setApiResponse(res);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });

    setFormData({});
  };

  return (
    <>
      <div style={{ marginTop: "70px" }}>
        <Navbar />
      </div>

      <div className="min-h-screen bg-green-100">
        <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Prakriti Identification</h1>
          <div className="w-full max-w-3xl bg-white p-8 rounded shadow-md">
            <form onSubmit={handleSubmit} className="w-full">
              {questions.map((question, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    {question.label}
                  </h3>
                  <div className="flex flex-col">
                    {question.options.map((option, optionIndex) => (
                      <label
                        key={optionIndex}
                        className="flex items-center mb-2"
                      >
                        <input
                          type="radio"
                          name={question.key}
                          value={optionIndex}
                          checked={
                            formData[question.key] === optionIndex.toString()
                          }
                          onChange={handleChange}
                          className="form-radio text-indigo-600"
                        />
                        <span className="ml-2">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <button
                type="submit"
                className={`w-full py-2 px-4 rounded ${
                  isSubmitting
                    ? "bg-gray-400"
                    : "bg-indigo-600 text-white hover:bg-green-500 transition duration-200"
                }`}
                disabled={isSubmitting}
              >
                Submit
              </button>
              <div className="flex justify-center items-center my-10 h-6">
                {isSubmitting && (
                  <>
                    <p className="text-xl inline px-5">
                      Identifying your prakriti...
                    </p>
                    <MoonLoader
                      loading={isSubmitting}
                      size={24}
                      color={"green"}
                    />
                  </>
                )}
                {apiResponse && (
                  <p className="text-xl ">
                    Your Prakriti is: <b>{apiResponse}</b>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default MyForm;
