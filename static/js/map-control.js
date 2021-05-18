const API_KEY = "SgsyiUvHoGA1NJQiOVU6A=="; // 해양 조위 관측소 API

const mapContainer = document.getElementById("map"), // 지도 표시 컨테이너
  mapOption = {
    center: new kakao.maps.LatLng(36.47914, 126.93519), // 지도 중심 좌표
    level: 14, // 지도 확대 레벨
    mapTypeId: kakao.maps.MapTypeId.HYBRID, // 지도종류, 일반지도 default 설정 -> MapTypeId.ROADMAP
  };

// 지도 표시, 지도 옵션 -> 지도 객체 생성
const map = new kakao.maps.Map(mapContainer, mapOption);
5;

// 마커 클러스터러 생성
const clusterer = new kakao.maps.MarkerClusterer({
  map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
  averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
  minLevel: 10, // 클러스터 할 최소 지도 레벨
  disableClickZoom: true, // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정
});

// jQuery 사용
// 데이터를 가져와 마커를 생성하고 클러스터러 객체에 넘겨주기
$.get("../../static/data/location.json", function (data) {
  // 데이터 좌표 값을 가지고 마커 표시
  // 마커 클러스터러로 관리할 마커 객체는 생성할 때 지도 객체를 설정하지 않음
  const markers = $(data.positions).map(function (i, position) {
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(position.lat, position.lng),
      clickable: true,
    });

    // 마커 위 커스텀 오버레이 표시
    // 마커 중심으로 커스텀 오버레이 표시 위해 CSS를 이용하여 위치 설정
    const overlay = new kakao.maps.CustomOverlay({
      position: marker.getPosition(),
      clickable: true,
    });

    // 마커 위에 표시할 커스텀 오버레이 콘텐츠 DOM으로 구현
    const wrap = document.createElement("div");
    wrap.className = "wrap";

    const info = document.createElement("div");
    info.className = "info";
    wrap.appendChild(info);

    // 커스텀 오버레이 타이틀
    const title = document.createElement("div");
    title.className = "title";
    serviceName = document.createTextNode("I Sea Monitoring");

    title.appendChild(serviceName);
    info.appendChild(title);

    // 커스텀 오버레이 닫기 버튼
    const close = document.createElement("div");
    close.className = "close";
    close.setAttribute("title", "닫기");
    title.appendChild(close);

    const body = document.createElement("div");
    body.className = "body";
    info.appendChild(body);

    const imgDiv = document.createElement("div");
    imgDiv.className = "img";
    body.appendChild(imgDiv);

    // 커스텀 오버레이 이미지
    const img = document.createElement("img");
    img.setAttribute("src", "../../static/img/warn.jpg");
    img.setAttribute("width", 73);
    img.setAttribute("height", "70");
    imgDiv.appendChild(img);

    const desc = document.createElement("div");
    desc.className = "desc";
    body.appendChild(desc);

    // 커스텀 오버레이 이름
    const observName = document.createElement("div");
    observName.className = "observName";
    const text = document.createTextNode(`${position.name}`);
    observName.appendChild(text);
    desc.appendChild(observName);

    // 커스텀 오버레이 위치 이름
    const observPosition = document.createElement("div");
    observPosition.className = "observPosition observName";
    const text2 = document.createTextNode(
      `위도: ${position.lat}, 경도: ${position.lng}`
    );
    observPosition.appendChild(text2);
    desc.appendChild(observPosition);

    const footerDiv = document.createElement("div");
    desc.appendChild(footerDiv);

    // 커스텀 오버레이 링크
    const link = document.createElement("a");
    link.className = "link";
    const text3 = document.createTextNode("실시간 조위 관측소 정보");
    link.appendChild(text3);
    link.target = "_blank";
    link.href = "http://www.khoa.go.kr/oceangrid/khoa/koofs.do";
    footerDiv.appendChild(link); // DOM 구현 끝

    overlay.setContent(wrap); // 커스텀 오버레이 content 추가

    // 커스텀 오버레이 닫기 함수
    close.onclick = function () {
      overlay.setMap(null);
    };

    // 마커 클릭 시 커스텀 오버레이 표시
    kakao.maps.event.addListener(marker, "click", function () {
      overlay.setMap(map);

      // 마커 클릭 시 마커 위치로 지도도 함께 이동
      const pos = marker.getPosition();
      map.panTo(pos);
    });

    return marker;
  });

  // 마커 클러스터러에 클릭 이벤트 등록
  // 마커 클러스터러 생성 시 disableClickZoom을 true로 설정하지 않으면
  // 이벤트 헨들러로 cluster 객체가 넘어오지 않을 수도 있음
  kakao.maps.event.addListener(clusterer, "clusterclick", function (cluster) {
    // 현재 지도 레벨에서 1레벨 확대한 레벨
    const level = map.getLevel() - 1;

    // 지도를 클릭된 클러스터의 마커 위치 기준으로 확대
    map.setLevel(level, { anchor: cluster.getCenter() });
  });

  // 클러스터러에 마커들 추가
  clusterer.addMarkers(markers);
});

// 지도 타입 변경 컨트롤 생성
const mapTypeControl = new kakao.maps.MapTypeControl();

// 지도 상단 우측에 지도 타입 변경 컨트롤 추가
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
