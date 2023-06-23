import InfiniteScroll from "react-infinite-scroll-component";
import GridLayout from "./GridLayout";
import VideoCard from "../video/VideoCard";
import PageNotFound from "../../pages/PageNotFound";
import NoResults from "./NoResults";
import SkeletonVideoCard from "../skeleton/SkeletonVideoCard";
import { Spin } from "react-cssfx-loading";
import { v4 } from "uuid";

const InfinityLoadPage = ({ page, setPage, loading, error, data, totalPage }) => {
  if (loading) return <SkeletonVideoCard item={12} />;

  if (error) return <PageNotFound />;

  return (
    <>
      {data.length > 0 ? (
        <InfiniteScroll
          dataLength={data?.length}
          hasMore={page < totalPage}
          next={() => setPage((prev) => prev + 1)}
          loader={
            <div className="py-4 w-full flex justify-center">
              <Spin />
            </div>
          }
          height={`calc(100vh - 65px)`}
        >
          <GridLayout>
            {data.map((p) => (
              <VideoCard key={v4()} data={p} />
            ))}
          </GridLayout>
        </InfiniteScroll>
      ) : (
        <NoResults />
      )}
    </>
  );
};

export default InfinityLoadPage;
