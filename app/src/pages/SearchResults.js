import React, { useEffect, useState } from "react";
import { useSearchParams } from "../hooks/useSearchParms";
import { AiOutlineFilter } from "react-icons/ai";
import { Link } from "react-router-dom";
import Title from "../components/shared/Title";
import VideoCardRow from "../components/video/VideoCardRow";
import LoadingSpin from "../components/loading/LoadingSpin";
import NoResults from "../components/shared/NoResults";
import ChannelCard from "../components/channel/ChannelCard";
import { searchVideoApi } from "../api/videoApi";
import { searchChannelApi } from "../api/channelApi";
import { toast } from "react-toastify";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get("q");
  const type = searchParams.get("type");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      if (type === "video") {
        try {
          const res = await searchVideoApi(searchTerm);
          if (res.data.success) {
            setResults(res.data.results);
          }
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        try {
          const res = await searchChannelApi(searchTerm);
          if (res.data.success) {
            setResults(res.data.results);
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
      setLoading(false);
    };
    getData();
  }, [searchTerm, type]);

  if (loading) return <LoadingSpin />;

  return (
    <>
      <div className="text-white flex items-center mb-5">
        <button className="my-3 flex items-center">
          <AiOutlineFilter className="text-2xl mr-2" /> Type
        </button>
        <div className="ml-4 flex items-center">
          <Link
            className={`${type === "video" ? "bg-red-500" : ""} block py-1 px-2 rounded-md`}
            to={`/search?type=video&q=${searchTerm}`}
          >
            Video
          </Link>
          <Link
            to={`/search?type=channel&q=${searchTerm}`}
            className={`${type === "channel" ? "bg-red-500" : ""} block py-1 px-2 rounded-md ml-3`}
          >
            Channel
          </Link>
        </div>
      </div>
      {results.length > 0 ? (
        <div className="w-full text-white">
          <Title title={`${searchTerm} | ATube - Video sharing website`} />
          {results.map((p) =>
            type === "video" ? (
              <VideoCardRow maxlengthTitle={30} key={p?._id} data={p} />
            ) : (
              <ChannelCard key={p?._id} data={p} />
            )
          )}
        </div>
      ) : (
        <NoResults />
      )}
    </>
  );
};

export default SearchResults;
