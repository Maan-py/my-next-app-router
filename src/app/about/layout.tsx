const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <nav className="fixed right-0 top-10 z-[10] h-screen w-60 bg-gray-800">
        <ul className="flex flex-col p-5">
          <li className="mr-6 cursor-pointer">Home</li>
          <li className="mr-6 cursor-pointer">About</li>
          <li className="mr-6 cursor-pointer">Profile</li>
        </ul>
      </nav>
      <div>{children}</div>
    </div>
  );
};

export default AboutLayout;
