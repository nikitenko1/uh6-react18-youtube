import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BiRadioCircle } from "react-icons/bi";
import { BsPencilSquare, BsTrashFill } from "react-icons/bs";
import { deleteVideo } from "../../redux/slice/channelSlice";
import ModalEditVideo from "../modal/ModalEditVideo";
import ImageFade from "../shared/ImgFade";
import { calculateCreatedTime } from "../../utils/formatDate";

const VideoCard = ({ data, edit }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleDeleteVideo = () => {
    if (window.confirm("You definitely want to delete this video?")) {
      dispatch(deleteVideo(data?._id));
      toast.success("Video deleted  successfully!");
    }
  };

  return (
    <>
      <div>
        <Link
          to={`/details/${data?._id}`}
          className="block aspect-video bg-[#333] rounded-md overflow-hidden"
        >
          <ImageFade
            alt={data?.title}
            className="w-full h-full object-cover"
            lazy_src={
              data?.videoThumbnail ? data?.videoThumbnail : data?.videoUrl?.replace(".mp4", ".jpg")
            }
          />
        </Link>
        {edit && (
          <div className="flex items-center justify-between w-full bg-red-500 px-3">
            <button onClick={() => setShow(true)} className="p-1">
              <BsPencilSquare className="text-xl" />
            </button>
            <button onClick={handleDeleteVideo} className="p-1">
              <BsTrashFill className="text-xl" />
            </button>
          </div>
        )}
        <div className="flex items-start justify-between px-2 py-4 space-x-4">
          <Link
            to={`/channel/${data?.writer?._id}`}
            className="w-[35px] h-[35px] rounded-full overflow-hidden block"
          >
            <ImageFade
              alt={data?.writer?.name}
              className="w-full h-full object-cover"
              lazy_src={data?.writer?.avatar}
            />
          </Link>
          <div className="flex flex-col flex-1 items-start justify-start">
            <Link to={`/details/${data?._id}`}>
              <p className="text-[14px] border-[#bc13fe] hover:border-b-2 font-semibold line-clamp-1 space-x-2">
                {data?.title}
              </p>
            </Link>
            <div>
              <p className="text-xs text-gray-300 mt-1">{data?.writer?.name}</p>
              <div className="flex items-center mt-1">
                <p className="text-xs text-gray-100 flex items-center">
                  {data?.totalView} view <i className="bx bx-radio-circle mx-1"></i>
                  {calculateCreatedTime(data.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {show && <ModalEditVideo video={data} setShow={setShow} />}
    </>
  );
};

export default VideoCard;
