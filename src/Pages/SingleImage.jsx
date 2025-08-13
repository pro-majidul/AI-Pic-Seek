import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PageTitle from "../components/shared/PageTitle";

const SingleImage = () => {
  const { id } = useParams();
  const [image, setImage] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/api/image/single/${id}`)
      .then((res) => res.json())
      .then((data) => setImage(data));
  }, [id]);
  return (
    <div>
      <PageTitle>{image?.prompt}</PageTitle>
      <div className="card shadow-sm">
        <figure>
          <img
            src={image.finalImageURL}
            alt={image.prompt}
          />
        </figure>
        
      </div>
    </div>
  );
};

export default SingleImage;
