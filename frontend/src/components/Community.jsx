function Community() {
  return (
    <>
      <div className="bg-light-blue py-10 px-8 max-w-4xl m-auto" id="community">
        <div className="column-1 md:columns-2 p-4">
          <img src="/skyline.jpg" className="block object-scale-down rounded" />
          <div className="text-center m-3 p-5 flex">
            <article>
              <h4>Our Backgroud</h4>
              <a>A little more about us</a>
              <p>Diverse Backgrounds</p>
            </article>
            <article>
              <h4>Activity</h4>
              <a>Our Blog</a>
              <p>What we have been up to</p>
            </article>
            <article>
              <h4>Community</h4>
              <a>Get involved</a>
              <p>Hang out with us</p>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}

export default Community;
