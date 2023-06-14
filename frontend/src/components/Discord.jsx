function Discord() {
  return (
    <>
      <h1 className="text-4xl font-bold text-center py-8">Discord</h1>
      <div className="bg-light-blue py-10 px-8 max-w-4xl m-auto">
        <h3 className="text-center font-semibold text-3xl pb-5">Community</h3>
        <div className="column-1 md:columns-2 p-4">
          <img src="/skyline.jpg" className="block object-scale-down rounded" alt="Skyline" />
          <p className="text-center m-3 p-5">
            Come join our Discord community!
          </p>
          <div className="text-center">
            <a href="https://discord.com/invite/YOUR_INVITE_LINK" target="_blank" rel="noopener noreferrer">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Join Discord
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Discord;
