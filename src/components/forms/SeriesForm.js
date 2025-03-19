"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import ImageInput from "./ImageInput";
import StatusInput from "./StatusInput";
import { useRouter } from "next/navigation";

const InputForms = ({ title, apiCall }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      genre: "",
      description: "",
      image: "",
      totalSeasons: "",
      status: "Currently Watching",
    },
  });

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (data) => {
    try {
      let imageBase64 = "";

      if (data.image && data.image[0]) {
        imageBase64 = await convertToBase64(data.image[0]);
      }

      const formattedData = {
        title: data.title,
        genre: data.genre.split(",").map((g) => g.trim()),
        description: data.description,
        totalSeasons: parseInt(data.totalSeasons, 10),
        status: data.status,
        image: imageBase64,
      };

      console.log("Submitting Data:", formattedData);

      await apiCall(formattedData);
      router.push("/my-series");
    } catch (error) {
      console.error("Form submission error:", error);
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

  return (
    <div className="flex flex-col p-14 bg-stone-900 rounded-2xl w-3xl h-fit">
      <h1 className=" font-bold text-3xl">{title}</h1>
      <div className="py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
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
            label="Cover image"
            id="image"
            inputProps={register("image", {
              required: "Cover image is required",
              pattern: {
                value: /\.(jpg|jpeg|png|gif|webp)$/i,
                message: "Invalid image format",
              },
            })}
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
            <SubmitButton text="Add series" />
          </div>
        </form>
      </div>
    </div>
  );
};
export default InputForms;
