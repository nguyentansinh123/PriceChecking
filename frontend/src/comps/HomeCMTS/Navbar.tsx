import logo from "../../assets/logo.png";
const Navbar = () => {
  return (
    <header className="flex justify-between items-center px-4 py-4">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="PCompare Logo" className="h-10" />
        <span className="font-bold text-lg">PCompare</span>
      </div>
      <nav className="space-x-10 text-lg font-semibold">
        <a href="#" className="hover:text-blue-600">
          Home
        </a>
        <a href="#" className="hover:text-blue-600">
          About Us
        </a>
        <a href="#" className="hover:text-blue-600">
          Service
        </a>
        <a href="#" className="hover:text-blue-600">
          Contact Us
        </a>
        <button
          className="bg-[#0c1c64] text-white px-8 py-2 rounded-md cursor-pointer hover:bg-blue-600"
          onClick={() => (window.location.href = "/login")}
        >
          {" "}
          Login
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
