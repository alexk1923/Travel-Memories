import { FaHeart, FaMapMarkerAlt, FaRegStar, FaStar, FaStarHalf } from "react-icons/fa";
import { MdBackpack, MdClose, } from "react-icons/md";
import { AiFillLike, } from "react-icons/ai";
import { useUserContext } from "../contexts/UserContext";
import { PlaceActionType, RatingType, usePlaceContext } from "../contexts/PlaceContext";
import React, { useCallback, useEffect, useState } from "react";
import Rating from "./Rating";
import { useLocation, useNavigate } from "react-router-dom";
import { CircleFlag } from 'react-circle-flags'


export type PlaceType = {
	_id: string;
	name: string;
	country: string;
	city: string;
	imageURL: string;
	likes: number;
	favorite: number;
	visitors: string[];
	addedBy: string;
	likedBy: string[];
	ratings: RatingType[];
};


export default function Place(props: PlaceType) {
	const { user } = useUserContext();
	const { dispatch } = usePlaceContext();
	const navigate = useNavigate();

	const {
		_id,
		name,
		city,
		country,
		imageURL,
		visitors,
		addedBy,
		likedBy,
		ratings
	} = props;

	const location = useLocation();
	const [avg, setAvg] = useState("0.00");
	const [coloredAvg, setColoredAvg] = useState([false, false, false, false, false]);
	const [colored, setColored] = useState([false, false, false, false, false]);

	useEffect(() => {

		const newAvg = ratings.reduce((acc, ratingInfo) => ratingInfo.rating + acc, 0) / ratings.length;

		setAvg((Number(newAvg)).toFixed(2));

	}, [ratings])

	const ratingToStars = useCallback((rating: number) => {
		let arr = [...colored];
		for (let i = 0; i < arr.length; i++) {
			arr[i] = false;
			if (i + 1 <= rating) {
				arr[i] = true;
			}
		}
		return arr;
	}, [colored]);

	useEffect(() => {
		const stars = ratingToStars(Number(avg));
		setColoredAvg(stars);
	}, [avg, ratingToStars])

	function handleRemovePlace() {
		fetch(`http://localhost:8000/api/places/${_id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		})
			.then((res) => res.json())
			.then((data: { deleted_id: string }) => {
				dispatch({ type: PlaceActionType.DELETE, payload: data.deleted_id });
			})

			.catch((err) => {
				console.log(err);
			});
	}

	function isLiked() {

		if (user.id === undefined) {
			return false;
		}

		return likedBy.includes(user.username);
	}


	console.log("Place rendered");
	console.log(likedBy);


	function handleMarkAsVisited(e: React.MouseEvent) {
		if (!visitors.includes(user.id)) {
			visitors.push(user.id);
		} else {
			const index = visitors.findIndex(visitor => visitor === user.id);
			visitors.splice(index, 1);
		}
		const newVisitors = visitors;
		dispatch({ type: PlaceActionType.VISIT, payload: { placeId: _id, newVisitors } });
	}

	return (
		<div className='bg-pure-white font-bold rounded-lg drop-shadow-lg flex flex-col items-center md:flex-1 md:my-5 lg:pb-5 max-w-[80%]'>
			{addedBy === user.id && <MdClose
				className='inline text-red-700 self-start absolute text-3xl top-1 right-[5%] top-0 cursor-pointer'
				onClick={handleRemovePlace}
			/>}

			<div className="relative flex justify-center self-center">
				<img src={imageURL ? imageURL : ""} alt={name} className='aspect-square w-full'
					onClick={() => {
						if (!location.pathname.includes(_id)) { navigate(`/place/${_id}`) }
					}} />

				<div className="w-full flex justify-between items-center absolute">
					<div className="w-fit ps-2"><CircleFlag countryCode="ro" width="40" /></div>
					<div className="rounded-bl-lg px-4 py-2 bg-white text-body-1">
						{ratings.length > 0 ?
							avg
							: '0.00'}
					</div>
				</div>

				<div className="flex absolute bottom-0 justify-center bg-gradient-to-t from-black w-full">
					{
						[...coloredAvg].map((e, i) =>
							<span key={i}>
								{coloredAvg[i]
									? <FaStar className='inline text-yellow-400 drop-shadow-2xl' fontSize={'1.75rem'} />
									: (Number(avg) - i >= 0.5) ? <FaStarHalf className='inline drop-shadow-2xl ' fontSize={'1.75rem'} />
										: <FaRegStar className='inline text-yellow-400 drop-shadow-2xl' fontSize={'1.75rem'} />}
							</span>)
					}
				</div>
			</div>
			<div className="flex flex-col justify-center items-center">
				<span className='text-body-1'>{name}</span>



				<span className='inline text-body-2'>
					<FaMapMarkerAlt className='inline' />
					{`${country}, ${city}`}
				</span>
				<div className='flex gap-3 text-primary text-place-card'>
					<span className={(isLiked() ? "text-blue-700" : "")}>
						<AiFillLike
							className='inline'
							onClick={() =>
								dispatch({ type: PlaceActionType.LIKE_TOGGLE, payload: { placeId: _id } })
							}
						/>
						{likedBy.length}
					</span>

					<span className={user && user.favoritePlaces && user?.favoritePlaces.includes(props._id) ? 'text-red-700 px-3' : 'px-3'}>
						<FaHeart className='inline' onClick={() => dispatch({ type: PlaceActionType.FAVORITE_TOGGLE, payload: _id })} />
					</span>
					<span>
						<MdBackpack className='inline' />
						{visitors.length}
					</span>

					{user.id && (addedBy !== user.id) &&
						<button className="border border-2 bg-red-400" onClick={handleMarkAsVisited}>
							{!visitors.includes(user.id) ? "Mark as visited" : "Remove from visited list"}
						</button>
					}
				</div>

			</div>

			{/* <Rating ratings={ratings} placeId={_id} userId={user.id} /> */}

		</div>
	);
}

export const MemoizedPlace = React.memo(Place);
