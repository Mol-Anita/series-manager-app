"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import ImageInput from "./ImageInput";
import StatusInput from "./StatusInput";
import { useRouter } from "next/navigation";
import { useState } from "react";

const InputForms = ({ title, apiCall, defaultValues, isEditForm, id=undefined }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({defaultValues,
  });

  const onSubmit = async (data) => {
    try {
      console.log(data.Id);
      setIsSubmitting(true);
      setError("");

      const formattedData = {
        Id: parseInt(id, 10) || 0,
        Title: data.title,
        Description: data.description,
        TotalSeasons: parseInt(data.totalSeasons, 10),
        ImagePath: data.image || "/images/mockup.jpg", // Use the URL directly or default image
        Genres: data.genre.split(",").map((g) => g.trim()),
        Status: data.status
      };

      console.log("Form data before submission:", data);
      console.log("Formatted data for API:", formattedData);
      console.log(formattedData.Id);

      if(isEditForm){
        await apiCall(id, formattedData);
      }
      else{
        await apiCall(formattedData);
      }
      

      router.push("/my-series");
    } catch (error) {
      console.error("Form submission error:", error);
      setError(error.message || "An error occurred while saving the series");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validGenres = [
    "Crime",
    "Drama",
    "Thriller",
    "Sci-Fi",
    "Horror",
    "Mystery",
    "Fantasy",
    "Adventure",
    "Action",
    "Comedy",
    "Romance",
    "Dark Comedy",
    "Animation",
    "Anthology",
    "Biography",
    "Anime",
  ];

  const validateGenre = (genreInput) => {
    console.log("Validating genre:", genreInput);

    if (!genreInput) {
      console.log("Genre validation failed: empty input");
      return "Genre is required";
    }

    const genreList = genreInput.split(",").map((g) => g.trim());
    console.log("Genre list:", genreList);

    const invalidGenres = genreList.filter(
      (genre) => !validGenres.includes(genre)
    );
    console.log("Invalid genres:", invalidGenres);

    if (invalidGenres.length > 0) {
      return `Invalid genre(s): ${invalidGenres.join(", ")}`;
    }

    return true;
  };

  const imageConstraints = {
    pattern: {
      value: /(^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$)|""/i,
      message: "Please enter a valid image URL (jpg, jpeg, png, gif, webp)",
    }
  };

  return (
    <div className="flex flex-col p-14 bg-stone-900 rounded-2xl w-3xl h-fit">
      <h1 className=" font-bold text-3xl">{title}</h1>
      <div className="py-5">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} role="form">
          <InputField
            type="text"
            label="Series Title"
            id="title"
            placeholder="ex. Game of Thrones"
            inputProps={register("title", {
              required: "Series title is required",
            })}
            errors={errors}
          />
          <InputField
            type="text"
            label="Genres"
            id="genre"
            placeholder="ex. Fantasy, Drama, ..."
            inputProps={register("genre", {
              required: "Genre is required",
              validate: validateGenre,
            })}
            errors={errors}
          />
          <InputField
            type="text"
            label="Description"
            id="description"
            placeholder="Brief description"
            inputProps={register("description", {
              required: "Description is required",
            })}
            errors={errors}
          />
          <ImageInput
            label="Cover image URL"
            id="image"
            inputProps={register("image", imageConstraints)}
            errors={errors}
          />
          <InputField
            type="text"
            label="Number of seasons"
            id="totalSeasons"
            placeholder="ex. 4"
            inputProps={register("totalSeasons", {
              required: "Season number is required",
              pattern: {
                value: /[0-9]{1,}/,
                message: "Input must be a number",
              },
            })}
            errors={errors}
          />
          <StatusInput
            errors={errors}
            register={register("status", {
              required: "Status is required",
            })}
          />
          <div className="flex justify-center">
            <SubmitButton isSubmitting={isSubmitting} text={title} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputForms;
