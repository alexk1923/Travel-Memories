import { useUserContext } from "../contexts/UserContext";

type BodyProps = {
	children: React.ReactNode;
};

export default function Container({ children }: BodyProps) {
	const { user } = useUserContext();
	return <div className='h-screen bg-black'>{children}</div>;
}
