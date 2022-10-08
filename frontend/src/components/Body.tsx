type BodyProps = {
	children: React.ReactNode;
};

export default function Container({ children }: BodyProps) {
	return <div className='bg-slate-800 h-screen'>{children}</div>;
}
