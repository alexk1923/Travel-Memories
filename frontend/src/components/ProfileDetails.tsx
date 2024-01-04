import React from "react";
import { UserType } from "../contexts/UserContext";
import defaultUser from "../img/users/defaultUser.svg";
import { PLACE_CATEGORY } from "../constants";

type ProfileDetailsType = {
  user: UserType;
  category: {
    page: string;
    placesCategory?: PLACE_CATEGORY;
    setPlacesCategory?: React.Dispatch<React.SetStateAction<PLACE_CATEGORY>>;
  };
};

const ProfileDetails = ({ user, category }: ProfileDetailsType) => {
  const menuTitles = [
    { title: "NETWORK", itemList: [{ name: "Friends Posts" }] },
    {
      title: "MY PLACES",
      itemList: [
        { name: "Posted", value: PLACE_CATEGORY.MY_PLACES },
        { name: "Liked", value: PLACE_CATEGORY.LIKED_PLACES },
        { name: "Favorites", value: PLACE_CATEGORY.FAVORITE_PLACES },
      ],
    },
    { title: "MY JOURNEY", itemList: [{ name: "Map" }, { name: "Journey" }] },
  ];
  return (
    <div className="text-body-2 flex flex-1 flex-col gap-8 ">
      <div className="flex flex-col justify-center gap-2 rounded-lg bg-white p-4 font-bold shadow-md">
        <div className="flex flex-col items-center lg:flex-row">
          <img alt="user profile" src={defaultUser} className="w-10" />
          <div className="flex flex-col">
            <span>{user.username}</span>
            <span>@{user.username}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <span>Place visited: </span>
            <span className="text-primary">4</span>
          </div>

          <div>
            <span>Followers: </span>
            <span className="text-primary">620</span>
          </div>

          <div>
            <span>Following: </span>
            <span className="text-primary">879</span>
          </div>
        </div>
      </div>

      {menuTitles.map((menuTitle) => (
        <div className="flex flex-col gap-4 rounded-md bg-white font-bold shadow-md">
          <div className="flex w-full flex-col gap-2">
            <span className="w-full bg-primary py-2 text-center text-white ">
              {menuTitle.title}
            </span>
            <ul className="[&>*]:cursor-pointer [&>*]:pl-4 [&>*]:hover:decoration-primary">
              {menuTitle.itemList.map((item) => (
                <li
                  className="hover:underline hover:decoration-2 hover:underline-offset-2"
                  onClick={() => {
                    if (
                      item &&
                      "value" in item &&
                      item?.value &&
                      category &&
                      category.setPlacesCategory
                    )
                      category.setPlacesCategory(item.value);
                  }}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileDetails;
