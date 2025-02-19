type HeaderProps = {
    title: string;
};

const Header = ({ title }: HeaderProps) => {
    return (
        <h1 className="text-2xl font-semibold text-gray-700">{title}</h1>
    )
}

export default Header