import { useEffect, useState } from "react";
import SocialWrapper from "./SocialWrapper";
import Place from "../components/Place";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import Comments from "../components/Comments";
import { usePlaceContext } from "../contexts/PlaceContext";
import { PlaceType } from "../constants";

type PlaceDetailsProps = {
  placeId: string;
};

function PlaceDetails(props: PlaceDetailsProps) {
  const [placeData, setPlaceData] = useState<PlaceType>({} as PlaceType);
  const { state } = usePlaceContext();

  useEffect(() => {
    const place = state.places.find((place) => place._id === props.placeId);
    if (place) {
      setPlaceData(place);
    }
  }, [state.places, props.placeId]);

  console.log("Place details rendered");

  return (
    <div className="flex flex-row">
      {placeData && placeData._id && (
        <>
          <Place {...placeData} />
          <div className="text-white">
            <Comments placeId={placeData._id} />
          </div>
        </>
      )}
    </div>
  );
}

const PlaceDetailsPage = () => {
  const { placeId } = useParams();
  return SocialWrapper({
    WrappedComponent: () =>
      placeId ? <PlaceDetails placeId={placeId} /> : <NotFound />,
  });
};
export default PlaceDetailsPage;
