import { FaHeart, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { MdBackpack, MdClose, } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { AiFillLike, AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useUserContext } from "../contexts/UserContext";
import { PlaceActionType, RatingType, usePlaceContext } from "../contexts/PlaceContext";
import React, { useEffect, useState } from "react";
import { arrayBuffer } from "stream/consumers";


type PlaceProps = {
	placeInfo: PlaceType;
	deleteFromList: (deleted_id: string) => void;
};

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
	const { state, dispatch } = usePlaceContext();
	const [colored, setColored] = useState([false, false, false, false, false]);

	const {
		_id,
		name,
		city,
		country,
		imageURL,
		likes,
		favorite,
		visitors,
		addedBy,
		likedBy,
		ratings
	} = props;

	useEffect(() => {
		console.log("Loading rating from Place...");
		const index = ratings.findIndex(rating => rating.userId === user.id);
		if (index != -1) {
			console.log("dada");

			setColored(ratingToStars(ratings[index].rating));
		}
	}, [])

	function ratingToStars(rating: number) {
		let arr = [...colored];
		for (let i in arr) {
			arr[i] = false;
			if (Number(i) < rating) {
				arr[i] = true;
			}
		}
		return arr;
	}

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
		return likedBy.includes(user.username);
	}

	function handelMouseOutRating() {
		const avg = Number((ratings.reduce((acc, ratingInfo) => ratingInfo.rating + acc, 0) / ratings.length).toFixed(2));
		setColored(ratingToStars(avg))
	}

	function handleRatingHover(i: number) {
		setColored(ratingToStars(i + 1))
	}

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
		<div className='flex flex-col relative aspect-square items-center justify-center bg-slate-100 font-bold text-xl text-end '>
			{addedBy === user.id && <MdClose
				className='inline text-red-700 self-start absolute text-3xl top-1 right-[5%] top-0 cursor-pointer'
				onClick={handleRemovePlace}
			/>}

			<div
				className='flex items-center relative'
				onClick={() => console.log(props)}
			>
				<h1 className=''>{name}</h1>
			</div>
			<img src={imageURL} alt={name} className='max-w-[70%] aspect-square' />

			<span className='inline'>
				<FaMapMarkerAlt className='inline' />
				{`${country}, ${city}`}
			</span>
			<div className='flex gap-3'>
				<span className={isLiked() ? "text-blue-700" : ""}>
					<AiFillLike
						className='inline'
						onClick={() =>
							dispatch({ type: PlaceActionType.LIKE_TOGGLE, payload: _id })
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
				{(addedBy !== user.id) &&
					<button className="border border-2 bg-red-400" onClick={handleMarkAsVisited}>
						{!visitors.includes(user.id) ? "Mark as visited" : "Remove from visited list"}
					</button>
				}
			</div>

			<div className='rating' onMouseOut={handelMouseOutRating}>
				{
					[...colored].map((e, i) =>
						<span key={i} onMouseOver={() => handleRatingHover(i)}
							onClick={() => dispatch({ type: PlaceActionType.CHANGE_RATING, payload: { _id, newRating: i + 1, userId: user.id } })}
						>
							{colored[i] ? <FaStar className='inline text-yellow-400 drop-shadow-md' /> :
								<FaStar className='inline text-stone-400 drop-shadow-md' />}
						</span>)
				}
				{ratings.length > 0 ?
					(ratings.reduce((acc, ratingInfo) => ratingInfo.rating + acc, 0) / ratings.length).toFixed(2)
					: '0.00'}
			</div>

		</div>
	);
}
