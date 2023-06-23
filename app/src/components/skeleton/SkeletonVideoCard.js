import React from "react";
import GridLayout from "../shared/GridLayout";
import SkeletonCard from "./SkeletonCard";
import { v4 } from "uuid";

const SkeletonVideoCard = ({ item }) => {
  const arrayNumber = Array.from(Array(item).keys());

  return (
    <GridLayout>
      {arrayNumber.map(() => (
        <SkeletonCard key={v4()} />
      ))}
    </GridLayout>
  );
};

export default SkeletonVideoCard;
