function Home() {
  return (
    <>
      <div className="bg-dark-blue flex flex-col md:flex-row md:space-x-4">
        <div className="flex items-center justify-center md:w-1/2">
          <img src="../../3.png" alt="logo" />
        </div>
        <div className="flex items-center justify-center md:w-1/2">
          <h1 className="text-3xl text-white">Welcomes You</h1>
        </div>
      </div>
    </>
  );
}

export default Home;
