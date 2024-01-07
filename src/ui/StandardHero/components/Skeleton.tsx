import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props = {}) => {
  return (
    <div className="h-28 w-full">
      <ContentLoader
        speed={2}
        width={"100%"}
        height={"100%"}
        backgroundColor="#302B4F"
        foregroundColor="#3D3764"
        {...props}
      >
        <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
      </ContentLoader>
    </div>
  );
};

export default Skeleton;
