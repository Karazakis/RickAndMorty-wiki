
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import DefaultBanner from "./banners/defaultbanner";
import ArchiveBanner from "./banners/archivebanner";


function Banner(){
  const router = useRouter();
  const asPath = router.asPath;

  if (asPath.includes('/character') || asPath.includes('/location') || asPath.includes('/episode')){
    return <ArchiveBanner />
  }
  return <DefaultBanner />
}

export default Banner;