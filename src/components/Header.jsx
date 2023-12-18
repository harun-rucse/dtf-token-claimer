import Container from "./Container";

function Header() {
  return (
    <header className="bg-[#111518] text-white p-2">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8">
            <img src="/images/logo.png" alt="Logo" className="w-[40px] md:w-[55px]" />
            <ul className="flex items-center gap-4 md:gap-8 text-sm">
              <li className="hover:text-gray-500 transition">
                <a href="#">Telegram</a>
              </li>
              <li className="hover:text-gray-500 transition">
                <a href="#">Website</a>
              </li>
            </ul>
          </div>
          <div>
            <button className="bg-white text-gray-800 px-2 md:px-4 py-2 text-sm rounded-lg">Connect Wallet</button>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
