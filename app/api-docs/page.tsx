'use client'
import React from "react";
import dynamic from "next/dynamic";

// Dynamically load SwaggerUI for better performance
const SwaggerUI = dynamic(() => import("@/swagger/swagger-ui"), { ssr: false });

const ApiDocsPage = () => {
  return (
    <main>
      <h1>API Documentation</h1>
      <SwaggerUI />
    </main>
  );
};

export default ApiDocsPage;
