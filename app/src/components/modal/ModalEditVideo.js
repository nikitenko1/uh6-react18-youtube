import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { editVideo } from "../../redux/slice/channelSlice";
import { uploadImg } from "../../utils/uploadImg";
import Overlay from "./Overlay";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Loading from "../loading/Loading";

const Modal = ({ setShow, video }) => {
  const [data, setData] = useState(video);
  const [files, setFiles] = useState();
  const [previewThumbnail, setPreviewThumbnail] = useState(
    data?.videoThumbnail ? data?.videoThumbnail : data?.videoUrl?.replace(".mp4", ".jpg")
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleEditVideo = async (e) => {
    e.preventDefault();

    if (data.title === video.title && data.description === video.description && !files) {
      return setShow(false);
    }
    if (!data.title.trim() || !data.description.trim()) {
      return toast.error("Fields cannot be left blank!");
    }
    if (data.title.trim().length > 100) {
      return toast.error(
        "Video title cannot exceed 76 characters and description cannot exceed 100 characters!"
      );
    }
    setLoading(true);

    if (!files) {
      dispatch(
        editVideo({
          id: video._id,
          data,
        })
      );
    }
    if (files) {
      const url = await uploadImg(files);
      dispatch(
        editVideo({
          id: video._id,
          data: {
            ...data,
            videoThumnail: url,
          },
        })
      );
    }

    setLoading(false);
    return toast.success("Video edited Successfully!");
  };

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    setPreviewThumbnail(preview);
    setFiles(file);
  };

  useEffect(() => {
    return () => {
      previewThumbnail && URL.revokeObjectURL(previewThumbnail);
    };
  }, [previewThumbnail]);

  return (
    <Overlay setShow={setShow}>
      <form
        onSubmit={handleEditVideo}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#222] w-[400px] max-w-[calc(100%-32px)] p-4 modal-animation"
      >
        <div className="w-full aspect-[16/9] mb-4 relative">
          <label
            htmlFor="thumnail"
            className="absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-black 
            opacity-50"
          >
            <AiOutlineCloudUpload className="text-2xl text-white" />
          </label>
          <img className="w-full h-full object-cover" alt="upload" src={previewThumbnail} />
          <input type={"file"} accept="image/*" hidden id="thumbnail" onChange={onChangeFile} />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            className="px-3 py-2 bg-[#111] outline-none rounded-sm w-full"
            value={data?.title}
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            className="px-3 py-2 bg-[#111] outline-none rounded-sm w-full"
            value={data?.description}
            rows={4}
            name="description"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <button className="px-3 py-2 outline-none rounded-sm w-full bg-[#bc13fe]">
            Updated Video
          </button>
        </div>
      </form>
      {loading && <Loading />}
    </Overlay>
  );
};

export default Modal;
