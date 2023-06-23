import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Overlay from "./Overlay";
import Loading from "../loading/Loading";
import { updatedUser } from "../../redux/slice/channelSlice";
import { uploadImg } from "../../utils/uploadImg";
import { AiOutlineCloudUpload } from "react-icons/ai";

const ModalUpdateUser = ({ setShow }) => {
  const { profile } = useSelector((state) => state.channel);
  const [previewAvatar, setPreviewAvatar] = useState(profile?.avatar);
  const [previewBackground, setPreviewBackground] = useState(profile?.background);

  const [data, setData] = useState({
    name: profile.name,
    description: profile.description,
  });

  const [avatar, setAvatar] = useState();
  const [bg, setBg] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    if (file.size / 1000000 > 5) return toast.error("Image files should not exceed 5 MB!");
    const preview = URL.createObjectURL(file);
    setPreviewAvatar(preview);
    setAvatar(file);
  };

  const handleChangeBg = (e) => {
    const file = e.target.files[0];
    if (file.size / 1000000 > 5) return toast.error("Image files should not exceed 5 MB!");
    const preview = URL.createObjectURL(file);
    setPreviewBackground(preview);
    setBg(file);
  };

  useEffect(() => {
    return () => {
      previewAvatar && URL.revokeObjectURL(previewAvatar);
    };
  }, [previewAvatar]);

  useEffect(() => {
    return () => {
      previewBackground && URL.revokeObjectURL(previewBackground);
    };
  }, [previewBackground]);

  const handleUpdated = async (e) => {
    e.preventDefault();
    if (
      previewAvatar === profile.avatar &&
      previewBackground === profile.background &&
      data.name === profile.name &&
      data.description === profile.description
    )
      return setShow(false);

    if (!data.name.trim() || !data.description.trim()) {
      return toast.error("(...) Not allowed to block name and email!");
    }

    if (data.name.trim().length > 20 || data.name.trim().length < 6) {
      return toast.warn("Name cannot be less than 4 characters and exceed 20 characters!");
    }

    if (data.description.trim().length > 75) {
      return toast.warn("Your channel description can't exceed 75 characters!");
    }

    setLoading(true);

    if (!avatar && !bg) {
      dispatch(updatedUser(data));
    }

    if (avatar && !bg) {
      const url = await uploadImg(avatar);
      dispatch(
        updatedUser({
          ...data,
          avatar: url,
        })
      );
    }

    if (bg && !avatar) {
      const url = await uploadImg(bg);
      dispatch(
        updatedUser({
          ...data,
          background: url,
        })
      );
    }

    if (bg && avatar) {
      const files = [bg, avatar];
      const url = await Promise.all(files.map(async (p) => await uploadImg(p)));
      dispatch(
        updatedUser({
          ...data,
          background: url[0],
          avatar: url[1],
        })
      );
    }

    setShow(false);
    setLoading(false);
    return toast.success("Successful channel customization!");
  };

  return (
    <Overlay setShow={setShow}>
      <form
        onSubmit={handleUpdated}
        className="text-white bg-[#333] w-[500px] max-w-[calc(100%-32px)] modal-animation"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full aspect-[16/5] relative overflow-hidden">
          <img className="w-full h-full object-fill" src={previewBackground} alt="" />
          <label
            htmlFor="file-bg"
            className="ring-[#bc13fe] ring-1 transition-opacity absolute top-0 bottom-0 right-0 left-0 
            flex items-center justify-center bg-black opacity-50"
          >
            <AiOutlineCloudUpload className="text-2xl text-white" />
          </label>
          <input type={"file"} accept="image/*" id="file-bg" hidden onChange={handleChangeBg} />
        </div>
        <div className="p-4 text-center w-full">
          <div className="w-[80px] h-[80px] overflow-hidden rounded-full mt-4 mx-auto relative">
            <img className="w-full h-full object-cover" src={previewAvatar} alt="avatar" />
            <label
              htmlFor="file-avatar"
              className="transition-opacity absolute top-0 bottom-0 right-0 left-0  
              flex items-center justify-center bg-black opacity-50"
            >
              <AiOutlineCloudUpload className="text-2xl text-white" />
            </label>
            <input
              type={"file"}
              id="file-avatar"
              hidden
              accept="image/*"
              onChange={handleChangeAvatar}
            />
          </div>
          <div className="mt-4">
            <label className="mb-2 block w-full text-left">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="py-1 px-3 rounded-sm w-full bg-[#222] text-white outline-none"
              onChange={handleChange}
              value={data.name}
            />
          </div>
          <div className="mt-4">
            <label className="mb-2 block w-full text-left">Description</label>
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              className="py-1 px-3 rounded-sm w-full bg-[#222] text-white outline-none"
              onChange={handleChange}
              value={data.description}
              rows="4"
            />
          </div>
          <div className="mt-4">
            <button className="py-2 px-3 rounded-sm w-full bg-[#bc13fe] text-white">Updated</button>
          </div>
        </div>
      </form>
      {loading && <Loading />}
    </Overlay>
  );
};

export default ModalUpdateUser;
