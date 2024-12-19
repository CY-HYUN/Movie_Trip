"use client";
import { selectPlaceState } from "@/atom/selectPlaceStore";
import axios from "axios";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import PlaceBox from "./PlaceBox";
import Divider from "../common/Divider";

declare global {
  interface Window {
    kakao: any;
  }
}

type WaypointType = {
  name: string;
  x: number;
  y: number;
};

type Props = {
  handleSetMap: (map: any) => void;
};

// 경로 위도, 경도 상태 저장
// 초기 위치는 출발 지점
// 선택한 장소 상태 관리는 ??
export default function KakaoMap() {
  const API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const [map, setMap] = useState<any>();
  const [selectedPlace, setSelectedPlace] = useRecoilState(selectPlaceState);
  const DEFAULT_LAT =
    selectedPlace.length !== 0 ? Number(selectedPlace[0].lat) : 37.5665; // 서울 시청 좌표 기본값
  const DEFAULT_LNG =
    selectedPlace.length !== 0 ? Number(selectedPlace[0].lng) : 126.978; // 서울 시청 좌표 기본값
  const [linePaths, setLinePaths] = useState<any[]>([]);
  const spotList = selectedPlace.slice(1, selectedPlace.length);

  const handleMarkers = (
    lat: number,
    lng: number,
    start: boolean,
    last: boolean,
    address: string,
  ) => {
    const markerImage = new window.kakao.maps.MarkerImage(
      `/images/${last ? "endLoad" : start ? "startLoad" : "spotLoad"}.png`,
      new window.kakao.maps.Size(50, 50),
    );
    const markerPosition = new window.kakao.maps.LatLng(lat, lng);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
      map: map, // 마커를 지도에 표시
    });

    // InfoWindow 생성
    const infowindow = new window.kakao.maps.InfoWindow({
      content: `
        <div style="
          padding: 8px;
          max-width: 300px; /* 최대 너비 설정 */
          word-wrap: break-word; /* 단어가 길어질 경우 줄바꿈 */
          font-size: 14px;
          color: #333;
        ">
          ${address}
        </div>
      `,
      removable: true, // 사용자가 InfoWindow를 닫을 수 있도록 설정
    });

    // 마커 클릭 이벤트 추가
    window.kakao.maps.event.addListener(marker, "click", () => {
      infowindow.open(map, marker);
    });
  };

  const handleSetLoad = () => {
    if (map && linePaths.length > 0) {
      selectedPlace.forEach((wayPoint, i) => {
        handleMarkers(
          wayPoint.lat,
          wayPoint.lng,
          i === 0,
          i === selectedPlace.length - 1,
          wayPoint.address, // 주소 전달
        );
      });

      // 지도에 표시할 선을 생성합니다
      const outline = new window.kakao.maps.Polyline({
        map: map, // 지도에 선을 표시합니다
        path: linePaths, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 13, // 선의 두께 입니다
        strokeColor: "black", // 선의 색깔입니다
        strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "solid", // 선의 스타일입니다
      });

      const line = new window.kakao.maps.Polyline({
        map: map, // 지도에 선을 표시합니다
        path: linePaths, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 10, // 선의 두께 입니다
        strokeColor: "red", // 선의 색깔입니다
        strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "solid", // 선의 스타일입니다
      });

      const dash = new window.kakao.maps.Polyline({
        map: map, // 지도에 선을 표시합니다
        path: linePaths, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 2, // 선의 두께 입니다
        strokeColor: "#fff", // 선의 색깔입니다
        strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "dash", // 선의 스타일입니다
        zIndex: 1,
      });

      outline.setMap(map);
      line.setMap(map);
      dash.setMap(map);
    }
  };

  // 카카오맵 로드
  const loadKakaoMap = () => {
    if (selectedPlace.length === 0) return;
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
          if (res.data.routes[0].result_code === 107) {
            alert(res.data.routes[0].result_msg);
            return;
          }
          setLinePaths((prev) => [
            ...prev,
            new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
          ]);
          res.data.routes[0]?.sections?.forEach((section: any) => {
            section.roads.forEach((road: any) => {
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
          try {
            const map = new window.kakao.maps.Map(mapContainer, mapOption);
            setMap(map);
          } catch (error) {
            console.error("맵 생성 오류:", error);
          }
        })
        .catch((error) => {
          console.error("카카오맵 로드 중 오류 발생:", error);
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
      x:
        selectedPlace.length !== 0 &&
        Number(selectedPlace[selectedPlace.length - 1].lng),
      y:
        selectedPlace.length !== 0 &&
        Number(selectedPlace[selectedPlace.length - 1].lat),
    },

    // 경유지
    waypoints: spotList.map((item) => {
      return {
        name: item.placeName,
        x: item.lng,
        y: item.lat,
      };
    }),
    priority: "distance",
    car_fuel: "GASOLINE",
    car_hipass: false,
    alternatives: true,
    road_details: true,
  };

  useEffect(() => {
    // 맵이 생성된 후에 handleSetLoad 호출
    if (map && linePaths.length > 0) {
      handleSetLoad();
    }
  }, [map, linePaths]);

  return (
    selectedPlace.length !== 0 &&
    linePaths && (
      <div className="w-full h-auto flex flex-col gap-2 items-center mt-10">
        <img
          src="/images/kakaoMap.png"
          alt="카카오맵 로고"
          width={100}
          height={100}
          className="rounded-lg cursor-pointer"
          onClick={handleSetLoad}
        />
        <Script
          strategy="afterInteractive"
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&autoload=false`}
          onReady={loadKakaoMap}
          onError={(e) => console.error("카카오맵 스크립트 로드 오류:", e)}
        />
        <div
          id="map"
          className="w-full sm:w-4/5 h-[400px] sm:h-[600px] lg:h-[800px]"
        />
      </div>
    )
  );
}
