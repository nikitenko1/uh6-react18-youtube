import React, { useEffect, useState } from "react";
import Title from "../components/shared/Title";
import FeedVideo from "../components/shared/FeedVideo";
import { clearData, getVideoHomePage } from "../redux/slice/infinityLoadSlice";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const [page, setPage] = useState(1);

  const { data, totalPage, error } = useSelector((state) => state.infinity);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = async () => {
      setLoading(true);
      await dispatch(getVideoHomePage(page));
      setLoading(false);
    };

    return () => {
      data();
      dispatch(clearData());
    };
  }, []);

  useEffect(() => {
    if (page === 1) return;
    setLoading(true);
    dispatch(getVideoHomePage(page));
    setLoading(false);
  }, [page]);

  return (
    <>
      <Title title={"UA You - Video sharing website"} />
      <FeedVideo
        page={page}
        setPage={setPage}
        data={data}
        loading={loading}
        totalPage={totalPage}
        error={error}
      />
    </>
  );
};

export default HomePage;
