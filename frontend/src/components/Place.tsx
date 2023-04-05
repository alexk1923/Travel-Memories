import { FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import { MdBackpack, MdClose } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { useUserContext } from "../contexts/UserContext";
import { PlaceActionType, usePlaceContext } from "../contexts/PlaceContext";

type PlaceProps = {
	placeInfo: PlaceType;
	deleteFromList: (deleted_id: string) => void;
};

export type PlaceType = {
	_id: string;
	name: string;
	city: string;
	imageURL: string;
	likes: number;
	favorite: number;
	visitors: number;
	addedBy: string;
};

export default function Place(props: PlaceType) {
	const { user } = useUserContext();
	const { state, dispatch } = usePlaceContext();

	const { _id, name, city, imageURL, likes, favorite, visitors, addedBy } =
		props;

	function handleRemovePlace() {
		console.log(user.token);
		fetch(`http://localhost:8000/api/places/${_id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		})
			.then((res) => res.json())
			.then((data: { deleted_id: string }) => {
				console.log(data);
				console.log(data.deleted_id);
				dispatch({ type: PlaceActionType.DELETE, payload: data.deleted_id });
			})

			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<div className='flex flex-col relative aspect-square items-center justify-center bg-slate-100 font-bold text-xl text-end '>
			<MdClose
				className='inline text-red-700 self-start absolute text-3xl top-1 right-[5%] top-0 cursor-pointer'
				onClick={handleRemovePlace}
			/>

			<div
				className='flex items-center relative'
				onClick={() => console.log(props)}
			>
				<h1 className=''>{name}</h1>
			</div>
			<img src={imageURL} alt={name} className='max-w-[70%] aspect-square' />

			<span className='inline'>
				<FaMapMarkerAlt className='inline' />
				{city}
			</span>
			<div className='flex gap-3'>
				<span>
					<BiLike
						className='inline'
						onClick={() =>
							dispatch({ type: PlaceActionType.LIKE_INC, payload: _id })
						}
					/>
					{likes}
				</span>

				<span className='px-3'>
					<FaHeart className='inline' />
					{favorite}
				</span>
				<span>
					<MdBackpack className='inline' />
					{visitors}
				</span>
			</div>
		</div>
	);
}
