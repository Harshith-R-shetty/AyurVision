import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MyForm = () => {
  const [formData, setFormData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [apiResponse, setApiResponse] = useState(null); // Add this line

  useEffect(() => {
    const data = {
      Gender: ["Female", "Male"],
      bodyFrame_Breadth: ["Broad", "Medium", "Thin/Narrow"],
      skin_Nature: ["Dry", "Normal", "Oily", "Seasonal/Variable"],
      skin_Color: ["Dark", "FairPaleYellow", "FairPink", "FairReddish", "Whitish"],
      weight_Changes: ["Difficultyingaining", "Gainandloseeasily", "Gaineasilyandlosewithdifficulty", "Stable"],
      nails_color: ["PaleYellow", "Pink", "Reddish"],
      teeth_Color: ["Dull/Blackish", "MilkyWhite", "Yellowish"],
      teeth_Shape: ["Irregular", "Regular"],
      recalling_speed: ["Moderately", "Quickly", "Slowly", "Variably"],
      memorizing_speed: ["Moderately", "Quickly", "Slowly", "Variably"],
      sleep_Amount: ["High", "Low", "Medium", "Variable"],
      sleep_Quality: ["Deep", "Shallow", "Sound"],
      speaking_Amount: ["Excessive", "Less", "Moderate"],
      speaking_Speed: ["Medium", "Quick", "Slow", "Variable"],
      walking_Speed: ["Medium", "Quick/Fast/Brisk", "Slow", "Variable"],
      bowel_Freq: ["Irregular", "Regular", "Variable"],
      retainingFriends_quality: ["Good", "Medium", "Poor"],
      dreams_Amount: ["High", "Low", "Medium", "Variable"],
      voice_clear: ["Clear", "Non_Clear"],
      eye_Color: ["Black", "DarkBrown", "Grayish", "LightBrown"],
      healthproblem_in_temp: ["Both", "Cold", "Warm", null],
      hair_Growth: ["Dense", "Moderate", "Scanty"],
      hair_Type: ["Thick", "Thin"],
      hair_Nature2: ["Falling", "Non_Falling"],
      appetite_Amount: ["High", "Low", "Medium", "Variable"],
      appetite_Frequency: ["Irregular", "Regular"],
      bladder_Frequency: ["Irregular", "Regular"],
      perspiration_Amount: ["High", "Low", "Medium"],
      stool_Consistency: ["Hard", "Loose/Soft/Semisolid", "Medium"],
      mental_Power: ["Grade1", "Grade2", "Grade3"],
      physical_Power: ["Grade1", "Grade2", "Grade3"],
      Anger_Freq: ["Good", "Medium", "Poor"],
      Irritability_speed: ["Moderately", "Quickly", "Slowly", "Variably"],
      speech_Argumentative: ["Argumentative", "Non_Argumentative"],
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

    axios
      .post("http://localhost:3000/predict", { data: dataArray })
      .then((response) => {
        console.log(response.data);
        setApiResponse(response.data);
        setSubmissionMessage(`Successfully submitted.`);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });

    setIsSubmitting(false);
    setFormData({}); 

  };

  return (<>
    <div style={{ marginTop: '70px' }}><Navbar /></div>

    <div className="min-h-screen bg-green-100">

      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Prakriti Identification</h1>
        <div className="w-full max-w-3xl bg-white p-8 rounded shadow-md">
          <form onSubmit={handleSubmit} className="w-full">
            {questions.map((question, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{question.label}</h3>
                <div className="flex flex-col">
                  {question.options.map((option, optionIndex) => (
                    <label key={optionIndex} className="flex items-center mb-2">
                      <input
                        type="radio"
                        name={question.key}
                        value={optionIndex}
                        checked={formData[question.key] === optionIndex.toString()}
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
              className={`w-full py-2 px-4 rounded ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-green-500 transition duration-200'
                }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            {submissionMessage && <p className="text-center mt-4">{submissionMessage}</p>}
            {apiResponse && (
              <div className="text-center mt-4">
                <p>Your Prakriti:</p>
                <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
              </div>
            )}
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
