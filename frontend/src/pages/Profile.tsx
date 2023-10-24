import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext, UserType } from "../contexts/UserContext";
import { useLogout } from "../hooks/useLogout";
import defaultUser from "../img/defaultUser.svg";
import Places from "../components/Places";
import SocialWrapper from "./SocialWrapper";
import LocationForm from "../components/LocationForm";
import FilterForm, { PLACE_CATEGORY, PLACE_FILTER, PLACE_SORT } from "../components/FilterForm";
import { DEFAULT_COUNTRY } from "../constants";
import PlaceDetailsPage from "./PlaceDetails";

function Profile() {
	const logout = useLogout();
	const { profileUser } = useParams();
	const { user } = useUserContext();
	const [currentCity, setCurrentCity] = useState("");
	const [currentCountry, setCurrentCountry] = useState(DEFAULT_COUNTRY);
	const [placesCategory, setPlacesCategory] = useState<PLACE_CATEGORY>(PLACE_CATEGORY.MY_PLACES);
	const [sortPlace, setSortPlace] = useState<PLACE_SORT>(PLACE_SORT.RATINGS);
	const [filterPlace, setFilterPlace] = useState<PLACE_FILTER>({ country: DEFAULT_COUNTRY, city: '' });

	useEffect(() => {
		setFilterPlace({ country: currentCountry, city: currentCity });
	}, [currentCity, currentCountry])

	return (
		<div className='text-white flex flex-column justify-center items-start bg-gradient-to-b lg:from-sky-700 lg:transparent h-screen'>
			<div>
				<img src={defaultUser} className='w-10' />
				<h1>{profileUser}</h1>
				{profileUser === user.username && <h2>{user.email}</h2>}
			</div>
			<button onClick={logout} className='bg-rose-500'>
				Log out
			</button>

			<FilterForm {...{ sortPlace, setSortPlace }} category={{ page: 'Profile', placesCategory, setPlacesCategory }} />
			<LocationForm {...{ currentCity, setCurrentCity, currentCountry, setCurrentCountry }} />

			<Places profileUser={profileUser} category={placesCategory as PLACE_CATEGORY}
				sortPlace={sortPlace as PLACE_SORT} filter={filterPlace} />
		</div>
	);
}

const ProfilePage = () => SocialWrapper({ WrappedComponent: Profile });

export default ProfilePage;
