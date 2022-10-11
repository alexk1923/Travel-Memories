type BodyProps = {
	children: React.ReactNode;
};

export default function Container({ children }: BodyProps) {
	return <div className='h-screen'>{children}</div>;
}
