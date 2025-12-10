// 페이지 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 부산 미세먼지 지도 초기화
    initializeBusanMap();
    
    // 미세먼지 현황을 처음에는 숨김
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.style.display = 'none';
    
    // 페이지 로드 애니메이션
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// 부산 지도 초기화
function initializeBusanMap() {
    const districts = [
        { id: 'gang-seo', name: '강서구', dust: 42 },
        { id: 'geum-jeong', name: '금정구', dust: 38 },
        { id: 'gi-jang', name: '기장군', dust: 35 },
        { id: 'nam', name: '남구', dust: 48 },
        { id: 'dong', name: '동구', dust: 52 },
        { id: 'dong-rae', name: '동래구', dust: 41 },
        { id: 'bu-san-jin', name: '부산진구', dust: 45 },
        { id: 'buk', name: '북구', dust: 39 },
        { id: 'sa-sang', name: '사상구', dust: 46 },
        { id: 'sa-ha', name: '사하구', dust: 43 },
        { id: 'seo', name: '서구', dust: 44 },
        { id: 'suyeong', name: '수영구', dust: 40 },
        { id: 'yeonje', name: '연제구', dust: 37 },
        { id: 'yeongdo', name: '영도구', dust: 49 },
        { id: 'jung', name: '중구', dust: 51 },
        { id: 'haeundae', name: '해운대구', dust: 36 }
    ];

    districts.forEach(district => {
        const card = document.querySelector(`[data-district="${district.id}"]`);
        if (card) {
            const dustLevel = card.querySelector('.dust-level');
            const dustClass = getDustClass(district.dust);
            
            dustLevel.textContent = district.dust;
            dustLevel.className = `dust-level ${dustClass}`;
            
            // 클릭 이벤트 추가
            card.addEventListener('click', () => {
                showDistrictInfo(district);
            });
        }
    });

    // 실시간 업데이트 시뮬레이션
    setInterval(updateBusanMap, 30000); // 30초마다 업데이트
}

// 미세먼지 수치에 따른 클래스 결정
function getDustClass(dust) {
    if (dust <= 30) return 'good';
    else if (dust <= 80) return 'moderate';
    else if (dust <= 150) return 'bad';
    else return 'very-bad';
}

// 부산 지도 업데이트
function updateBusanMap() {
    const districtCards = document.querySelectorAll('.district-card');
    
    districtCards.forEach(card => {
        const dustLevel = card.querySelector('.dust-level');
        const currentDust = parseInt(dustLevel.textContent);
        // 실제 환경에서는 API로 데이터를 가져옴
        const variation = Math.floor(Math.random() * 10) - 5; // -5 ~ +5 변동
        const newDust = Math.max(15, Math.min(200, currentDust + variation));
        
        dustLevel.textContent = newDust;
        dustLevel.className = `dust-level ${getDustClass(newDust)}`;
        
        // 부드러운 색상 전환 효과
        card.style.transform = 'scale(1.05)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 200);
    });
}

// 구별 상세 정보 표시
function showDistrictInfo(district) {
    const level = getDustLevelText(district.dust);
    const color = getDustLevelColor(district.dust);
    
    showNotification(
        `<strong>${district.name}</strong><br>
         미세먼지: <span style="color: ${color};">${district.dust}㎍/㎥ (${level})</span><br>
         <small>실시간 측정 데이터</small>`,
        'info'
    );
}

// 미세먼지 수치에 따른 상태 텍스트
function getDustLevelText(dust) {
    if (dust <= 30) return '좋음';
    else if (dust <= 80) return '보통';
    else if (dust <= 150) return '나쁨';
    else return '매우나쁨';
}

// 검색 버튼 클릭 이벤트
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchBtn').addEventListener('click', function() {
        // 서비스 키는 이미 고정값으로 설정됨
        
        // 버튼 로딩 상태
        const btn = this;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 불러오는 중...';
        btn.disabled = true;
        
        fetchDustData().finally(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        });
    });
});

// Enter 키로 검색 실행
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('searchBtn').click();
    }
});

// 실제 API 호출 함수
async function fetchDustData() {
    const loading = document.getElementById('loading');
    const dataContainer = document.getElementById('dataContainer');
    const serviceKey = document.getElementById('serviceKey').value.trim();
    const district = document.getElementById('district').value;
    
    // 로딩 표시
    loading.style.display = 'block';
    dataContainer.style.display = 'none';
    
    try {
        // 데모 데이터 생성 (실제 API 응답 형태를 모방)
        setTimeout(() => {
            const demoData = generateEnhancedDemoData();
            displayData(demoData);
            
            loading.style.display = 'none';
            dataContainer.style.display = 'block';
            
            // 성공 메시지
            showNotification('부산 미세먼지 데이터를 새로고침했습니다.', 'success');
        }, 1500);
        
    } catch (error) {
        console.error('데이터 조회 중 오류 발생:', error);
        showNotification('데이터 조회 중 오류가 발생했습니다.', 'error');
        loading.style.display = 'none';
    }
}

// 향상된 데모 데이터 생성 함수 (부산 미세먼지 정보)
function generateEnhancedDemoData() {
    const busanDistricts = [
        '강서구', '금정구', '기장군', '남구', '동구', '동래구', 
        '부산진구', '북구', '사상구', '사하구', '서구', 
        '수영구', '연제구', '영도구', '중구', '해운대구'
    ];
    
    const measurementStations = [
        '부산시청', '해운대해수욕장', '광안리해변', '태종대', '용두산공원',
        '송정해수욕장', '을숙도', '다대포해수욕장', '부산역', '서면',
        '센텀시티', '남포동', '자갈치시장', '감천문화마을', '온천천',
        '수영강변', '기장군청', '정관신도시'
    ];
    
    const selectedDistrict = document.getElementById('district').value;
    const data = [];
    
    // 선택한 구·군에 따른 데이터 생성 개수 조정
    const dataCount = selectedDistrict ? 8 : 20; // 특정 구·군 선택시 적은 데이터, 전체시 많은 데이터
    
    for (let i = 0; i < dataCount; i++) {
        const pm10Level = Math.floor(Math.random() * 120) + 15; // PM10 15-135
        const pm25Level = Math.floor(pm10Level * 0.6 + Math.random() * 20); // PM2.5는 PM10의 60% + 변동
        
        // 선택한 구·군이 있으면 해당 구·군만, 없으면 랜덤
        let district;
        if (selectedDistrict) {
            district = selectedDistrict;
        } else {
            district = busanDistricts[Math.floor(Math.random() * busanDistricts.length)];
        }
        
        // 선택한 구·군에 맞는 측정소 선택
        let station;
        if (selectedDistrict) {
            // 구·군별 대표 측정소
            const districtStations = {
                '중구': ['부산시청', '용두산공원', '남포동', '자갈치시장'],
                '서구': ['서면', '부산역'],
                '동구': ['부산역', '초량동'],
                '영도구': ['태종대', '영도구청'],
                '부산진구': ['서면', '부산진구청'],
                '동래구': ['온천천', '동래구청'],
                '남구': ['광안리해변', '남구청'],
                '북구': ['북구청', '화명동'],
                '해운대구': ['해운대해수욕장', '센텀시티', '정관신도시'],
                '사하구': ['다대포해수욕장', '사하구청'],
                '금정구': ['금정구청', '부산대학교'],
                '강서구': ['강서구청', '공항'],
                '연제구': ['연제구청', '연산동'],
                '수영구': ['수영강변', '광안리'],
                '사상구': ['사상구청', '삼락동'],
                '기장군': ['기장군청', '정관신도시', '일광해수욕장']
            };
            const stations = districtStations[selectedDistrict] || [selectedDistrict + ' 측정소'];
            station = stations[Math.floor(Math.random() * stations.length)];
        } else {
            station = measurementStations[Math.floor(Math.random() * measurementStations.length)];
        }
        const temperature = (Math.random() * 30 + 5).toFixed(1); // 5-35도
        const humidity = (Math.random() * 40 + 40).toFixed(1); // 40-80%
        const windSpeed = (Math.random() * 15 + 1).toFixed(1); // 1-16 m/s
        
        // 계절별 온도 조정 (부산 기후 특성 반영)
        const month = new Date().getMonth();
        let adjustedTemp = parseFloat(temperature);
        if (month >= 11 || month <= 2) adjustedTemp = Math.max(0, Math.min(18, adjustedTemp)); // 부산 겨울
        else if (month >= 6 && month <= 8) adjustedTemp = Math.max(22, Math.min(35, adjustedTemp + 8)); // 부산 여름
        
        // 바람이 강할수록 미세먼지 농도 감소 경향
        const windEffect = parseFloat(windSpeed) > 8 ? 0.8 : 1.0;
        const adjustedPm10 = Math.floor(pm10Level * windEffect);
        const adjustedPm25 = Math.floor(pm25Level * windEffect);
        
        data.push({
            measureDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('ko-KR'),
            measureTime: String(Math.floor(Math.random() * 24)).padStart(2, '0') + ':' + String(Math.floor(Math.random() * 60)).padStart(2, '0'),
            district: district,
            station: station,
            temperature: adjustedTemp.toFixed(1),
            humidity: humidity,
            windSpeed: windSpeed,
            pm10: adjustedPm10,
            pm25: adjustedPm25,
            pollutionLevel: getPollutionLevel(adjustedPm10),
            weather: getBusanWeather(),
            airQualityIndex: calculateAQI(adjustedPm10, adjustedPm25)
        });
    }
    
    // 날짜별로 정렬
    return data.sort((a, b) => new Date(b.measureDate + ' ' + b.measureTime) - new Date(a.measureDate + ' ' + a.measureTime));
}

// 부산 지역 특성을 반영한 날씨 정보
function getBusanWeather() {
    const weathers = ['☀️ 맑음', '⛅ 구름조금', '☁️ 흐림', '🌧️ 비', '🌫️ 안개', '💨 바람'];
    const weights = [0.3, 0.25, 0.2, 0.15, 0.05, 0.05]; // 부산은 맑은 날이 많음
    
    let random = Math.random();
    for (let i = 0; i < weathers.length; i++) {
        random -= weights[i];
        if (random <= 0) return weathers[i];
    }
    return weathers[0];
}

// 대기질 지수 계산 (간단화된 버전)
function calculateAQI(pm10, pm25) {
    const pm10AQI = Math.min(500, Math.floor(pm10 * 2));
    const pm25AQI = Math.min(500, Math.floor(pm25 * 3));
    return Math.max(pm10AQI, pm25AQI);
}

// 알림 표시 함수
function showNotification(message, type = 'info') {
    // 기존 알림 제거
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = message;
    
    // 스타일 적용
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '600',
        fontSize: '14px',
        zIndex: '10000',
        maxWidth: '400px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        animation: 'slideInRight 0.3s ease-out'
    });
    
    // 타입별 배경색
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
    }
    
    document.body.appendChild(notification);
    
    // 3초 후 자동 제거
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 3000);
}

// 오염 수준 판정 함수 (PM10 기준)
function getPollutionLevel(pm10Level) {
    if (pm10Level <= 30) return { level: '좋음', class: 'level-good' };
    else if (pm10Level <= 80) return { level: '보통', class: 'level-moderate' };
    else if (pm10Level <= 150) return { level: '나쁨', class: 'level-bad' };
    else return { level: '매우나쁨', class: 'level-very-bad' };
}

// 데이터 표시 함수 (부산 미세먼지 버전)
function displayData(data) {
    // 부산 미세먼지 통계 계산
    const totalMeasurements = data.length;
    const avgPm10 = (data.reduce((sum, item) => sum + item.pm10, 0) / data.length).toFixed(1);
    const avgPm25 = (data.reduce((sum, item) => sum + item.pm25, 0) / data.length).toFixed(1);
    const maxPm10 = Math.max(...data.map(item => item.pm10));
    const badAirDays = data.filter(item => item.pm10 > 80).length;

    // 통계 카드 업데이트 (카운팅 애니메이션)
    animateCounter('totalMeasurements', totalMeasurements);
    animateCounter('avgDustLevel', avgPm10);
    animateCounter('maxDustLevel', maxPm10);
    animateCounter('dangerousRoads', badAirDays);

    // 테이블 데이터 표시
    const tableBody = document.getElementById('dataTableBody');
    tableBody.innerHTML = '';

    data.forEach((item, index) => {
        const row = tableBody.insertRow();
        row.style.animationDelay = `${index * 0.05}s`;
        row.className = 'table-row-animate';
        
        row.innerHTML = `
            <td>${item.measureTime} <small style="color: #999;">${item.measureDate}</small></td>
            <td><strong>${item.district}</strong></td>
            <td>${item.station}</td>
            <td>${item.weather} ${item.temperature}°C</td>
            <td>${item.humidity}% / ${item.windSpeed}m/s</td>
            <td><strong style="color: ${getDustLevelColor(item.pm10)};">PM10:${item.pm10}</strong> / <small style="color: ${getDustLevelColor(item.pm25)};">PM2.5:${item.pm25}</small></td>
            <td><span class="pollution-level ${item.pollutionLevel.class}">${item.pollutionLevel.level}</span></td>
        `;
    });
}

// 카운터 애니메이션 함수
function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    const startValue = 0;
    const duration = 1000;
    const increment = targetValue / (duration / 16);
    let currentValue = startValue;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            element.textContent = targetValue;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(currentValue);
        }
    }, 16);
}

// 미세먼지 수치에 따른 색상 반환 (PM10/PM2.5 기준)
function getDustLevelColor(dustLevel) {
    if (dustLevel <= 30) return '#3498db';      // 좋음 - 파란색
    else if (dustLevel <= 80) return '#2ecc71'; // 보통 - 초록색
    else if (dustLevel <= 150) return '#f39c12'; // 나쁨 - 주황색
    else return '#e74c3c';                      // 매우나쁨 - 빨간색
}