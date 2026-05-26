interface HeaderPropTypes {
  cartCount: number;
}

const Header = ({ cartCount }: HeaderPropTypes) => {
  return (
    <header className="bg-white shadow-sm px-8 py-5 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Shopping Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Explore trending products</p>
      </div>

      <div className="bg-blue-600 text-white px-5 py-3 rounded-xl shadow">
        <span className="font-semibold">Orders:</span> {cartCount}
      </div>
    </header>
  );
};

export default Header;
