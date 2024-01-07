import React from "react";
import ContentLoader from "react-content-loader";

const ProfileSkeleton = (props = {}) => {
  return (
    <div className="h-screen w-full">
      <ContentLoader
        speed={2}
        width={"100%"}
        height={"100%"}
        backgroundColor="#302B4F"
        foregroundColor="#3D3764"
        {...props}
      >
        <rect x="0" y="0" rx="4" ry="4" width="100%" height="100px" />
        <rect x="0" y="120" rx="4" ry="4" width="100px" height="30px" />
        <rect x="110" y="120" rx="4" ry="4" width="100px" height="30px" />
        <rect x="220" y="120" rx="4" ry="4" width="100px" height="30px" />
      </ContentLoader>
    </div>
  );
};

export default ProfileSkeleton;
