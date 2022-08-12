import { useParams } from "@remix-run/react";
import React from "react";

const SingleProduct: React.FC = () => {
  const params = useParams();
  return <div>{JSON.stringify(params)}</div>;
};

export default SingleProduct;
