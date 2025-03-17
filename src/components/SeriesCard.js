"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SeriesCard = ({ isOnMaster, image, title, genres, platform }) => {
  return (
    <div className="bg-neutral-900 text-white rounded-2xl flex flex-col p-5 w-[310px] h-[460px]">
      {!isOnMaster && (
        <div className="flex justify-between mb-2">
          <Link href="/edit" className="text-sm">Edit</Link>
          <button className="text-sm">Delete</button>
        </div>
      )}

      <div className="flex justify-center overflow-hidden">
        <Image
          src={image}
          width={230}
          height={335}
          alt={title}
          className="object-cover max-w-[230px] max-h-[335px] scale-95"
        />
      </div>

      <div className="pt-2 text-left">
        <h1 className="font-bold">{title}</h1>
        <h2 className="font-light text-sm pb-3">{platform}</h2>
        <h3 className="font-normal text-sm text-neutral-400">{genres}</h3>
      </div>
    </div>
  );
};

export default SeriesComponent;

