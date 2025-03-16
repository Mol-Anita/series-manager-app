"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SeriesComponent = ({ isOnMaster, image, title, genres, platform }) => {
  return (
    <div className="flex flex-col">
      <div className="max-w-3xs bg-neutral-900 text-white rounded-2xl flex flex-col p-5">
        <div className="flex flex-row justify-between">
          {!isOnMaster && (
            <div className="flex justify-between w-full">
              <Link href="/edit" className="text-sm">Edit</Link>
              <button className="text-sm">Delete</button>
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <Image src={image} width={200} height={250} />
        </div>

        <div className="pt-2">
          <h1 className="font-bold">{title}</h1>
          <h2 className="font-normal text-sm pb-2.5">{platform}</h2>
          <h3 className="font-normal text-sm">{genres}</h3>
        </div>
      </div>
    </div>
  );
};

export default SeriesComponent;
