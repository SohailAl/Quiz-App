import style from "../assets/css/style.css"
export default function Header()
{
    return<>
    <header className="header">
        <a href="#" className="logo">Quiz.</a>
        <nav className="navbar">
            <a href="#" className="active">Home</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Contact</a>
        </nav>
    </header>
    </>
}