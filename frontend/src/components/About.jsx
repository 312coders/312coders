function About() {
  return (
    <>
      <div className="bg-gray-300">
        <h2 className="text-center text-4xl text-mid-blue font-bold pt-7">
          About Us
        </h2>
        <div className="columns-1 md:columns-3 p-5">
          <div className="p-5">
            <h3 className="text-center text-xl font-medium pb-3">Who we are</h3>
            <img
              src="../../public/placeholder.jpg"
              className="hidden md:block"
            />
            <p className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Assumenda architecto blanditiis veritatis sed impedit!
            </p>
          </div>
          <div className="p-5">
            <h3 className="text-center text-xl font-medium pb-3">What we do</h3>
            <img
              src="../../public/placeholder.jpg"
              className="hidden md:block"
            />
            <p className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Assumenda architecto blanditiis veritatis sed impedit!
            </p>
          </div>
          <div className="p-5">
            <h3 className="text-center text-xl font-medium pb-3">Why we do</h3>
            <img
              src="../../public/placeholder.jpg"
              className="hidden md:block"
            />
            <p className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Assumenda architecto blanditiis veritatis sed impedit!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
