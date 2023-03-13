import { FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import { MdBackpack } from "react-icons/md";
import { BiLike } from "react-icons/bi";

export type PlaceType = {
	name: string;
	city: string;
	imageURL: string;
	likes: number;
	favorite: number;
	visitors: number;
	addedBy: string;
};

export default function Place(props: PlaceType) {
	const { name, imageURL, city, likes, favorite, visitors, addedBy } = props;

	return (
		<div className='flex flex-col aspect-square items-center justify-center bg-slate-100 font-bold text-xl'>
			<h1>{name}</h1>
			<img src={imageURL} alt={name} className='max-w-[70%] aspect-square' />
			<span className='inline'>
				<FaMapMarkerAlt className='inline' />
				{city}
			</span>
			<div className='flex gap-3'>
				<span>
					<BiLike className='inline' />
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
