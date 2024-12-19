import React, { useEffect, useState } from "react";
import placeData from "../../../public/서울행정구역.json"; // JSON 데이터 import
import Script from "next/script";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap2({ place }: { place: string[] }) {
  const API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
  const [map, setMap] = useState<any>(null);
  const [places, setPlaces] = useState<any[]>([]);

  useEffect(() => {
    const foundPlaces = place
      .map((p) => placeData.features.find((pl) => pl.properties.name === p))
      .filter(Boolean); // undefined 제거

    setPlaces(foundPlaces);
  }, [place]);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps || places.length === 0) return;

    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(
          37.557533180704915,
          127.11519584981606,
        ),
        level: 7,
      };
      const mapInstance = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(mapInstance);

      places.forEach((p) => {
        const polygonPath = p.geometry.coordinates[0].map(
          (coor: number[]) => new window.kakao.maps.LatLng(coor[1], coor[0]),
        );
        if (polygonPath.length !== 0) {
          const polygon = new window.kakao.maps.Polygon({
            path: polygonPath,
            strokeColor: "#925CE9",
            fillColor: "#925CE9",
            fillOpacity: 0.2,
          });
          polygon.setMap(mapInstance);
        }
      });
    });
  }, [places]);

  return (
    <div className="w-full h-auto flex flex-col gap-2 items-center mt-[40px]">
      <img
        src="/images/kakaoMap.png"
        alt="카카오맵 로고"
        width={120}
        height={120}
        className="rounded-lg cursor-pointer"
      />
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&autoload=false`}
        onError={console.error}
      />
      <div id={"map"} className="w-4/5 h-[800px]"></div>
    </div>
  );
}
