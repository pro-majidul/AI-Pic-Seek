import { useEffect, useState } from "react";
import PageTitle from "../components/shared/PageTitle";
import { Link } from "react-router";

const Creations = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/image/all-image")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, [images]);

  return (
    <section>
      <PageTitle> Let&apos;s Code_ Your Career </PageTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 px-3 py-3">
        {images.map((image, idx) => (
          <>
            <div key={idx} className="card relative  shadow-sm">
              <figure>
                <img src={image.finalImageURL} alt="Shoes" />
              </figure>
              <div className=" absolute bottom-1 right-1">
                <Link to={`/creations/${image._id}`} className="btn btn-info ">
                  View Details
                </Link>
              </div>
            </div>
          </>
        ))}
      </div>
    </section>
  );
};

export default Creations;
