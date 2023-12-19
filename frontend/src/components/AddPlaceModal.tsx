// Modal.tsx
import React, { useState } from "react";
import { FaWindowClose, FaUpload } from "react-icons/fa";
import LocationForm from "./LocationForm";
import FormInput from "./FormInput";
import { DEFAULT_COUNTRY } from "../constants";
import ModalWrapper from "./ModalWrapper";
import Button from "./Button";
import { PlaceActionType, usePlaceContext } from "../contexts/PlaceContext";
import { PlaceType } from "./Place";

interface ModalProps {
  onCloseFn: () => void;
}

const AddPlaceModal: React.FC<ModalProps> = ({ onCloseFn }) => {
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [currentCity, setCurrentCity] = useState("");
  const [currentCountry, setCurrentCountry] = useState(DEFAULT_COUNTRY);
  const [error, setError] = useState("");
  const { dispatch } = usePlaceContext();

  const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setPhoto(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // Handle form submission logic here
    e.preventDefault();
    console.log(photo);
    const formData: any = new FormData();
    formData.append("file", photo);
    formData.append("upload_preset", "place_upload");

    let uploadedImg = "";

    await fetch("https://api.cloudinary.com/v1_1/da7fkxkl8/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject();
        }
      })
      .then(
        (data: { secure_url: string; public_id: string }) =>
          (uploadedImg = data.secure_url),
      )
      .catch((err) => console.log(err));

    if (
      currentCountry === DEFAULT_COUNTRY ||
      currentCity === "" ||
      name === ""
    ) {
      setError("Please select a valid location");
      return;
    }
    console.log("Submitted:", { currentCountry, currentCity, name, photo });

    dispatch({
      type: PlaceActionType.ADD,
      payload: {
        name,
        country: currentCountry,
        city: currentCity,
        imageURL: uploadedImg,
      } as PlaceType,
    });

    setError("");
    onCloseFn();
  };

  return (
    <form className="flex flex-col gap-4 ">
      <label>Location</label>
      <LocationForm
        currentCity={currentCity}
        currentCountry={currentCountry}
        setCurrentCity={setCurrentCity}
        setCurrentCountry={setCurrentCountry}
      />

      <FormInput
        label={"Name"}
        htmlFor={"placeName"}
        type={"text"}
        placeholder={"The place you have visited"}
        name={"placeName"}
        errorMessage={"The input cannot be empty"}
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />
      <div className="mb-4">
        <label
          htmlFor="photo"
          className="text-gray-700 mb-1 block text-sm font-medium"
        >
          Upload Photo
        </label>
        <div className="flex items-center space-x-2">
          <label htmlFor="upload" className="cursor-pointer">
            <FaUpload className="text-primary" />
          </label>
          <input
            type="file"
            id="upload"
            name="upload"
            accept="image/*"
            onChange={handleUploadPhoto}
            className="hidden"
          />
          {photo && <span className="text-gray-700">{photo.name}</span>}
        </div>
      </div>
      {error !== "" && <span className="text-red">{error}</span>}
      <div className="flex justify-end">
        <Button variant="filled" onClick={handleSubmit} text="Save"></Button>
      </div>
    </form>
  );
};

type ModalComponentProps = {
  onCloseFn: () => void;
  title: string;
};

const ModalComponent: React.FC<ModalComponentProps> = ({
  onCloseFn,
  title,
}) => (
  <ModalWrapper onCloseFn={onCloseFn} title={title}>
    <AddPlaceModal onCloseFn={onCloseFn} />
  </ModalWrapper>
);

export default ModalComponent;
