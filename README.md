<h1>항해99 미니프로젝트 1조 -FE</h1>

![fishlogo](https://github.com/seokjin909/fishingLoad_frontEnd/assets/111734939/ba7b221e-eea0-4f9c-b963-03c4ea4078c2)

- **한줄 요약 :** 낚시 스팟 공유 사이트
- 낚시를 하는 장소, 어종등을 낚시꾼들간에 공유를 하는 사이트
<hr/>
	<div>
	<img src="https://img.shields.io/badge/Notion-000000?style=flat&logo=Notion&logoColor=white" />
  </div>
&nbsp;📎 https://strong-countess-3c2.notion.site/S-A-Fishing-Load-8a6781b674f743a4b60a8724f7d5ab22?pvs=4
<h2>배포주소</h2>
<span>📎 https://fishing-load-front-end.vercel.app/</span>


<h4>FE TEAM 🧑‍💻👨‍💻</h4>
<table>
  <th>소석진</th>
  <th>김지원</th>
  <tr>
    <td><img width="200" height="200" src="https://github.com/seokjin909/fishingLoad_frontEnd/assets/111734939/75029f0e-d7ff-46b6-ab80-d990ed203dde"</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="https://github.com/seokjin909">seokjin909</a></td>
    <td><a href="https://github.com/jiwonkim16">jiwonkim16</a></td>
  </tr>
</table>

## 기술스택
### Environment
![git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![b](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![v](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![g](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![f](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

## Development
<div>
	<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white" />
	<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white" />
	<img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=Next.js&logoColor=white" />
	<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat&logo=Tailwind CSS&logoColor=white" />
  <img src="https://img.shields.io/badge/SWR-000000?style=flat&logo=SWR&logoColor=white" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=Axios&logoColor=white" />
</div>


## 주요기능
### 전국 포인트 및 나만의 포인트
1. Naver Web Dynamic Map API 활용하여 포인트 등록 시 입력한 주소로 마커 생성
2. 마커 클릭 시 지도 오른쪽 영역에 선택한 마커의 기본 정보와 대표 이미지 출력
3. 지도 오른쪽 상단의 SEA/FRESH WATER 버튼을 통해 민물/바다 카테고리로 분류된 마커들이 출력

<img width="1920" alt="스크린샷 2023-09-28 오전 3 24 35(2)" src="https://github.com/seokjin909/fishingLoad_frontEnd/assets/111734939/926d1641-9c69-45f9-9e4c-870e6bd1d510">


### 포인트 상세페이지
1. 선택된 포인트의 위치로 지도가 업데이트 되고 등록할 때 입력한 정보들이 간단하게 출력
2. 해당 포인트에 좋아요 및 댓글을 입력할 수 있고, 로그인 한 유저의 토큰 값을 통해 좋아요를 한 유저인지 여부를 구분 처리함

<img width="1920" alt="스크린샷 2023-09-28 오전 3 25 01(2)" src="https://github.com/seokjin909/fishingLoad_frontEnd/assets/111734939/94346229-5e22-4857-8e4f-8aab8817dcac">


### 포인트 등록페이지
1. 선택된 테마에 따른 다른 종류들의 물고기 리스트들이 버튼 형태로 출력되고 클릭 시 토클 형식으로 선택 여부를 판별하도록 처리
2. Daum Post-Code를 사용해서 주소를 입력받고, KaKao Map API의 Geocoder를 통해 해당 주소의 좌표값을 구한 뒤 서버로 전달

<img width="1920" alt="스크린샷 2023-09-28 오전 3 25 25(2)" src="https://github.com/seokjin909/fishingLoad_frontEnd/assets/111734939/d3265f7b-bd4f-4dc8-bd0b-514fb93474c1">


