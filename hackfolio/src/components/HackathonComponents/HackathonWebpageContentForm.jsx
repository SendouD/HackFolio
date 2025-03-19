import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ResizableTextArea from "./ResizableTextArea";
import axios from "axios";
import LoadingPage from "../loading";
import { motion } from "framer-motion";

function HackathonWebpageContentForm(props) {
  const aboutRef = useRef(null);
  const prizeRef = useRef(null);
  const imgInpRef = useRef(null);
  const imgRef = useRef(null);
  const [otherFields, setOtherFields] = useState([]);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { name } = useParams();
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    const inputElement = imgInpRef.current;

    const handleImageChange = async (e) => {
      const selectedFile = e.target.files[0];

      if (selectedFile) {
        if (!validateImageFile(selectedFile)) {
          setImageError("Invalid file type. Please upload an image file.");
          setFile(""); // Reset file
          return;
        }

        setImageError(""); // Clear any previous errors
        setFile(selectedFile);

        const reader = new FileReader();
        reader.onload = (e) => {
          imgRef.current.src = e.target.result;
        };
        reader.readAsDataURL(selectedFile);
      }
    };

    inputElement.addEventListener("change", handleImageChange);

    return () => {
      inputElement.removeEventListener("change", handleImageChange);
    };
  }, []);

  const validateImageFile = (file) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/webp",
    ];
    return allowedTypes.includes(file.type);
  };

  const validateInput = (value) => {
    const pattern = /^[A-Za-z][A-Za-z0-9\s.,'-]*$/;
    return pattern.test(value);
  };

  const handleImageUpload = async (file) => {
    const uploadPreset = "hackathonform";
    const cloudName = "dgjqg72wo";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: false,
        }
      );
      return response.data.secure_url;
    } catch (error) {
      console.error(
        "Error uploading file:",
        error.response ? error.response.data : error.message
      );
      return null;
    }
  };

  async function handleSubmit(e) {
    console.log("Submit button clicked");

    const aboutHack = aboutRef.current.value;
    const aboutPrize = prizeRef.current.value;
    let validationErrors = { about: "", prize: "" };
    let isValid = true;

    if (!validateInput(aboutHack)) {
      validationErrors.about = "About Hackathon must start with a letter and cannot start with numbers, spaces, or special characters.";
      isValid = false;
    }

    if (!validateInput(aboutPrize)) {
      validationErrors.prize = "About Prizes must start with a letter and cannot start with numbers, spaces, or special characters.";
      isValid = false;
    }

    setErrors(validationErrors);

    console.log("Validation result:", isValid, "Image Error:", imageError);

    if (!isValid || imageError) {
      console.log("Validation failed, submission stopped.");
      return;
    }

    try {
      setLoading(true);

      let imageUrl = "a";  // Default value
      if (file) {
        imageUrl = await handleImageUpload(file);
        console.log("Uploaded Image URL:", imageUrl);
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/hackathonCreate/${name}/2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl,
          aboutHack,
          aboutPrize,
          otherFields,
        }),
        credentials: "include",
      });

      console.log("Response Status:", response.status);

      if (response.status === 403) {
        navigate("/Error403");
        return;
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setLoading(false);
      navigate(`/organizedHackathons/${name}`);
    } catch (error) {
      console.error("Error posting data:", error);
      setLoading(false);
    }
  }

  function addField() {
    setOtherFields([...otherFields, { key: "", value: "" }]);
  }

  function removeField(ind) {
    const newArr = [
      ...otherFields.slice(0, ind),
      ...otherFields.slice(ind + 1),
    ];
    setOtherFields(newArr);
  }

  function handleFieldChange(index, fieldType, value) {
    const updatedFields = otherFields.map((field, i) =>
      i === index ? { ...field, [fieldType]: value } : field
    );
    setOtherFields(updatedFields);
  }

  function handleTextChange(e, textRef) {
    textRef.current.style.height = "0px";
    const scrollHeight = textRef.current.scrollHeight;
    textRef.current.style.height = scrollHeight + "px";
  }

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex justify-center relative">
      <div className="max-w-screen-xl w-full my-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
              {/* Image Upload Section */}
              <div className="mb-6">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img
                    className="h-full w-full object-cover"
                    ref={imgRef}
                    alt="Hackathon banner"
                  />
                </div>
                <input
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                  className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                  ref={imgInpRef}
                />
                {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}
              </div>

              {/* About Hackathon Section */}
              <div className="mb-6">
                <h2 className="text-2xl font-medium mb-3 text-gray-800">About Hackathon</h2>
                <div>
                  <textarea
                    className="w-full min-h-[150px] border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                    placeholder="Enter details about the hackathon"
                    ref={aboutRef}
                    onChange={(e) => handleTextChange(e, aboutRef)}
                  />
                  {errors.about && <p className="text-red-500 text-sm mt-1">{errors.about}</p>}
                </div>
              </div>

              {/* About Prizes Section */}
              <div className="mb-6">
                <h2 className="text-2xl font-medium mb-3 text-gray-800">About Prizes</h2>
                <div>
                  <textarea
                    className="w-full min-h-[150px] border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                    placeholder="Enter details about prizes"
                    ref={prizeRef}
                    onChange={(e) => handleTextChange(e, prizeRef)}
                  />
                  {errors.prize && <p className="text-red-500 text-sm mt-1">{errors.prize}</p>}
                </div>
              </div>

              {/* Custom Fields */}
              {otherFields.map((field, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-lg mb-4">
                  <input
                    type="text"
                    className="w-full mb-2 text-lg font-medium border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter field name"
                    value={field.key}
                    onChange={(e) => handleFieldChange(i, "key", e.target.value)}
                  />
                  <ResizableTextArea
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter field value"
                    val={field.value}
                    otherFields={otherFields}
                    setOtherFields={setOtherFields}
                    ind={i}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      className="text-sm py-1 px-3 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 transition-colors"
                      onClick={() => removeField(i)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={addField}
                className="text-sm py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors flex items-center"
              >
                <span>Add more fields</span>
              </button>
            </div>

            <div className="mt-6">
              <button
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/3">
            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 sticky top-4">
              <div className="text-gray-500 mb-4">From: To:</div>
              <div className="flex justify-center">
                <button className="w-full text-base bg-gray-300 text-gray-600 py-3 rounded-lg font-medium cursor-default">
                  Apply now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Background Animations - Simplified */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-[30%] left-[5%] w-24 h-24"
            initial={{ pathLength: 0, opacity: 0.3 }}
            whileInView={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 2 }}
          >
            <motion.svg
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M10 10 L 50 50 L 90 10"
                fill="transparent"
                stroke="#3b82f6"
                strokeWidth="4"
              />
            </motion.svg>
          </motion.div>

          <motion.div
            className="absolute bottom-[20%] right-[10%] w-24 h-24"
            initial={{ pathLength: 0, opacity: 0.3 }}
            whileInView={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 2 }}
          >
            <motion.svg
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M10 10 L 50 50 L 90 10"
                fill="transparent"
                stroke="#3b82f6"
                strokeWidth="4"
              />
            </motion.svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default HackathonWebpageContentForm;