import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearData,
  getVideoHomePage,
  getVideoSubscription,
} from "../redux/slice/infinityLoadSlice";
import WantLogin from "../components/shared/WantLogin";
import Title from "../components/shared/Title";
import FeedVideo from "../components/shared/FeedVideo";

const SubscriptionPage = () => {
  const [page, setPage] = useState(1);
  const { currentUser } = useSelector((state) => state.auth);

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

  if (!currentUser) return <WantLogin />;

  return (
    <>
      <Title title={"Subsrciption | UA You - Video sharing website"} />
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

export default SubscriptionPage;
