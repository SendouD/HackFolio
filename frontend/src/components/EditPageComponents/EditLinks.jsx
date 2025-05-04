import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Links = () => {
    const [formData, setFormData] = useState({
        linkedinProfile: "",
        githubProfile: "",
        additionalLinks: [],
    });

    const [errors, setErrors] = useState({
        linkedinProfile: "",
        githubProfile: "",
        additionalLinks: [],
    });

    const [editableFields, setEditableFields] = useState({
        linkedinProfile: false,
        githubProfile: false,
        additionalLinks: false,
    });

    const { id: userId } = useParams();

    const urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.(com|in)\/?.*$/;

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) return;

            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/userProfile/${userId}/1`);
                const userData = response.data.user || response.data;

                setFormData({
                    linkedinProfile: userData.linkedinProfile || "",
                    githubProfile: userData.githubProfile || "",
                    additionalLinks: userData.additionalLinks || [],
                });
                setErrors({
                    linkedinProfile: "",
                    githubProfile: "",
                    additionalLinks: [],
                });
            } catch (error) {
                console.error("Error fetching links data:", error);
                alert("Failed to fetch links data");
            }
        };
        fetchData();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: value && !urlRegex.test(value) ? "Invalid URL format." : "" }));
    };

    const handleAdditionalLinksChange = (index, value) => {
        setFormData((prev) => {
            const newLinks = [...prev.additionalLinks];
            newLinks[index] = value;
            return { ...prev, additionalLinks: newLinks };
        });

        setErrors((prev) => {
            const newErrors = [...prev.additionalLinks];
            newErrors[index] = value && !urlRegex.test(value) ? "Invalid URL format." : "";
            return { ...prev, additionalLinks: newErrors };
        });
    };

    const updateLinks = async (field) => {
        const hasErrors = Object.values(errors).some(error => Array.isArray(error) ? error.some(msg => msg !== "") : error !== "");
        if (hasErrors) {
            alert("Fix errors before saving.");
            return;
        }

        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/userProfile/${userId}/1`, formData);
            if (response.status === 200) {
                alert("Links updated successfully!");
                setEditableFields((prev) => ({ ...prev, [field]: false }));
            }
        } catch (error) {
            console.error("Error updating links data:", error);
            alert("Failed to update links data");
        }
    };

    const handleEdit = (field) => {
        if (editableFields[field]) {
            updateLinks(field);
        } else {
            setEditableFields((prev) => ({ ...prev, [field]: true }));
        }
    };

    const addLink = () => {
        setFormData((prev) => ({
            ...prev,
            additionalLinks: [...prev.additionalLinks, ""],
        }));
        setErrors((prev) => ({
            ...prev,
            additionalLinks: [...prev.additionalLinks, ""],
        }));
    };

    const removeLink = (index) => {
        setFormData((prev) => ({
            ...prev,
            additionalLinks: prev.additionalLinks.filter((_, i) => i !== index),
        }));

        setErrors((prev) => ({
            ...prev,
            additionalLinks: prev.additionalLinks.filter((_, i) => i !== index),
        }));
    };

    const renderEditableField = (label, name) => (
        <div className="mt-4">
            <label htmlFor={name}>{label}: </label>
            <div className="flex items-center">
                <input
                    id={name}
                    name={name}
                    value={formData[name]}
                    disabled={!editableFields[name]}
                    onChange={handleChange}
                    className={`edit-inp shadow border rounded w-full py-2 px-3 ${errors[name] ? "border-red-500" : ""}`}
                />
                <button
                    onClick={() => handleEdit(name)}
                    className="bg-[#5f3abd] hover:bg-[#5634ac] text-white font-medium py-2 px-4 rounded ml-2"
                >
                    {editableFields[name] ? "Save" : "Edit"}
                </button>
            </div>
            {errors[name] && <p className="text-red-500 mt-1">{errors[name]}</p>}
        </div>
    );

    return (
        <div>
            <h2 className="text-3xl bold mb-4">Links Section:</h2>

            {renderEditableField("LinkedIn Profile", "linkedinProfile")}
            {renderEditableField("GitHub Profile", "githubProfile")}

            <div className="mt-4">
                <label>Additional Links:</label>
                {formData.additionalLinks.map((link, i) => (
                    <div key={i} className="flex items-center">
                        <input
                            value={link}
                            onChange={(e) => handleAdditionalLinksChange(i, e.target.value)}
                            disabled={!editableFields.additionalLinks}
                            className={`edit-inp shadow border rounded w-full py-2 px-3 mt-2 ${errors.additionalLinks[i] ? "border-red-500" : ""}`}
                        />
                        <button onClick={() => removeLink(i)} className="font-medium edit-btn mt-2 ml-2">Remove</button>
                        {errors.additionalLinks[i] && <p className="text-red-500 mt-1">{errors.additionalLinks[i]}</p>}
                    </div>
                ))}
                <button onClick={addLink} className="add-link-btn font-medium edit-btn py-2 px-3">Add</button>
                <button onClick={() => handleEdit("additionalLinks")} className="bg-[#5f3abd] hover:bg-[#5333a3] text-white font-medium py-2 px-4 rounded">{editableFields.additionalLinks ? "Save" : "Edit"}</button>
            </div>
        </div>
    );
};

export default Links;
