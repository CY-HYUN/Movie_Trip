import { selectPlaceState } from "@/atom/selectPlaceStore";
import axios from "axios";
import Script from "next/script";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

export default function ContentKakaoMap() {
  const API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const [map, setMap] = useState<any>();
  const [selectedPlace, setSelectedPlace] = useRecoilState(selectPlaceState);
  const DEFAULT_LAT = String(selectedPlace[0].lat);
  const DEFAULT_LNG = String(selectedPlace[0].lng);
  const [linePaths, setLinePaths] = useState<any[]>([]);
  const spotList = selectedPlace.slice(1, selectedPlace.length);

  const handleMarkers = (lat: any, lng: any, start: boolean, last: boolean) => {
    const markerImage = new window.kakao.maps.MarkerImage(
      `/images/${last ? "endLoad" : start ? "startLoad" : "spotLoad"}.svg`,
      new window.kakao.maps.Size(50, 50),
    );
    const markerPosition = new window.kakao.maps.LatLng(lat, lng);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    // 지도에 마커 표시
    marker.setMap(map);
  };

  const handleSetLoad = () => {
    if (map && linePaths.length > 0) {
      selectedPlace.map((wayPoint, i) => {
        handleMarkers(
          wayPoint.lat,
          wayPoint.lng,
          i === 0,
          i === selectedPlace.length - 1,
        );
      });
      // 지도에 표시할 선을 생성합니다
      const polyline = new window.kakao.maps.Polyline({
        path: linePaths, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 10, // 선의 두께 입니다
        strokeColor: "blue", // 선의 색깔입니다
        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "solid", // 선의 스타일입니다
      });

      // 지도에 선을 표시합니다
      polyline.setMap(map);
    }
  };

  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      axios
        .post(
          `https://apis-navi.kakaomobility.com/v1/waypoints/directions`,
          postData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `KakaoAK ${REST_API_KEY}`,
            },
          },
        )
        .then((res) => {
          console.log(res);
          setLinePaths((prev) => [
            ...prev,
            new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
          ]);
          res.data.routes[0]?.sections?.forEach((section: any) => {
            section.roads.map((road: any) => {
              setLinePaths((prev) => [
                ...prev,
                new window.kakao.maps.LatLng(
                  road.vertexes[1],
                  road.vertexes[0],
                ),
              ]);
              setLinePaths((prev) => [
                ...prev,
                new window.kakao.maps.LatLng(
                  road.vertexes[3],
                  road.vertexes[2],
                ),
              ]);
            });
          });
        })
        .then(() => {
          const mapContainer = document.getElementById("map");
          const mapOption = {
            center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
            level: 3,
          };
          const map = new window.kakao.maps.Map(mapContainer, mapOption);
          setMap(map);
        });
    });
  };

  const postData = {
    // 출발지
    origin: {
      x: DEFAULT_LNG,
      y: DEFAULT_LAT,
    },

    // 도착지
    destination: {
      x: Number(selectedPlace[selectedPlace.length - 1].lng),
      y: Number(selectedPlace[selectedPlace.length - 1].lat),
    },

    // 경유지
    waypoints: spotList.map((item) => {
      return {
        name: item.placeName,
        x: item.lng,
        y: item.lat,
      };
    }),
    priority: "RECOMMEND",
    car_fuel: "GASOLINE",
    car_hipass: false,
    alternatives: false,
    road_details: true,
  };

  return (
    selectedPlace &&
    linePaths && (
      <div className="w-full h-full flex flex-col gap-4 sm:gap-6 items-center justify-center">
        <img
          src="/images/kakaoMap.png"
          alt="카카오맵 로고"
          width={80}
          height={80}
          className="sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] rounded-lg cursor-pointer"
          onClick={handleSetLoad}
        />
        <Script
          strategy="afterInteractive"
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&autoload=false`}
          onReady={loadKakaoMap}
          onError={console.error}
        />
        <div
          id="map"
          className="w-full sm:w-4/5 h-[400px] sm:h-[600px] lg:h-[800px] rounded-lg shadow-lg"
        />
      </div>
    )
  );
}
