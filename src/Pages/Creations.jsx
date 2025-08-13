import { useEffect, useState } from "react";
import PageTitle from "../components/shared/PageTitle";

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
            <img key={idx} src={image.finalImageURL} alt="" />
          </>
        ))}
      </div>
    </section>
  );
};

export default Creations;
